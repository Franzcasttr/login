const jwt = require('jsonwebtoken')
const User = require('../models/schema')


const authuser = (req,res,next) =>{
const token = req.cookies.Bearer
if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            res.redirect('/login')
            next()
        }
        else{
           
            next()
        }
    })
}
else{
    res.redirect('/login')
}
}

//eto yung kung gusto mo makita lang ay log out at ipapakita yung name ng user sa views or sa front end
const checkuser = (req,res, next) =>{
    const token = req.cookies.Bearer

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) =>{
            if(err){
                res.locals.user = null
                next()
            }
            else{
                
                let user = await User.findById(decoded.id) //id eto yung name na nilagay sa jwt.sign
                res.locals.user = user //res.locals para ma access mo ito sa front end
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}

module.exports = {authuser, checkuser}
