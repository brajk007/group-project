const express = require('express')
const { mailController } = require('../controllers/mailcontroller')

const addRouter = express.Router()

addRouter.get('/', mailController)



module.exports = addRouter