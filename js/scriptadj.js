$(document).ready(function () {
    // Charger les réservations avec les détails de l'utilisateur
   
        async function chargerReservations() {
            try {
                const response = await fetch(`${apiUrl}/reservations`);
        
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
        
                const data = await response.json();
                const reservationsTable = $('#reservationsTable');
                const noReservationsDiv = $('#noReservations');
        
                // Vider le tableau avant d'ajouter les nouvelles lignes
                reservationsTable.empty();
        
                // Vérifier s'il y a des réservations à afficher
                if (!data.reservations || data.reservations === "0" || (Array.isArray(data.reservations) && data.reservations.length === 0)) {
                    noReservationsDiv.show(); // Afficher le message "Aucune donnée"
                } else {
                    noReservationsDiv.hide(); // Masquer le message
        
                    // Si `reservations` est une collection (tableau)
                    if (Array.isArray(data.reservations)) {
                        data.reservations.forEach(reservation => {
                            reservationsTable.append(`
                                <tr>
                                    <td>${reservation.id}</td>
                                    <td>${reservation.utilisateur}</td>
                                    <td>${reservation.email}</td>
                                    <td>${reservation.evenement}</td>
                                    <td>${reservation.nombreDePlaces}</td>
                                    <td>${new Date(reservation.dateReservation).toLocaleDateString()}</td>
                                    <td>${reservation.lieu}</td>
                                    <td><img src="${reservation.image}" alt="Image du lieu de reservation" style="width: 100px; height: auto;"></td>
                
                                    <td>
                                        <button class="btn btn-danger btn-sm cancel-btn" data-id="${reservation.id}"
                                                data-user="${reservation.utilisateur}" data-event="${reservation.evenement}"
                                                data-seats="${reservation.nombreDePlaces}" data-date="${reservation.dateReservation}">
                                            Annuler
                                        </button>
                                    </td>
                                </tr>
                            `);
                        });
                    } else {
                        // Si `reservations` est un seul objet
                        const reservation = data.reservations;
                        reservationsTable.append(`
                            <tr>
                                <td>${reservation.id}</td>
                                <td>${reservation.utilisateur}</td>
                                <td>${reservation.email}</td>
                                <td>${reservation.evenement}</td>
                                <td>${reservation.nombreDePlaces}</td>
                                <td>${new Date(reservation.dateReservation).toLocaleDateString()}</td>
                                <td>${reservation.lieu}</td>
                                <td><img src="${reservation.image}" alt="Image du lieu de reservation" style="width: 100px; height: auto;"></td>
                
                                <td>
                                    <button class="btn btn-danger btn-sm cancel-btn" data-id="${reservation.id}"
                                            data-user="${reservation.utilisateur}" data-event="${reservation.evenement}"
                                            data-seats="${reservation.nombreDePlaces}" data-date="${reservation.dateReservation}">
                                        Annuler
                                    </button>
                                </td>
                            </tr>
                        `);
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement des réservations :", error);
            }
        }
        
  

    // Charger les réservations au chargement de la page
    chargerReservations();

    // Gestion de l'événement de clic sur le bouton d'annulation
    $('#reservationsTable').on('click', '.cancel-btn', function () {
        // Obtenir les informations de la réservation à partir des attributs data
        const reservationId = $(this).data('id');
        const reservationUser = $(this).data('user');
        const reservationEvent = $(this).data('event');
        const reservationSeats = $(this).data('seats');
        const reservationDate = $(this).data('date');

        // Remplir les informations dans le pop-up
        $('#reservationId').text(reservationId);
        $('#reservationUser').text(reservationUser);
        $('#reservationEvent').text(reservationEvent);
        $('#reservationSeats').text(reservationSeats);
        $('#reservationDate').text(reservationDate);

        // Afficher le pop-up
        $('#cancelReservationModal').modal('show');
    });

    // Gestion de l'événement de confirmation de l'annulation
    $('#confirmCancelReservation').click(function () {
        // Ici, ajouter la logique pour annuler la réservation (par exemple, envoyer une requête au serveur)
        const reservationId = $('#reservationId').text();
        console.log(`Réservation ID ${reservationId} annulée.`);

        // Fermer le pop-up après la confirmation
        $('#cancelReservationModal').modal('hide');

        // Recharger les réservations (ou supprimer directement la ligne du tableau)
        chargerReservations();
    });

    // Gestion de l'événement de soumission du formulaire d'ajout d'événement
    $('#addEventForm').submit(function (e) {
        e.preventDefault(); // Empêcher le rechargement de la page

        // Valider les champs du formulaire
        const eventTitle = $('#eventTitle').val();
        const eventDescription = $('#eventDescription').val();
        const eventSeats = $('#eventSeats').val();
        const eventDate = $('#eventDate').val();
        const eventImage = $('#eventImage').val();

        if (!eventTitle || !eventDescription || !eventSeats || !eventDate || !eventImage) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        if (eventSeats <= 0) {
            alert('Le nombre de places doit être supérieur à 0.');
            return;
        }

        // Ici, ajouter la logique pour sauvegarder le nouvel événement (par exemple, envoyer une requête au serveur)
        console.log('Nouvel événement ajouté:', {
            title: eventTitle,
            description: eventDescription,
            seats: eventSeats,
            date: eventDate,
            image: eventImage
        });

        // Fermer le pop-up après l'ajout
        $('#addEventModal').modal('hide');

        // Réinitialiser le formulaire
        $('#addEventForm')[0].reset();
    });
});
