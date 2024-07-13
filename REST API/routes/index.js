var express = require('express');

var router = express.Router();
const path = require('path')


var UserController = require('../Controller/userController')
var withdrawController = require('../Controller/withdrawController')


router.post("/insert",UserController.insert)
router.post("/login",UserController.login)
router.post("/update",UserController.update)
router.post("/fatch",UserController.fatch)

router.post('/AddBankAccount',withdrawController.AddBankAccount)





module.exports = router;

