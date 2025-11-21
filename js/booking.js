document.getElementById("btnMap").onclick = () => {
    let p = pickup.value;
    let d = drop.value;
    if (!p || !d) return alert("Enter pickup & drop!");
    showDirections(p, d);
};

// OTP generator
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

// WhatsApp booking
document.getElementById("btnWhatsApp").onclick = () => {
    let p = pickup.value;
    let d = drop.value;

    let otp = generateOTP();
    otpBox.innerText = "Ride OTP: " + otp;

    let msg = 
`*Raindrop Taxi Booking*%0A
Pickup: ${p}%0A
Drop: ${d}%0A
OTP: ${otp}`;

    window.open(`https://wa.me/919486576643?text=${msg}`, "_blank");
};

// Razorpay Payment
document.getElementById("btnPay").onclick = () => {
    var options = {
        key: "rzp_test_dummy123",
        amount: 1000 * 100, // ₹1000
        currency: "INR",
        name: "Raindrop Taxi",
        description: "Ride Payment",
        handler: function (response) {
            alert("Payment Success: " + response.razorpay_payment_id);
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
};

// MULTIPLE DRIVERS
let drivers = [
    { name: "Prasanth", car: "Honda City", number: "TN31 CJ6035" },
    
];

let driverList = document.getElementById("driverList");

drivers.forEach((d) => {
    let div = document.createElement("div");
    div.className = "driver-card";
    div.innerHTML = `<b>${d.name}</b><br>${d.car}<br>${d.number}`;
    driverList.appendChild(div);
});
