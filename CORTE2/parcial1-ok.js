// Clase para coordenadas cartesianas
class CoordenadasCartesianas {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // Método para convertir a coordenadas polares
    aPolares() {
        const r = Math.sqrt(this._x ** 2 + this._y ** 2);
        const theta = Math.atan2(this._y, this._x);
        return new CoordenadasPolares(r, theta);
    }

    // Getters para encapsulamiento
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

// Clase para coordenadas polares
class CoordenadasPolares {
    constructor(r, theta) {
        this._r = r;
        this._theta = theta;
    }

    // Método para convertir a coordenadas cartesianas
    aCartesianas() {
        const x = this._r * Math.cos(this._theta);
        const y = this._r * Math.sin(this._theta);
        return new CoordenadasCartesianas(x, y);
    }

    // Getters para encapsulamiento
    get r() {
        return this._r;
    }

    get theta() {
        return this._theta;
    }
}

// Función para dibujar el polígono
function drawPolygon() {
    const canvas = document.getElementById('polygonCanvas');
    const ctx = canvas.getContext('2d');
    const sides = document.getElementById('sides').value;
    const apothem = document.getElementById('apothem').value;

    const radius = apothem / Math.cos(Math.PI / sides);

    // Centrar el polígono en el canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = (2 * Math.PI / sides) * i;
        let polarCoords = new CoordenadasPolares(radius, angle);
        let cartesianCoords = polarCoords.aCartesianas();
        const x = centerX + cartesianCoords.x;
        const y = centerY + cartesianCoords.y;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.stroke();
}

