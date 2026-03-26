const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seatNumber: { type: Number, unique: true },
  status: { type: String, enum: ["OPEN", "BOOKED"], default: "OPEN" },
  user: {
    name: String,
    age: Number,
    gender: String
  },
  bookedAt: Date
});

module.exports = mongoose.model("Ticket", ticketSchema);