// Fondo interactivo: Cascada de Tráfico Binario (0 y 1)
const canvas = document.createElement('canvas');
canvas.id = 'cyber-bg-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const fontSize = 12;
const columnas = canvas.width / fontSize;
const caidaBits = [];

// Inicializar las columnas fuera de la pantalla
for (let i = 0; i < columnas; i++) {
    caidaBits[i] = Math.random() * -50;
}

function drawBinaryStream() {
    // Fondo negro con desvanecimiento lento para dejar estela
    ctx.fillStyle = 'rgba(10, 14, 23, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color del texto: Verde Hacker sutil
    ctx.fillStyle = 'rgba(0, 255, 102, 0.12)';
    ctx.font = fontSize + 'px Courier New';

    for (let i = 0; i < caidaBits.length; i++) {
        // Generar estrictamente un 0 o un 1
        const bit = Math.random() > 0.5 ? "1" : "0";
        
        const x = i * fontSize;
        const y = caidaBits[i] * fontSize;

        ctx.fillText(bit, x, y);

        // Si llega al final de la pantalla, se reinicia de manera aleatoria
        if (y > canvas.height && Math.random() > 0.98) {
            caidaBits[i] = 0;
        }

        caidaBits[i]++;
    }
}

setInterval(drawBinaryStream, 40);