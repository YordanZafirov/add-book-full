let selectedRow;
document.querySelector(".data").addEventListener('click', e => {
    if (e.target.classList.contains('show-map')) {
        selectedRow = e.target.parentElement.parentElement;
        let coordinates = selectedRow.children[5].textContent;

        let [latitude, longitude] = coordinates.split(',')

        let mapOptions = {
            center: [latitude.trim(), longitude.trim()],
            zoom: 13
        }

        let map = L.map('map').setView(mapOptions.center, mapOptions.zoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = L.marker(mapOptions.center).addTo(map);
    }
})