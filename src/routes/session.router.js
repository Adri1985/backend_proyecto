import {Router} from 'express'
import userModel from '../dao/models/user.model.js'
import passport from 'passport'

const router = Router()

//Vista para registrar usuarios
router.get('/register', (req,res)=>{
    res.render('sessions/register')
})
// Vista de login
router.get('/login', (req, res)=>{
    console.log("entra en el redirect de login")
    res.render('sessions/login')
})

//Api para crear usuarios en la db
router.post('/register', async(req,res)=>{
    console.log('entra en crear usuario')
    console.log('body', req.body)
    const userNew = req.body
    console.log("UserNew: ",userNew)
    if(isAdmin(userNew)){
        userNew.role='admin'
    }else userNew.role='user'

    const user = new userModel(userNew)
    await user.save()
    res.redirect('/session/login')
})

const isAdmin=(user)=>{
    return(user.email=='adminCoder@coder.com'&& user.password=='adminCod3r123')
}


//API para login
router.post('/login', async(req,res)=>{
    console.log("Body ", req.body)
    //const {email, password} = req.body
    const {email, password}=req.body
    console.log('email and pwd', email+"  "+password)
    const user = await userModel.findOne({email, password}).lean().exec()
    console.log('user', user)
    if(!user){
        return res.status(401).render('errors/base', {
            error: 'Error en email y/o password'
        })
    }

    req.session.user = user
    res.redirect('/api/products')
})

//cerrar sesion
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) {
            console.log(err)
            res.status(500).render('erros/base', {error:err})
        }
        else {
            console.log("logged out")
            res.redirect('/session/login')
        } 
    })
})

//GITHUB

router.get(
    '/github',
         //   console.log('entra en github')
    //}
    passport.authenticate('github',{scope:['user:email']}),
    async(req,res)=>{}
)

router.get(
    '/githubcallback',
    passport.authenticate('github',{failureRedirect: '/login'}),
    async(req,res) =>{
        console.log("callback: ", req.user)
        req.session.user = req.user
        console.log("User Session", req.session.user)
        res.redirect('/api/products')
    } 
)

export default router
