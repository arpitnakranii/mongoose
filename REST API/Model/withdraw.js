const mongoos = require('mongoose')
const joi = require('joi')
var UserSchema =new mongoos.Schema({
    bankName :{
        type:String,
    },
    accountNumbber:{
        type:String
    },
    IFSCCode:{
        type:String
    },
    CreatAt:{
        type:Date,
        default:Date.now
    },
    recipientName:{
        type:String,
    },
    LastLogin:{
        type:Date,
        default:Date.now
    },
    UserId:{
        type:String
    }
    
})

module.exports = mongoos.model('Withdraw',UserSchema); 
