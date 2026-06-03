// Esperar a que el HTML cargue por completo
document.addEventListener("DOMContentLoaded", () => {
    // Buscar si ya existen puntos guardados previamente, si no, inicia en 0
    let currentPoints = localStorage.getItem("cyberkids_score") || 0;
    
    // Renderizar los puntos en el componente del menú
    const scoreElement = document.getElementById("user-points");
    if (scoreElement) {
        scoreElement.innerText = currentPoints;
    }
});