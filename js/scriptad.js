document.addEventListener('DOMContentLoaded', function () {
    // Ouvrir le formulaire d'ajout d'événement en pop-up
    document.getElementById('openEventForm').addEventListener('click', function () {
        $('#addEventModal').modal('show');
    });

    // Gérer la validation et la soumission du formulaire
    document.getElementById('submitEventForm').addEventListener('click', function () {
        // Récupérer les valeurs des champs
        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;
        const seats = document.getElementById('eventSeats').value;
        const date = document.getElementById('eventDate').value;
        const image = document.getElementById('eventImage').files[0];

        // Valider les champs
        if (!title) {
            alert('Veuillez sélectionner un titre.');
            return;
        }
        if (!description) {
            alert('Veuillez entrer une description.');
            return;
        }
        if (!seats || seats <= 0) {
            alert('Veuillez entrer un nombre de places supérieur à 0.');
            return;
        }
        if (!date) {
            alert('Veuillez sélectionner une date.');
            return;
        }
        if (!image) {
            alert('Veuillez sélectionner une image.');
            return;
        }

        // Création de l'objet FormData pour soumettre les données
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('number_of_seats', seats);
        formData.append('event_date', date);
        formData.append('image', image);

        // Envoi de la requête
        fetch('https://example.com/api/events', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Événement ajouté avec succès.');
                $('#addEventModal').modal('hide');
            } else {
                alert('Erreur lors de l\'ajout de l\'événement.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'ajout de l\'événement.');
        });
    });
});
