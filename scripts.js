// Lógica para detectar cuando aparece la imagen
const target = document.querySelector('#laptop-target');
const infoCard = document.querySelector('#info-card');
const scanOverlay = document.querySelector('#scanning-overlay');

// Cuando encuentra la laptop (imagen)
target.addEventListener("targetFound", event => {
    console.log("Objeto identificado");
    infoCard.style.display = 'block'; // Mostrar ficha
    scanOverlay.style.display = 'none'; // Ocultar guía de escaneo
});

// Cuando pierde de vista la laptop
target.addEventListener("targetLost", event => {
    console.log("Objeto perdido");
    infoCard.style.display = 'none'; // Ocultar ficha
    scanOverlay.style.display = 'block'; // Mostrar guía
});