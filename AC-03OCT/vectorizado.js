// Clase para definir un Punto con encapsulamiento
class Punto {
    constructor(x, y) {
        this.x = x; // Coordenada x
        this.y = y; // Coordenada y
    }
}

// Función para dibujar el polígono en SVG
function dibujarVectorizado(puntos) {
    const svg = document.getElementById('svg'); // Obtener el elemento SVG
    svg.innerHTML = ''; // Limpiar el contenido del SVG

    // Crear los puntos para el polígono
    const points = puntos.map(p => `${p.x},${p.y}`).join(' '); // Crear cadena de puntos
    const polygon = `<polygon points="${points}" fill="none" stroke="black" stroke-width="2" />`; // Crear el elemento polígono

    svg.innerHTML = polygon; // Agregar el polígono al SVG
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
