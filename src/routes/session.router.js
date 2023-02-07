import {Router} from 'express'
import userModel from '../dao/models/user.model.js'

const router = Router()

//Vista para registrar usuarios
router.get('/register', (req,res)=>{
    res.render('sessions/register')
})
// Vista de login
router.get('/login', (req, res)=>{
    console.log("entra en el redirect")
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

export default router
