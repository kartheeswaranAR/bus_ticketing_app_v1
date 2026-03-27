require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const Ticket = require("./models/ticketModel");

connectDB();

const initSeats = async () => {
	const count = await Ticket.countDocuments();
	if (count === 0) {
		let seats = [];
		for (let i = 1; i <= 40; i++) {
			seats.push({ seatNumber: i });
		}
		await Ticket.insertMany(seats);
		console.log("Seats initialized");
	}
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});