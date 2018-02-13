document.addEventListener('DOMContentLoaded', () => { 

    const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext('2d'); // Se obtiene el "context" el cual es como el lienzo sobre el cual dibujar
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = '#BADA55'; // El color del trazo
    ctx.lineJoin = "round"; // La forma que tendrá el cruce de dos lineas
    ctx.lineCap = "round"; // La forma en la que terminará el trazo
    ctx.lineWidth = 100;
    // ctx.globalCompositeOperation='destination-over'; // Para definir el tipo de composicion que se hará al dibujar nuevas formas
    

    let isDrawing = false;
    let lastX = 0; // Para indicar donde empezará a dibujar en X y en Y
    let lastY = 0;
    let hue = 0;
    let direction = true;

    function draw(e) {
        if (!isDrawing) return; // No haga nada si no se activa la bandera para dibujar
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath(); // Prepara el "pincel" de canvas
        // Empieza a dibujar en...
        ctx.moveTo(lastX, lastY);
        // Termina de dibujar en...
        ctx.lineTo(e.offsetX, e.offsetY); // .offset son las cordenadas del mouse con respecto al padding del elemento sobre el que se ejecuta
        
        ctx.stroke(); // Este metodo es el que dibuja finalmente

        [lastX, lastY] = [e.offsetX, e.offsetY];
        hue++;

        if (hue >= 360) hue = 0; // opcional. Resetea el valor de hue
        // Se cambia la bandera para definir si el ancho del "pincel crece o decrece"
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 20)
            direction = !direction;
        
        direction ? ctx.lineWidth++ : ctx.lineWidth--;
    }
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    canvas.addEventListener('mouseup', () => isDrawing = false);
})