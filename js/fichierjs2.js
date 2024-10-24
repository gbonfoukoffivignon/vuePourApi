document.addEventListener('DOMContentLoaded', function () {
    // Charger les données des réservations
    fetch('https://example.com/api/reservations')
        .then(response => response.json())
        .then(data => {
            let reservationsTable = document.getElementById('reservationsTable');
            data.forEach(reservation => {
                let row = reservationsTable.insertRow();
                row.insertCell(0).innerText = reservation.id;
                row.insertCell(1).innerText = reservation.event;
                row.insertCell(2).innerText = reservation.number_of_seats;
                row.insertCell(3).innerText = reservation.reservation_date;
            });
        })
        .catch(error => console.error('Erreur lors du chargement des réservations :', error));

    // Charger les autres données (concerts, meetings, fêtes) de manière similaire
});
