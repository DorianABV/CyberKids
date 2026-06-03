// Banco de preguntas basado en amenazas comunes y el marco teórico de CyberKids
const misiones = [
    {
        text: "📩 Mensaje de un desconocido: '¡Ganaste un premio de $1000! Dale clic a este enlace para reclamarlo ya'.",
        correct: "bloquear",
        feedback: "¡Excelente! Los enlaces de premios falsos suelen ser estafas (Phishing)."
    },
    {
        text: "🧑‍🏫 Tu profesora te envía un correo desde la plataforma del colegio con la tarea de matemáticas.",
        correct: "confiar",
        feedback: "¡Bien hecho! Es un canal oficial y una persona conocida."
    },
    {
        text: "🎮 Un jugador en línea te dice: 'Dame la contraseña de tu cuenta y te regalo skins exclusivas'.",
        correct: "bloquear",
        feedback: "¡Exacto! NUNCA compartas tus contraseñas con nadie, es ingeniería social."
    },
    {
        text: "📱 Te llega una solicitud de amistad de un perfil sin foto que dice tener tu misma edad pero te pide fotos de tu casa.",
        correct: "bloquear",
        feedback: "¡Perfecto! Podría ser un perfil falso. Nunca compartas información privada con extraños."
    }
];

let indexActual = 0;
// Recuperamos el puntaje global persistente
let puntos = parseInt(localStorage.getItem("cyberkids_score")) || 0;

// Elementos del DOM que vamos a manipular
let cardElement, feedbackElement, scoreElement, actionsContainer;

// Función para inicializar el juego una vez que el HTML esté listo
function iniciarJuego() {
    cardElement = document.getElementById("card");
    feedbackElement = document.getElementById("feedback-message");
    scoreElement = document.getElementById("user-points");
    actionsContainer = document.querySelector(".game-actions");

    // Mostrar el puntaje inicial guardado
    if (scoreElement) {
        scoreElement.innerText = puntos;
    }

    cargarMision();
}

// Carga la misión actual en pantalla
function cargarMision() {
    if (indexActual < misiones.length) {
        cardElement.innerText = misiones[indexActual].text;
        feedbackElement.innerText = "";
    } else {
        // Pantalla de fin de juego (Constructivismo y Autodeterminación: Recompensa final)
        cardElement.innerText = "🎉 ¡Misión cumplida! Eres un guardián experto de la ciberseguridad.";
        if (actionsContainer) {
            actionsContainer.style.display = "none";
        }
        feedbackElement.innerText = "¡Sigue aprendiendo en la Biblioteca Segura!";
        feedbackElement.style.color = "#06d6a0";
    }
}

// Procesa la elección del niño (Gamificación)
function procesarRespuesta(eleccion) {
    const mision = misiones[indexActual];
    
    if (eleccion === mision.correct) {
        puntos += 10;
        // Sincronización global con el LocalStorage
        localStorage.setItem("cyberkids_score", puntos); 
        if (scoreElement) {
            scoreElement.innerText = puntos;
        }
        feedbackElement.innerText = mision.feedback;
        feedbackElement.style.color = "#06d6a0";
    } else {
        feedbackElement.innerText = "⚠️ ¡Cuidado! Eso podría ser una trampa digital. ¡Analiza bien la situación!";
        feedbackElement.style.color = "#ef476f";
    }

    // Avanzar a la siguiente misión con un pequeño retraso para leer el feedback
    indexActual++;
    setTimeout(cargarMision, 3500); 
}

// Ejecutar la inicialización cuando cargue el script
document.addEventListener("DOMContentLoaded", iniciarJuego);