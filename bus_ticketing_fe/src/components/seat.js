export default function Seat({ seat, onClick }) {
	const isBooked = seat.status === "BOOKED";

	return (
		<div
			onClick={() => !isBooked && onClick(seat)}
			style={{
				width: 40,
				height: 40,
				margin: 8,
				borderRadius: 6,
				backgroundColor: isBooked ? "#ff6b6b" : "#e0e0e0",
				border: "1px solid #888",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				cursor: isBooked ? "not-allowed" : "pointer",
			}}>
			{seat.seatNumber}
		</div>
	);
}
