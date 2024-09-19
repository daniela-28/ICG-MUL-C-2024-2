script.js
class SVGCanvas {
    constructor(svgElement) {
        this.svgElement = svgElement;
    }

    createLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        this.svgElement.appendChild(line);
    }

    createCircle(cx, cy, r) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('fill', 'none');
        this.svgElement.appendChild(circle);
    }

    createEllipse(cx, cy, rx, ry) {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', cx);
        ellipse.setAttribute('cy', cy);
        ellipse.setAttribute('rx', rx);
        ellipse.setAttribute('ry', ry);
        ellipse.setAttribute('stroke', 'black');
        ellipse.setAttribute('fill', 'none');
        this.svgElement.appendChild(ellipse);
    }
}

// Inicializar el lienzo SVG
const svgCanvasElement = document.getElementById('svgCanvas');
const svgCanvas = new SVGCanvas(svgCanvasElement);

// Dibujar las primitivas
svgCanvas.createLine(50, 50, 200, 200);
svgCanvas.createCircle(300, 100, 50);
svgCanvas.createEllipse(400, 300, 80, 50);
