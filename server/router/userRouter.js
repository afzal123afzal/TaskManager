
const express = require('express')
const router = express.Router()
const {
    login,
    createTicket
} = require('../controller/userController')
const requireUserAuth = require('../middleware/requireUserAuth')

/////////user login
router.post('/login',login)


// Route for creating a new ticket
router.post('/tickets',requireUserAuth, createTicket);


module.exports = router