export const saveBooking = (data) => {
	const existing = JSON.parse(localStorage.getItem("tickets")) || [];
	existing.push(data);
	localStorage.setItem("tickets", JSON.stringify(existing));
};

export const getBookings = () => {
	return JSON.parse(localStorage.getItem("tickets")) || [];
};
