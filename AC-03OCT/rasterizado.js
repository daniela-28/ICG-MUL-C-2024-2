function dibujar() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const puntos = [
        new Punto(100, 100),
        new Punto(200, 50),
        new Punto(300, 100),
        new Punto(250, 200),
        new Punto(150, 200)
    ];

    const poligono = new Poligono(puntos);

    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());
    puntos.forEach(punto => {
        ctx.lineTo(punto.getX(), punto.getY());
    });
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();

    console.log("El polígono es: " + poligono.tipoPoligono());
}
