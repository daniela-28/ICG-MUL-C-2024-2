// Clase Punto con encapsulamiento real
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }
}

// Clase base para gestionar el SVG
class SVGCanvas {
    constructor(svgElement) {
        this.svgElement = svgElement;
    }

    agregarElemento(elemento) {
        this.svgElement.appendChild(elemento);
    }
}

// Clase Linea que usa el algoritmo de Bresenham y encapsulamiento
class Linea {
    #puntoInicio;
    #puntoFin;

    constructor(puntoInicio, puntoFin) {
        this.#puntoInicio = puntoInicio;
        this.#puntoFin = puntoFin;
    }

    dibujar(svgCanvas) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = this.#bresenham();
        line.setAttribute('d', d);
        line.setAttribute('stroke', 'black');
        line.setAttribute('fill', 'none');
        svgCanvas.agregarElemento(line);
    }

    #bresenham() {
        let x1 = this.#puntoInicio.getX();
        let y1 = this.#puntoInicio.getY();
        let x2 = this.#puntoFin.getX();
        let y2 = this.#puntoFin.getY();

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        let pathData = `M ${x1},${y1} `;

        while (x1 !== x2 || y1 !== y2) {
            pathData += `L ${x1},${y1} `;
            const e2 = err * 2;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        pathData += `L ${x2},${y2}`;
        return pathData;
    }
}

// Clase Circunferencia
class Circunferencia {
    #centro;
    #radio;

    constructor(centro, radio) {
        this.#centro = centro;
        this.#radio = radio;
    }

    dibujar(svgCanvas) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', this.#centro.getX());
        circle.setAttribute('cy', this.#centro.getY());
        circle.setAttribute('r', this.#radio);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('fill', 'none');
        svgCanvas.agregarElemento(circle);
    }
}

// Clase Elipse
class Elipse {
    #centro;
    #rx;
    #ry;

    constructor(centro, rx, ry) {
        this.#centro = centro;
        this.#rx = rx;
        this.#ry = ry;
    }

    dibujar(svgCanvas) {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', this.#centro.getX());
        ellipse.setAttribute('cy', this.#centro.getY());
        ellipse.setAttribute('rx', this.#rx);
        ellipse.setAttribute('ry', this.#ry);
        ellipse.setAttribute('stroke', 'black');
        ellipse.setAttribute('fill', 'none');
        svgCanvas.agregarElemento(ellipse);
    }
}

// Inicialización del lienzo SVG
const svgCanvasElement = document.getElementById('svgCanvas');
const svgCanvas = new SVGCanvas(svgCanvasElement);

// Crear instancias de Punto
const puntoInicio = new Punto(50, 50);
const puntoFin = new Punto(200, 200);
const centroCircunferencia = new Punto(300, 100);
const centroElipse = new Punto(400, 300);

// Crear instancias de las primitivas y dibujarlas
const linea = new Linea(puntoInicio, puntoFin);
linea.dibujar(svgCanvas);

const circunferencia = new Circunferencia(centroCircunferencia, 50);
circunferencia.dibujar(svgCanvas);

const elipse = new Elipse(centroElipse, 80, 50);
elipse.dibujar(svgCanvas);
