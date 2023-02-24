import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import { JWT_COOKIE_NAME, JWT_PRIVATE_KEY } from './config/credentials.js'

import passport from 'passport'

 

export default __dirname

export const createHash = password =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword =(user, password)=>{
    return(bcrypt.compareSync(password, user.password))
}


//JWT
// genera el token cuando el user viene por primera vez, lo devuelve
export const generateToken = user=> {
    const token = jwt.sign({user}, JWT_PRIVATE_KEY, {expiresIn:'24'})
    return token
}

//intenta obtener el token del cookie especificado, maneja dos errores, si no viene o si viene pero el verify da error, devuelve not autorized
export const authToken = (req,res,next) => {
    const token = req.cookies.JWT_COOKIE_NAME

    if(!token) return res.status(401).render('errors/base', {error: 'Not Authenticated'}) // NO TIENE TOKEN, NO VINO
    jwt.verify(token, JWT_PRIVATE_KEY, (error, credentials)=>{
        if(error) return res.status(403).render('errors/base', {error: 'Not Authorized'}) // VINO PERO NO ESTA AUTORIZADO 
        req.user = credentials.user // si no hay errores, seteo el user para la sesion
        next()
    })
}


//solo extrae la cookie
export const extractCookie = req => {
    return (req && req.cookies)? req.cookies.JWT_COOKIE_NAME : null
}

export const passportCall = (strategy) => {
    return async (req,res,next) =>{
        passport.authenticate(strategy, function(err, user,info){
            if(err) return next(err)
            if(!user)return res.status(401).render('errors/base', {error:info.messages ? info.messages : info.toString()})
            req.user = user
            next()
        })(req,res,next) // PREGUNTAR ???
    }
}