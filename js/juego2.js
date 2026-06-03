// Banco de datos con contraseñas para analizar
const bancoContrasenas = [
    {
        password: "123456789",
        tipo: "debil",
        feedback: "¡Perfecto! '123456789' es la contraseña más usada del mundo. Los hackers la descubren en milisegundos."
    },
    {
        password: "Xy$97!mPq2",
        tipo: "fuerte",
        feedback: "¡Excelente! Combina mayúsculas, minúsculas, números y símbolos. ¡Una fortaleza digital!"
    },
    {
        password: "password",
        tipo: "debil",
        feedback: "¡Bien visto! Usar la palabra 'password' o 'contraseña' es sumamente peligroso y obvio."
    },
    {
        password: "Messi2026*",
        tipo: "fuerte",
        feedback: "¡Buen trabajo! Tomar una palabra base y agregarle números y un símbolo especial la vuelve muy robusta."
    },
    {
        password: "admin",
        tipo: "debil",
        feedback: "¡Exacto! 'admin' es una credencial por defecto que cualquier atacante probará primero."
    }
];

let indiceContrasena = 0;
let energiaEscudo = 100;
let puntosGlobales = parseInt(localStorage.getItem("cyberkids_score")) || 0;

// Elementos de la interfaz (DOM)
let txtPoints, txtShield, fillShield, screenPassword, feedbackJ2, containerActions;

function inicializarJuego2() {
    txtPoints = document.getElementById("user-points");
    txtShield = document.getElementById("shield-text");
    fillShield = document.getElementById("shield-fill");
    screenPassword = document.getElementById("password-screen");
    feedbackJ2 = document.getElementById("j2-feedback");
    containerActions = document.querySelector(".j2-actions");

    if (txtPoints) txtPoints.innerText = puntosGlobales;

    presentarContrasena();
}

function presentarContrasena() {
    if (energiaEscudo <= 0) {
        finalizarJuego(false);
    } else if (indiceContrasena < bancoContrasenas.length) {
        screenPassword.innerText = bancoContrasenas[indiceContrasena].password;
        feedbackJ2.innerText = "";
    } else {
        finalizarJuego(true);
    }
}

function evaluarContrasena(decisionUsuario) {
    const itemActual = bancoContrasenas[indiceContrasena];

    if (decisionUsuario === itemActual.tipo) {
        // Respuesta correcta: Gana puntos y sana escudo si estaba dañado
        puntosGlobales += 15; // Este juego da más puntos por dificultad
        localStorage.setItem("cyberkids_score", puntosGlobales);
        if (txtPoints) txtPoints.innerText = puntosGlobales;

        if (energiaEscudo < 100) energiaEscudo = Math.min(100, energiaEscudo + 10);
        
        feedbackJ2.innerText = itemActual.feedback;
        feedbackJ2.style.color = "#06d6a0";
    } else {
        // Respuesta incorrecta: Daño al escudo informático
        energiaEscudo = Math.max(0, energiaEscudo - 25);
        feedbackJ2.innerText = "⚠️ ¡Error! Esa decisión debilitó tu escudo ante los ciber-villanos.";
        feedbackJ2.style.color = "#ef476f";
    }

    actualizarBarraEscudo();
    indiceContrasena++;
    
    // Pausa de 3.5 segundos para que lean la retroalimentación
    setTimeout(presentarContrasena, 3500);
}

function actualizarBarraEscudo() {
    if (txtShield && fillShield) {
        txtShield.innerText = energiaEscudo + "%";
        fillShield.style.width = energiaEscudo + "%";

        // Cambio dinámico de color de la barra según la gravedad
        if (energiaEscudo <= 30) {
            fillShield.style.backgroundColor = "#ef476f"; // Rojo (Peligro)
        } else if (energiaEscudo <= 60) {
            fillShield.style.backgroundColor = "#ffd166"; // Amarillo (Advertencia)
        } else {
            fillShield.style.backgroundColor = "#06d6a0"; // Verde (Seguro)
        }
    }
}

function finalizarJuego(victoria) {
    if (containerActions) containerActions.style.display = "none";

    if (victoria) {
        screenPassword.innerText = "🛡️ ¡ESCUDO INTACTO! 🛡️";
        feedbackJ2.innerText = "¡Felicidades! Lograste clasificar todas las contraseñas con éxito y mantener tus sistemas blindados.";
        feedbackJ2.style.color = "#06d6a0";
    } else {
        screenPassword.innerText = "🚨 ESCUDO DESTRUIDO 🚨";
        feedbackJ2.innerText = "Los ciber-villanos lograron vulnerar tus defensas. ¡Visita la Biblioteca Segura para repasar trucos de protección!";
        feedbackJ2.style.color = "#ef476f";
    }
}

// Iniciar componentes al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarJuego2);