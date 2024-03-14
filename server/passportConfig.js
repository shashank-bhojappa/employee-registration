const express = require('express');
var jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/register.model.js')
var cookieParser = require('cookie-parser')

exports.initializingPassport = (passport) => {
    passport.use(new LocalStrategy(async(username,password,done)=>{
        try{
            const user = await User.findOne({username});

            if(!user) return done(null,false);
            if(user.password != password) return done(null,false);
            // const payload = {
            //     username: user.username,
            //     email: user.email
            // }
            // const options = {
            //     expiresIn: "7d"
            // }
            // const token = jwt.sign(payload, 'secret123', options);
            // res.cookie('auth',token);
            return done(null,user)
            
        }
        catch(error){
            return done(error,false)
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })

    passport.deserializeUser(async (id,done)=>{
        try{
            const user = await User.findById(id);
            done(null,user)
        }
        catch (error){
            done(error,false)
        }
    })
}

exports.isAuthenticated = (req,res,next)=>{
    if(req.user) return next();
    res.send('Not Allowed')
    // res.redirect('/api/employees/login')
}

exports.sendUser = (req,res,next)=>{
    return next()
    
}