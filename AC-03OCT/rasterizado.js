/ Clase para definir un Punto con encapsulamiento
class Punto {
    constructor(x, y) {
        this.x = x; // Coordenada x
        this.y = y; // Coordenada y
    }
}

// Función para dibujar el polígono en el canvas
function dibujarRasterizado(puntos) {
    const canvas = document.getElementById('canvas'); // Obtener el elemento canvas
    const ctx = canvas.getContext('2d'); // Obtener el contexto de dibujo
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar el polígono
    ctx.beginPath(); // Iniciar un nuevo camino
    ctx.moveTo(puntos[0].x, puntos[0].y); // Mover a la primera coordenada
    puntos.forEach(p => ctx.lineTo(p.x, p.y)); // Dibujar líneas a cada punto
    ctx.closePath(); // Cerrar el camino
    ctx.stroke(); // Dibujar el contorno del polígono
}

// Función para verificar la convexidad del polígono
function verificarConvexidad(puntos) {
    const n = puntos.length;

    let isConvex = true;
    let lastCrossProduct = 0;

    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];
        const p3 = puntos[(i + 2) % n];

        const crossProduct = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
        
        if (i === 0) {
            lastCrossProduct = crossProduct;
        } else {
            if ((lastCrossProduct < 0 && crossProduct > 0) || (lastCrossProduct > 0 && crossProduct < 0)) {
                isConvex = false;
                break;
            }
        }
    }
    return isConvex ? "Los puntos forman una figura convexa." : "Los puntos forman una figura cóncava.";
}
