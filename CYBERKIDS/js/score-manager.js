// Gestor central de infraestructura de puntos CyberKids
const ScoreManager = {
    getPuntos: function() {
        return parseInt(localStorage.getItem("cyberkids_score")) || 0;
    },
    sumarPuntos: function(cantidad) {
        let actual = this.getPuntos();
        localStorage.setItem("cyberkids_score", actual + cantidad);
        this.actualizarMarcadores();
    },
    restarPuntos: function(cantidad) {
        let actual = this.getPuntos();
        localStorage.setItem("cyberkids_score", Math.max(0, actual - cantidad));
        this.actualizarMarcadores();
    },
    actualizarMarcadores: function() {
        const marcador = document.getElementById("user-points");
        if (marcador) {
            marcador.innerText = this.getPuntos();
        }
    }
};

// Auto-actualizar el header en cualquier página al cargar
document.addEventListener("DOMContentLoaded", () => ScoreManager.actualizarMarcadores());