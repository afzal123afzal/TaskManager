const mongoose = require('mongoose')
const User = require('../model/userModel')
const Ticket = require('../model/ticketModel')
const Incident = require('../model/incidentModel')
const jwt = require("jsonwebtoken");


/////////// create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// add a user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.signup(name, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//////// edit a user

const editDetails = async (req, res) => {
    // const id = req.params.id;
    const id = req.user.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid User Id" });
        }
        const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body });
        if (!user) {
            return res.status(200).json({ mssg: "User Not Found" });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ mssg: error.message });
    }
};

////////// delete a user

const deleteUser = async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {

        const deleted = await User.findByIdAndDelete({ _id: id })
        if (!deleted) {
            return res.status(400).json({ mssg: "No such user" })
        }
        res.status(200).json({ mssg: `${deleted.name} has been deleted!!!` })

    } catch (error) {
        res.status(401).json("Deleted")
    }
}


//////// incident creation
const createIncident = async (req, res) => {
    const { name } = req.body
    try {
        // Create a new incident object with the data from the request body
        const incident = await Incident.findOne({ name })

        if (!incident) {
            const newIncident = new Incident({
                name: req.body.name,
                description: req.body.description,
                priority: req.body.priority,
                createdBy: req.user.name
            });

            // Save the incident to the database
            await newIncident.save();

            res.status(201).json({ message: 'Incident created successfully.' });
        }
        res.status(400).json({ msg: "Its already existed" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

//////// get all tickets

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('incident');
        res.json(tickets);
    } catch (err) {
        res.status(400).json(err.message)
    }
};


module.exports = {

    deleteUser,
    signupUser,
    editDetails,
    createIncident,
    getAllTickets
}