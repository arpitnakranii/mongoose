const Joi = require('joi')
const usermodel = require('../Model/user')
const JWT = require('jsonwebtoken')
const Secret = 'Arpit_1022'


exports.insert = async (req, res) => {

    var data = await usermodel.find({ username: req.body.username })
    console.log(data.length)
    if (data.length>0) {
        return res.status(200).json({
            massage: "user Already register",
            status:"True",
            data
        })
    }

   var Validate = validation(req.body)
   if(Validate.error)
    {
        res.status(404).json({
            massage:"Enter valid Name"
        })
    }
    
    var result = await usermodel.create(req.body)

    if (!result) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    var Token = await JWT.sign({ result }, Secret);
    res.status(200).json({
        massage: 'Data insert Succsessfull',
        status: 200,
        result,
        Token
    })
}

exports.login = async (req, res) => {

    try {
        var result = await usermodel.findOne({ username: req.body.username });
        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        result.LastLogin = new Date()
        result.save()
        var tocken = await JWT.sign({ result }, Secret)
     
        res.status(200).json({
            massage: "You can Login",
            result,
            tocken
        })
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {

        const token = req.headers.authorization;
        console.log(token)
        const decoded = JWT.verify(token, Secret);
        var id = decoded["result"]["_id"]
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        var result = await usermodel.findById(id);
        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        result.Coin = req.body.coin
        result.save()
        var tocken = await JWT.sign({ result }, Secret)
        res.status(200).json({
            massage: "Coin Update",
            result,
            tocken
        })
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred",
            //error: error.message
        });
    }
}

exports.fatch = async(req,res)=>{
    

    var start = req.body.start;
    var limit = req.body.limit;


    var TotalRecord = await usermodel.find().count();

    var totalPage = Math.ceil(TotalRecord/limit)
    var data = await usermodel.find().limit(limit).skip(start)

    res.status(200).json({
        TotalRecord,
        totalPage,
        start,
        limit,
        data
    })



}



function validation(course) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(10).required(),
        password: Joi.number().min(3).max(10).required()
    });
    return schema.validate(course)

}