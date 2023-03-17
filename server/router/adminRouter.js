const express = require('express')
const router = express.Router()

const User = require('../model/userModel')
const {
    addUser,
    deleteUser,
    signupUser,
    editDetails,
    createIncident,
    getAllTickets

} = require('../controller/adminController')


const requireAdminAuth = require('../middleware/requireAdminAuth')



//////////// add user
// router.post('/add',addUser)
router.post('/add',requireAdminAuth, signupUser)

///////// Edit details
router.patch('/edit-details/:id', requireAdminAuth, editDetails)

///////// delete User
router.delete('/delete/:id', requireAdminAuth, deleteUser)

/////////// create incident
router.post('/incidents',requireAdminAuth,createIncident);

//////// get All tickets
router.get('/all-tickets',requireAdminAuth,getAllTickets);




module.exports = router