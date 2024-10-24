document.addEventListener('DOMContentLoaded', function () {
    // Charger les données des réservations
    fetch('https://example.com/api/reservations')
        .then(response => response.json())
        .then(data => {
            let reservationsTableContainer = document.getElementById('reservationsTableContainer');
            let reservationsTable = document.getElementById('reservationsTable');

            if (data.length > 0) {
                // Montrer le tableau s'il y a des réservations
                reservationsTableContainer.style.display = 'block';

                data.forEach(reservation => {
                    let row = reservationsTable.insertRow();
                    row.insertCell(0).innerText = reservation.id;
                    row.insertCell(1).innerText = reservation.event;
                    row.insertCell(2).innerText = reservation.number_of_seats;
                    row.insertCell(3).innerText = reservation.reservation_date;

                    // Ajouter l'icône de suppression
                    let deleteCell = row.insertCell(4);
                    let deleteIcon = document.createElement('i');
                    deleteIcon.className = 'fa fa-trash text-danger';
                    deleteIcon.style.cursor = 'pointer';
                    deleteIcon.addEventListener('click', function () {
                        // Remplir les informations dans le pop-up
                        document.getElementById('reservationId').innerText = reservation.id;
                        document.getElementById('reservationEvent').innerText = reservation.event;
                        document.getElementById('reservationSeats').innerText = reservation.number_of_seats;
                        document.getElementById('reservationDate').innerText = reservation.reservation_date;

                        // Afficher le pop-up de confirmation
                        $('#cancelReservationModal').modal('show');
                    });
                    deleteCell.appendChild(deleteIcon);
                });
            } else {
                // Cacher le tableau s'il n'y a pas de réservations
                reservationsTableContainer.style.display = 'none';
            }
        })
        .catch(error => console.error('Erreur lors du chargement des réservations :', error));
});

