// Closure to manage and verify seat bookings
const SeatBooking = (function () {
  const bookedSeats = new Set();

  return {
    isBooked: function (seat) {
      return bookedSeats.has(seat);
    },
    bookSeat: function (seat) {
      if (this.isBooked(seat)) {
        return false;
      }
      bookedSeats.add(seat);
      return true;
    }
  };
})();

document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ticketId = document.getElementById("ticketId").value;
  const passengerName = document.getElementById("passengerName").value;
  const busNo = document.getElementById("busNo").value;
  const date = document.getElementById("date").value;
  const seatNo = parseInt(document.getElementById("seatNo").value);
  const fare = document.getElementById("fare").value;

  if (SeatBooking.isBooked(seatNo)) {
    document.getElementById("output").innerHTML = `<p style="color:red;">Seat No ${seatNo} is already booked.</p>`;
  } else {
    SeatBooking.bookSeat(seatNo);
    document.getElementById("output").innerHTML = `
      <p style="color:green;"><strong>Booking Confirmed!</strong></p>
      <ul>
        <li>Ticket ID: ${ticketId}</li>
        <li>Name: ${passengerName}</li>
        <li>Bus No: ${busNo}</li>
        <li>Date: ${date}</li>
        <li>Seat No: ${seatNo}</li>
        <li>Fare: ₹${fare}</li>
      </ul>
    `;
    this.reset();
  }
});
