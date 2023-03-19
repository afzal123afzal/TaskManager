
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  createdBy: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'User',
    required: true
  },
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

