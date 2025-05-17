document.addEventListener('DOMContentLoaded', () => {
    const passwordContainer = document.getElementById('password-container');
    const letterSection = document.getElementById('letter-section');
    const passwordInput = document.getElementById('password-input');
    const submitPasswordButton = document.getElementById('submit-password');
    const errorMessage = document.getElementById('error-message');
    const body = document.body;
    const pageFooter = document.getElementById('page-footer');

    const correctPassword = "roxana"; // ¡Esta es la contraseña!

    // Controles de música
    const musicControls = document.getElementById('music-controls');
    const backgroundMusic = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-button');
    let isPlaying = false;

    // Event listener para el botón de enviar contraseña
    submitPasswordButton.addEventListener('click', checkPassword);

    // Event listener para la tecla "Enter" en el campo de contraseña
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento por defecto del Enter en un formulario
            checkPassword();
        }
    });

    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        if (enteredPassword === correctPassword) {
            // Ocultar pantalla de contraseña con transición
            passwordContainer.style.opacity = '0';
            setTimeout(() => {
                passwordContainer.classList.remove('active');
                passwordContainer.classList.add('hidden');

                // Mostrar pantalla de la carta
                body.classList.add('letter-view-bg'); // Cambia el fondo del body
                letterSection.classList.remove('hidden');
                letterSection.classList.add('active'); // Activa la opacidad de la sección
                
                // Activar la animación de la carta (el CSS se encarga de la transición)
                // document.getElementById('letter').classList.add('visible');


                // Mostrar controles de música y pie de página
                musicControls.classList.remove('hidden');
                pageFooter.classList.remove('hidden');
                pageFooter.classList.add('active');

                // Opcional: Intentar reproducir música automáticamente
                // Es posible que los navegadores lo bloqueen hasta una interacción del usuario más directa con el audio.
                // if (backgroundMusic.src && backgroundMusic.currentSrc) { // Asegura que hay una fuente válida
                //    togglePlayPause(); // Intenta reproducir
                // }

            }, 500); // Duración de la transición de opacidad de password-container
        } else {
            errorMessage.classList.remove('hidden');
            // Añadir un pequeño temblor al campo o al mensaje de error
            passwordInput.classList.add('input-error-shake');
            errorMessage.classList.add('error-shake');
            setTimeout(() => {
                passwordInput.classList.remove('input-error-shake');
                errorMessage.classList.remove('error-shake');
            }, 500);
            passwordInput.focus();
            passwordInput.select();
        }
    }

    // Funcionalidad del botón de música
    playPauseButton.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        if (!backgroundMusic.currentSrc) { // Si no hay una URL válida de música
            playPauseButton.textContent = 'Música no disponible';
            console.warn("No hay una fuente de música válida cargada.");
            return;
        }

        if (isPlaying) {
            backgroundMusic.pause();
            playPauseButton.textContent = 'Reproducir Música';
        } else {
            backgroundMusic.play().then(() => {
                playPauseButton.textContent = 'Pausar Música';
            }).catch(error => {
                console.error("Error al reproducir música:", error);
                playPauseButton.textContent = 'Error Audio';
                // Esto puede pasar si el navegador bloquea la reproducción automática
                // o si el archivo de audio no es accesible.
            });
        }
        isPlaying = !isPlaying;
    }

    // Pequeñas animaciones de error para CSS (opcional)
    // Puedes añadir esto al final de tu style.css si quieres un efecto de temblor
    /*
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .input-error-shake, .error-shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    */
    // Si decides usar las clases de shake, descomenta las líneas en checkPassword()
    // y añade el @keyframes a tu style.css. Por simplicidad, las he dejado comentadas.
});