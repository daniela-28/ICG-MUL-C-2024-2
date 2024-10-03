// Clase base para gestionar el SVG
class SVGCanvas {
    constructor(svgElement) {
        this.svgElement = svgElement;
    }

    agregarElemento(elemento) {
        this.svgElement.appendChild(elemento);
    }
}

// Clase Linea
class Linea {
    constructor(x1, y1, x2, y2) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    dibujar(svgCanvas) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', this._x1);
        line.setAttribute('y1', this._y1);
        line.setAttribute('x2', this._x2);
        line.setAttribute('y2', this._y2);
        line.setAttribute('stroke', 'black');
        svgCanvas.agregarElemento(line);
    }
}

// Clase Circunferencia
class Circunferencia {
    constructor(cx, cy, radio) {
        this._cx = cx;
        this._cy = cy;
        this._radio = radio;
    }

    dibujar(svgCanvas) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', this._cx);
        circle.setAttribute('cy', this._cy);
        circle.setAttribute('r', this._radio);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('fill', 'none');
        svgCanvas.agregarElemento(circle);
    }
}

// Clase Elipse
class Elipse {
    constructor(cx, cy, rx, ry) {
        this._cx = cx;
        this._cy = cy;
        this._rx = rx;
        this._ry = ry;
    }

    dibujar(svgCanvas) {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', this._cx);
        ellipse.setAttribute('cy', this._cy);
        ellipse.setAttribute('rx', this._rx);
        ellipse.setAttribute('ry', this._ry);
        ellipse.setAttribute('stroke', 'black');
        ellipse.setAttribute('fill', 'none');
        svgCanvas.agregarElemento(ellipse);
    }
}

// Inicialización del lienzo SVG
const svgCanvasElement = document.getElementById('svgCanvas');
const svgCanvas = new SVGCanvas(svgCanvasElement);

// Crear instancias de las clases y dibujar las primitivas
const linea = new Linea(50, 50, 200, 200);
linea.dibujar(svgCanvas);

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar(svgCanvas);

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar(svgCanvas);

