let API = "7633c95c-c6bb-11f0-a6b2-0200cd936042";

function sendOTP() {
    let ph = phone.value;

    fetch(`https://2factor.in/API/V1/${API}/SMS/${ph}/AUTOGEN`)
        .then(r => r.json())
        .then(data => {
            localStorage.setItem("session", data.Details);
            window.location = "verify.html";
        });
}

function verify() {
    let otp = document.getElementById("otp").value;
    let session = localStorage.getItem("session");

    fetch(`https://2factor.in/API/V1/${API}/SMS/VERIFY/${session}/${otp}`)
        .then(r => r.json())
        .then(data => {
            if (data.Status === "Success") {
                localStorage.setItem("user", "ok");
                window.location = "index.html";
            } else alert("Invalid OTP");
        });
}
