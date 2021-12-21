const userSchema = require('../models/schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// handle errors
const handleError = (err) =>{
// console.log(err.message, err.code)
let errors = {username:''}

if(err.code === 11000){
   errors.username = 'Email already taken'
   return errors
}
}

const register_form = (req, res)=>{
   res.render('register')
}
const login_form = (req, res)=>{
   res.render('login')
}


const register = async(req,res) =>{

   const { firstname, lastname, username, password: plainTextPassword } = req.body

   // if(!firstname || typeof firstname !== 'string'){
   //    return res.status(400).json({msg:'Please provide firstname'})
   // }

//    if(!lastname || typeof lastname !== 'string'){
//       return res.status(400).json({msg:'Please provide lastname'})
//    }

// if(!username || typeof username !== 'string'){
// return res.status(400).json({msg:'Invalid Username'})
// }

// if(!plainTextPassword){
// return res.status(400).json({msg:'Invalid Password'})

// }
// if(plainTextPassword.length < 5){
//    return res.status(500).json({msg:'Password must atleast 5 characters'})
//    }
   
   const userpass = await bcrypt.hash(plainTextPassword, 10)
   try {
      //kung ano yung structure sa schema mo same dapat sila
      const user = await userSchema.create({
         firstname,
         lastname,
         username,   
         userpass
      })
      const token = jwt.sign({ id: user._id},process.env.JWT_SECRET, {expiresIn:'30m'})
      res.cookie('Bearer', token, {httpOnly:true, maxAge:1000*60*30})
      console.log('Successfully Registered')
      res.status(201).json({id:user._id})
     
   }
   catch (err) {
      const errors = handleError(err)
      res.status(400).json({ error:errors })
      // console.log(errors);
   
      
   } 
}

const login = async(req, res) =>{
const {username, password} = req.body
const user = await userSchema.findOne({username}).lean()
if(!user){
  return res.status(500).json({msg:'Invalid Username/Password'})
}

if(username !== user.username){
   return res.status(500).json({msg:'Invalid username/password'})
 }

 if(!username){
   return res.status(500).json({msg:'Please input username'})
 }
 if(!password){
   return res.status(500).json({msg:'Please input Password'})
 } 

if(await bcrypt.compare(password, user.userpass)){


   const token = await jwt.sign({ id: user._id},process.env.JWT_SECRET, {expiresIn:'30m'})
   res.cookie('Bearer', token, {httpOnly:true, maxAge:1000*60*30})
   console.log('Successfully login')
  return res.status(201).json({user:user._id})
  
}
res.status(500).json({msg:'Invalid User/Pass'})
console.log('Invalid User/Pass');
}


const logout = (req, res) =>{
   res.cookie('Bearer','', {maxAge:1})
   res.redirect('/')
}

module.exports = {register, login, register_form, login_form, logout}