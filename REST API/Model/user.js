const mongoos = require('mongoose')
const joi = require('joi')
var UserSchema =new mongoos.Schema({
    username :{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    CreatAt:{
        type:Date,
        default:Date.now
    },
    Coin:{
        type:Number,
        default:0
    },
    LastLogin:{
        type:Date,
        default:Date.now
    },
    
})

module.exports = mongoos.model('Learning',UserSchema); 
