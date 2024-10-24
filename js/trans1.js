
        const apiUrl = 'http://127.0.0.1:8000/api/register';

        function openSignupModal() {
            document.getElementById('signupModal').style.display = 'block';
        }

        function openLoginModal() {
            document.getElementById('loginModal').style.display = 'block';
        }

        function openPasswordResetModal() {
            closeModal('loginModal');
            document.getElementById('passwordResetModal').style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Fonction d'inscription
        async function signupUser() {
            const name = document.getElementById('signupName').value;
            const lastname = document.getElementById('signupLastname').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            alert(name+"  "+lastname+"  "+email+"  "+password);

            /*const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password
                })
            });*/

            if (response.ok) {
                alert('Inscription réussie !');
                closeModal('signupModal');
            } else {
                alert('Erreur lors de l\'inscription');
            }
        }

        // Fonction de connexion
        async function loginUser() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                alert('Connexion réussie !');
                closeModal('loginModal');
            } else {
                alert('Erreur de connexion');
            }
        }

        // Fonction de restauration de mot de passe
        async function resetPassword() {
            const lastname = document.getElementById('resetLastname').value;
            const email = document.getElementById('resetEmail').value;

            const response = await fetch(`${apiUrl}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lastname: lastname,
                    email: email
                })
            });

            if (response.ok) {
                alert('Instructions de restauration envoyées !');
                closeModal('passwordResetModal');
            } else {
                alert('Erreur lors de la restauration du mot de passe');
            }
        }
  