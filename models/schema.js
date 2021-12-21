const mongoose = require('mongoose')
const {isEmail} = require('validator')

const Schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, 'Please enter your first name'],
        
    },

    lastname:{
        type:String,
        required:[true, 'Please enter your last name'],
    },
    username:{
        type:String,
        required:[true, 'Please fill-up this field'],
        trim:true,
        validate:[isEmail, 'Please provide valid email'],
        unique:true
    },
    userpass:{
        type:String,
        required:[true, 'Please fill-up this field'],
        minlength:[6, 'Password must atleast 6 characters']
        
       
    }

})

module.exports = mongoose.model('Userlist', Schema)