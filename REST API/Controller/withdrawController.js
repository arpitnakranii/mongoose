const Withdraw = require('../Model/withdraw');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const withdraw = require('../Model/withdraw');

const Secret = 'Arpit_1022'

exports.AddBankAccount = async (req, res) => {

    token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, Secret);

        if (!decoded || Object.keys(decoded).length === 0) {
            return res.status(401).json({
                message: "Token is invalid or expired"
            });
        }
        var data = await withdraw.findOne({UserId:decoded["result"]["_id"]})
        
        if (data!=null) {
            return res.status(200).json({
                massage: "Already Add Bank Account You Not Add Another Bank Account", 
            })
        }
        var data = await withdraw.create(req.body)
        data.UserId = decoded["result"]["_id"]
        data.save()
        res.status(200).json({
            status:200,
            massage:"Add Bank Account Successfull",
            data
        });

    } catch (error) {
        console.error("Token verification error:", error);

        return res.status(401).json({
            message: "Token is invalid or expired"
        });
    }
}


function validation(course) {
    const schema = Joi.object({
        bankName: Joi.string().min(3).max(10).required(),
        accountNumbber: Joi.number().min(12).max(12).required(),
        recipientName: Joi.string().min(3).max(10).required()
    });
    return schema.validate(course)

}