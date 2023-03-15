import {Router} from 'express'
import userModel from '../dao/models/user.model.js'
import passport from 'passport'
import {createHash} from '../utils.js'
const router = Router()

import { JWT_COOKIE_NAME } from '../config/credentials.js'

//Vista para registrar usuarios
router.get('/register', (req,res)=>{
    console.log('entra en /register')
    res.render('sessions/register')
})

//Api para crear usuarios en la db
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.json({result:'ok'})
})

router.get('/failregister',(req,res)=>{
    console.log("fail register")
    res.json({error:'failed register'})
})

// Vista de login
router.get('/login', (req, res)=>{
    console.log("entra en el redirect de login")
    res.render('sessions/login')
})



const isAdmin=(user)=>{
    return(user.email=='adminCoder@coder.com'&& user.password=='adminCod3r123')
}


//API para login usando estrategia JWT. Devuelve el token generado a traves de la cookie especificada en JWT_COOKIE_NAME
router.post('/login', passport.authenticate('login', {failureRedirect: '/session/failllllogin'}), async(req,res)=>{
    
    console.log("user")
    if(!req.user) {
        return res.status(400).send({status: 'error', error:'Invalid Credentials'})
    }
    req.session.user ={
        first_name : req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    }
    console.log("before response", req.session.user)
    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/api/products')
}
)

//cerrar sesion
router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) {
            console.log(err)
            res.status(500).render('erros/base', {error:err})
        }
        else {
            console.log("logged out")
            res.redirect('/api/session/login')
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
        console.log("callback: ")
        req.session.user = req.user
        console.log("User Session", req.session.user)
        res.redirect('/api/products')
    } 
)

export default router
