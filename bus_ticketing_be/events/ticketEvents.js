const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("ticketBooked", (data) => {
	console.log(`Seat ${data.seatNumber} booked`);
});

emitter.on("reset", () => {
	console.log("All tickets reset");
});

module.exports = emitter;
