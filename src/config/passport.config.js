import passport from "passport"
import userModel from "../dao/models/user.model.js"
import GitHubStrategy from "passport-github2"

const initializatePassport = ()=>{

    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.2caed7d087464c63',
        clientSecret: 'd924a908e12ada000d593a3198b3d423a294d956',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async(accessToken, refreshToken, profile, done)=>{
        console.log("profile en passport",profile)
        console.log("name en profile", profile._json.login)
        console.log("email en profile", profile._json.email)
        
        try{
            const user = await userModel.findOne({email:profile._json.email})
            if(user) return done(null,user)
            const newUser = new userModel({
                first_name: profile._json.login,
                last_name:'',
                email: profile._json.email,
                age:'30',
                password: 'aplicar bcrypt',
                role:'admin'
            })
            await newUser.save()
            console.log("new User:", newUser)
            return done(null, newUser)
        }
        catch(error){
            return done('Error to login with github' + error)
        }

    }))
    
    passport.serializeUser((user, done)=>{
       done(null, user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        const user = userModel.findById(id)
        done(null, user)
    })
}

export default initializatePassport