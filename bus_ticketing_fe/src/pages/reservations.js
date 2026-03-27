import { useEffect, useState } from "react";
import API from "../api";
import Seat from "../components/seat";
import { saveBooking } from "../utils/storage";

export default function Reservation() {
	const [seats, setSeats] = useState([]);
	const [selected, setSelected] = useState(null);
       const [loading] = useState(false);
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});

	const fetchSeats = async () => {
		const open = await API.get("/tickets/open/all");
		const closed = await API.get("/tickets/closed/all");

		// Create map
		const seatMap = {};

		open.data.forEach((s) => {
			seatMap[s.seatNumber] = s;
		});

		closed.data.forEach((s) => {
			seatMap[s.seatNumber] = s; // overwrite if booked
		});

		// Convert to sorted array
		const merged = Object.values(seatMap).sort(
			(a, b) => a.seatNumber - b.seatNumber,
		);

		setSeats(merged);
	};
       

	useEffect(() => {
		fetchSeats();
	}, []);

	const bookSeat = async () => {
		const payload = {
			name: form.firstName + " " + form.lastName,
			email: form.email,
			bookedAt: form.bookedAt,
		};

              if (loading) return;
		// ✅ Backend
		await API.post(`/tickets/book/${selected.seatNumber}`, payload);

		// ✅ LocalStorage
		saveBooking({
			...payload,
			seatNumber: selected.seatNumber,
		});

		alert("Booked Successfully");
		fetchSeats();
	};

	return (
		<div>
			<h2>Bus Reservation</h2>

			<div style={{ display: "flex", justifyContent: "center" }}>
				<div>
					<h4>Driver</h4>

					<div
						style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)" }}>
						{seats.slice(0, 20).map((s) => (
							<Seat key={s.seatNumber} seat={s} onClick={setSelected} />
						))}
					</div>

					<h4>Upper Deck</h4>

					<div
						style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)" }}>
						{seats.slice(20, 40).map((s) => (
							<Seat key={s.seatNumber} seat={s} onClick={setSelected} />
						))}
					</div>
				</div>
			</div>

			{selected && (
				<div style={{ marginTop: 20 }}>
					<h3>Booking Seat {selected.seatNumber}</h3>

					<input
						placeholder="First Name"
						onChange={(e) => setForm({ ...form, firstName: e.target.value })}
					/>

					<input
						placeholder="Last Name"
						onChange={(e) => setForm({ ...form, lastName: e.target.value })}
					/>

					<input
						placeholder="Email"
						onChange={(e) => setForm({ ...form, email: e.target.value })}
					/>

					<input
						type="datetime-local"
						onChange={(e) => setForm({ ...form, bookedAt: e.target.value })}
					/>

					<button onClick={bookSeat} disabled={!selected}>
						Confirm Booking
					</button>
				</div>
			)}
		</div>
	);
}
