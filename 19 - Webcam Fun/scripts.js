const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) // Para acceder a los perifericos del PC
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.src = window.URL.createObjectURL(localMediaStream); // Para pasar como fuente del elemento <video> el video que se está grabando
            video.play(); // Para que reproduzca el video
        })
        .catch(err => console.error('OH NO!!!', err));
}


function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    
    [canvas.width, canvas.height] = [width, height];
    
    /** Pintar sobre canvas la imagen del video cada 16ms */
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // Take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height); // Para obtener una imagen de un canvas
        // Mess with them
        // pixels = redEffect(pixels);

        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.7; // Ghost effect
        
        pixels = greenScreen(pixels);

        // Put them back
        ctx.putImageData(pixels, 0, 0);
        
    }, 16);
}

function takePhoto() {
    // Played the sound
    snap.currentTime = 0;
    snap.play();

    // Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');

    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome!">`;

    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i =0; i < pixels.data.length; i +=4) {
        pixels.data[i] = pixels.data[i] + 150; // canal rojo (R)
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // canal verde (G)
        pixels.data[i + 2] = pixels.data[i + 2] * 0.8; // canal azul (B)
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i =0; i < pixels.data.length; i +=4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // canal rojo (R)
        pixels.data[i + 200] = pixels.data[i + 1]; // canal verde (G)
        pixels.data[i - 550] = pixels.data[i + 2]; // canal azul (B)
        
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
    
        if (red >= levels.rmin
          && green >= levels.gmin
          && blue >= levels.bmin
          && red <= levels.rmax
          && green <= levels.gmax
          && blue <= levels.bmax) {
          // take it out!
          pixels.data[i + 3] = 0;
        }
      }
    
      return pixels;

}

getVideo();

video.addEventListener('canplay', paintToCanvas); // 'canPlay' es un evento que se emite una vez el video está listo para ser reproducido
