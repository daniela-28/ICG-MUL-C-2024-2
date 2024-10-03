function dibujar() {
    const svg = document.getElementById('svg');

    const puntos = [
        new Punto(100, 100),
        new Punto(200, 50),
        new Punto(300, 100),
        new Punto(250, 200),
        new Punto(150, 200)
    ];

    const poligono = new Poligono(puntos);

    let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;
    puntos.forEach(punto => {
        pathData += ` L ${punto.getX()} ${punto.getY()}`;
    });
    pathData += ' Z';

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "blue");
    svg.appendChild(path);

    console.log("El polígono es: " + poligono.tipoPoligono());
}
