let map = L.map('map').setView([11.75, 79.76], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let route;

function showRoute() {
    let p = pickup.value;
    let d = drop.value;

    Promise.all([
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${p}`).then(r => r.json()),
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${d}`).then(r => r.json())
    ]).then(([A, B]) => {
        let C1 = [A[0].lat, A[0].lon];
        let C2 = [B[0].lat, B[0].lon];

        if(route) map.removeControl(route);

        route = L.Routing.control({
            waypoints: [L.latLng(C1), L.latLng(C2)]
        }).addTo(map);
    });
}

function bookWA() {
    let msg = `
Raindrop Taxi Booking:
Pickup: ${pickup.value}
Drop: ${drop.value}
Time: ${time.value}
Vehicle: ${vehicle.value}
`;

    window.open(`https://wa.me/919486576643?text=${encodeURIComponent(msg)}`);
}

function upiPay() {
    window.location.href = `upi://pay?pa=prasanthvjm890-1@okhdfcbank&pn=RaindropTaxi&cu=INR`;
}
