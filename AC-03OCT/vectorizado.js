// Clase Punto
class Punto {
    constructor(x, y) {
        let _x = x;
        let _y = y;

        this.getX = () => _x;
        this.getY = () => _y;
    }
}

// Calcular el centroide
function calcularCentroide(puntos) {
    let sumX = 0;
    let sumY = 0;
    puntos.forEach(punto => {
        sumX += punto.getX();
        sumY += punto.getY();
    });
    return new Punto(sumX / puntos.length, sumY / puntos.length);
}

// Ordenar los puntos por el ángulo respecto al centroide
function anguloDesdeCentroide(punto, centroide) {
    return Math.atan2(punto.getY() - centroide.getY(), punto.getX() - centroide.getX());
}

function ordenarPorAngulo(puntos, centroide) {
    return puntos.slice().sort((a, b) => anguloDesdeCentroide(a, centroide) - anguloDesdeCentroide(b, centroide));
}

// Producto cruzado y verificación de convexidad
function productoCruzado(o, a, b) {
    return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX());
}

function verificarConvexidad(puntos) {
    const centroide = calcularCentroide(puntos);
    const puntosOrdenados = ordenarPorAngulo(puntos, centroide);
    const crossProducts = [];
    const n = puntosOrdenados.length;

    for (let i = 0; i < n; i++) {
        const o = puntosOrdenados[i];
        const a = puntosOrdenados[(i + 1) % n];
        const b = puntosOrdenados[(i + 2) % n];
        const cp = productoCruzado(o, a, b);
        crossProducts.push(cp);
    }

    const positivos = crossProducts.every(cp => cp > 0);
    const negativos = crossProducts.every(cp => cp < 0);

    return (positivos || negativos) ? "Convexo" : "Cóncavo";
}

// Dibujar el polígono en SVG
function dibujarVectorizado(puntos) {
    const svg = document.getElementById('svg');

    let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;
    puntos.forEach(punto => {
        pathData += ` L ${punto.getX()} ${punto.getY()}`;
    });
    pathData += ' Z';

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "blue");
    svg.appendChild(path);
}
