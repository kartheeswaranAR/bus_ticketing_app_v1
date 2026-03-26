const Ticket = require('../models/ticketModel');
const emitter = require('../events/ticketEvents');

exports.bookTicket = async (seatNumber, userData) => {
  const ticket = await Ticket.findOneAndUpdate(
    { seatNumber, status: "OPEN" },
    { status: "BOOKED", user: userData, bookedAt: new Date() },
    { new: true }
  );

  if (!ticket) throw new Error("Seat already booked");

  emitter.emit("ticketBooked", ticket);
  return ticket;
};

exports.getTicket = async (seatNumber) => {
  return await Ticket.findOne({ seatNumber });
};

exports.getOpenTickets = async () => {
  return await Ticket.find({ status: "OPEN" });
};

exports.getClosedTickets = async () => {
  return await Ticket.find({ status: "BOOKED" });
};

exports.updateTicket = async (seatNumber, data) => {
	return await Ticket.findOneAndUpdate(
		{ seatNumber },
		{
			user: {
				name: data.name,
				email: data.email,
			},
		},
		{ new: true },
	);
};

exports.deleteTicket = async (seatNumber) => {
	return await Ticket.findOneAndUpdate(
		{ seatNumber },
		{
			status: "OPEN",
			user: null,
			bookedAt: null,
		},
		{ new: true },
	);
};

exports.resetTickets = async () => {
  await Ticket.updateMany({}, {
    status: "OPEN",
    user: null,
    bookedAt: null
  });

  emitter.emit("reset");
};