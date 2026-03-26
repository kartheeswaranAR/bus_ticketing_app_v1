// import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div>
			<h2>Bus Booking</h2>
			{/* <Link to="/">Reservation</Link> | <Link to="/dashboard">Dashboard</Link> */}
			<nav style={{ background: "#333", padding: 10 }}>
				<a href="/" style={{ color: "white", margin: 10 }}>
					Reservation
				</a>
				<a href="/dashboard" style={{ color: "white", margin: 10 }}>
					Dashboard
				</a>
			</nav>
		</div>
	);
}
