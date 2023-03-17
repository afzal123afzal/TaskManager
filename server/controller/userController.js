const User = require('../model/userModel')
const Ticket = require('../model/ticketModel')
const jwt = require('jsonwebtoken')

/////////// create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };


//////////// login
const login = async (req, res) => {

    const { email, password } = req.body
  
    try {
      const user = await User.login(email, password)
      const name = user.name
      // const _id = user._id
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({  name, token })
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  
  };

  /////////// createTicket
  const createTicket = async (req, res) => {
    try {
      // Create a new ticket object with the data from the request body
      const newTicket = new Ticket({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user.name,
        incident: req.body.incident
      });
  
      // Save the ticket to the database
      await newTicket.save();
  
      res.status(201).json({ message: 'Ticket created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  module.exports = {
    login,
    createTicket
  }