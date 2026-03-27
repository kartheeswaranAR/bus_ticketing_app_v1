import { useEffect, useState } from "react";
import API from "../api";
// import { getBookings } from "../utils/storage";

export default function Dashboard() {
	const [data, setData] = useState([]);
	const [editSeat, setEditSeat] = useState(null);
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});

	const fetchData = async () => {
		const apiRes = await API.get("/tickets/closed/all");
		const apiData = apiRes.data;

		const localData = JSON.parse(localStorage.getItem("tickets")) || [];

		const map = {};

		// Add backend data
		apiData.forEach((item) => {
			map[item.seatNumber] = item;
		});

		// Add local data ONLY if not already present
		localData.forEach((item) => {
			if (!map[item.seatNumber]) {
				map[item.seatNumber] = {
					...item,
					user: {
						name: item.name,
						email: item.email,
					},
					bookedAt: item.bookedAt,
				};
			}
		});

		setData(Object.values(map));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const startEdit = (seat) => {
		setEditSeat(seat.seatNumber);

		const [firstName, lastName] = (seat.user?.name || "").split(" ");

		setForm({
			firstName: firstName || "",
			lastName: lastName || "",
			email: seat.user?.email || "",
		});
	};

	const saveEdit = async () => {
		const payload = {
			name: form.firstName + " " + form.lastName,
			email: form.email,
		};

		await API.put(`/tickets/${editSeat}`, payload);

		// ✅ Update localStorage
		let local = JSON.parse(localStorage.getItem("tickets")) || [];

		local = local.map((item) =>
			item.seatNumber === editSeat ? { ...item, ...payload } : item,
		);

		localStorage.setItem("tickets", JSON.stringify(local));

		setEditSeat(null);
		fetchData();
	};

	const deleteSeat = async (seat) => {
		await API.delete(`/tickets/${seat}`);

		// ✅ Remove from localStorage
		let local = JSON.parse(localStorage.getItem("tickets")) || [];

		local = local.filter((item) => item.seatNumber !== seat);

		localStorage.setItem("tickets", JSON.stringify(local));

		fetchData();
	};

	return (
		<div>
			<h2>Passenger Dashboard</h2>

			<table border="1" style={{ margin: "auto", marginTop: 20 }}>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Seat</th>
						<th>Booking Date</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{data.map((d) => {
						const [firstName, lastName] = (d.user?.name || "").split(" ");

						return (
							<tr key={d.seatNumber}>
								<td>
									{editSeat === d.seatNumber ? (
										<input
											value={form.firstName}
											onChange={(e) =>
												setForm({ ...form, firstName: e.target.value })
											}
										/>
									) : (
										firstName
									)}
								</td>

								<td>
									{editSeat === d.seatNumber ? (
										<input
											value={form.lastName}
											onChange={(e) =>
												setForm({ ...form, lastName: e.target.value })
											}
										/>
									) : (
										lastName
									)}
								</td>

								<td>
									{editSeat === d.seatNumber ? (
										<input
											value={form.email}
											onChange={(e) =>
												setForm({ ...form, email: e.target.value })
											}
										/>
									) : (
										d.user?.email
									)}
								</td>

								<td>{d.seatNumber}</td>

								<td>
									{d.bookedAt ? new Date(d.bookedAt).toLocaleString() : "-"}
								</td>

								<td>
									{editSeat === d.seatNumber ? (
										<button onClick={saveEdit}>Save</button>
									) : (
										<button onClick={() => startEdit(d)}>Edit</button>
									)}

									<button onClick={() => deleteSeat(d.seatNumber)}>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
