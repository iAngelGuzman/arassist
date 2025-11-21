// Referencias a los elementos del DOM
const overlay = document.querySelector('#scanning-overlay');

const laptopTarget = document.querySelector('#target-laptop');
const laptopCard = document.querySelector('#card-laptop');

const trackpadTarget = document.querySelector('#target-trackpad');
const trackpadCard = document.querySelector('#card-trackpad');

// --- LÓGICA PARA LA LAPTOP (Index 0) ---
laptopTarget.addEventListener("targetFound", event => {
    console.log("Laptop encontrada");
    overlay.style.display = 'none';
    laptopCard.style.display = 'block';
    trackpadCard.style.display = 'none'; // Asegurar que la otra se oculte
});

laptopTarget.addEventListener("targetLost", event => {
    console.log("Laptop perdida");
    laptopCard.style.display = 'none';
    // Solo mostrar el overlay si TAMPOCO se ve el trackpad
    if (trackpadCard.style.display === 'none') {
        overlay.style.display = 'block';
    }
});

// --- LÓGICA PARA EL TRACKPAD (Index 1) ---
trackpadTarget.addEventListener("targetFound", event => {
    console.log("Trackpad encontrado");
    overlay.style.display = 'none';
    trackpadCard.style.display = 'block';
    laptopCard.style.display = 'none'; // Asegurar que la otra se oculte
});

trackpadTarget.addEventListener("targetLost", event => {
    console.log("Trackpad perdido");
    trackpadCard.style.display = 'none';
    // Solo mostrar el overlay si TAMPOCO se ve la laptop
    if (laptopCard.style.display === 'none') {
        overlay.style.display = 'block';
    }
});