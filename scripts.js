// 1. Lógica de detección de objetos (Igual que antes)
const laptopTarget = document.querySelector('#target-laptop');
const laptopCard = document.querySelector('#card-laptop');
const trackpadTarget = document.querySelector('#target-trackpad');
const trackpadCard = document.querySelector('#card-trackpad');

const soporteTarget = document.querySelector('#target-soporte');
const soporteCard = document.querySelector('#card-soporte');

laptopTarget.addEventListener("targetFound", () => { laptopCard.style.display = 'block'; trackpadCard.style.display = 'none'; });
laptopTarget.addEventListener("targetLost", () => { laptopCard.style.display = 'none'; });

trackpadTarget.addEventListener("targetFound", () => { trackpadCard.style.display = 'block'; laptopCard.style.display = 'none'; });
trackpadTarget.addEventListener("targetLost", () => { trackpadCard.style.display = 'none'; });

soporteTarget.addEventListener("targetFound", () => { soporteCard.style.display = 'block'; soporteCard.style.display = 'none'; });
soporteTarget.addEventListener("targetLost", () => { soporteCard.style.display = 'none'; });

// ==========================================
// 2. LÓGICA DE ZOOM DE CÁMARA
// ==========================================
const scene = document.querySelector('a-scene');
const zoomContainer = document.getElementById('zoom-container');
const zoomSlider = document.getElementById('zoom-slider');

// Esperamos a que MindAR arranque y la cámara esté lista
scene.addEventListener("arReady", (event) => {
    console.log("AR Listo - Buscando capacidades de cámara...");

    // MindAR crea un elemento <video> internamente. Lo buscamos.
    const videoElement = document.querySelector('video');

    if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const [track] = stream.getVideoTracks(); // Obtenemos el track de video

        // Verificamos qué puede hacer esta cámara
        const capabilities = track.getCapabilities();
        const settings = track.getSettings();

        // Si la cámara soporta zoom
        if ('zoom' in capabilities) {
            console.log("Zoom soportado: ", capabilities.zoom);

            // Configurar el slider con los límites del hardware
            zoomSlider.min = capabilities.zoom.min;
            zoomSlider.max = capabilities.zoom.max;
            zoomSlider.step = capabilities.zoom.step || 0.1;
            zoomSlider.value = settings.zoom || 1;

            // Hacemos visible el control
            zoomContainer.style.visibility = 'visible';

            // Evento al mover el slider
            zoomSlider.oninput = async (event) => {
                const zoomValue = parseFloat(event.target.value);
                try {
                    // Aplicar el nuevo zoom al hardware
                    await track.applyConstraints({
                        advanced: [{ zoom: zoomValue }]
                    });
                } catch (err) {
                    console.error("Error al aplicar zoom:", err);
                }
            };
        } else {
            console.log("Esta cámara no soporta zoom por hardware.");
        }
    }
});