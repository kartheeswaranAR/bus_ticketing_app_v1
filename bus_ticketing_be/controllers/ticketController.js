const service = require('../services/ticketServices');

exports.book = async (req, res, next) => {
       try {
              const ticket = await service.bookTicket(req.params.seatNumber, req.body);
              console.log(req.headers.authorization);
              res.json(ticket);
       } catch (err) {
              next(err);
       }
};

exports.getOne = async (req, res) => {
       const ticket = await service.getTicket(req.params.seatNumber);
       res.json(ticket);
};

exports.update = async (req, res, next) => {
	try {
		const ticket = await service.updateTicket(req.params.seatNumber, req.body);
		res.json(ticket);
	} catch (err) {
		next(err);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const ticket = await service.deleteTicket(req.params.seatNumber);
		res.json(ticket);
	} catch (err) {
		next(err);
	}
};

exports.open = async (req, res) => {
       res.json(await service.getOpenTickets());
};

exports.closed = async (req, res) => {
       res.json(await service.getClosedTickets());
};

exports.reset = async (req, res) => {
       await service.resetTickets();
       res.json({ message: "Reset successful" });
};