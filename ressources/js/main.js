// Stockage temporaire des positions
const positions = {};
let zIndexMax = 1000; // Toujours croissant pour superposition
let dragOffsetX = 0;
let dragOffsetY = 0;
let elementEnCours = null;

/**
 * Ouvre une fenêtre modale en la ramenant au premier plan
 */
function ouvrirFenetre(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    zIndexMax++;
    modal.style.display = "block";
    modal.style.zIndex = zIndexMax;

    const content = modal.querySelector(".modal-content");
    content.style.zIndex = zIndexMax;
    content.style.transform = "none"; // On évite le translate pour pas fausser les calculs

    // Si une position déjà enregistrée existe (fenêtre déplacée), on la restaure
    if (positions[id]) {
        content.style.left = positions[id].left;
        content.style.top = positions[id].top;
        return;
    }

    // Attendre que la fenêtre soit rendue avant de calculer la position
    requestAnimationFrame(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const modalWidth = content.offsetWidth;
        const modalHeight = content.offsetHeight;

        let left, top;

        top = (screenHeight - modalHeight) / 2;

        if (id === "fenetre-about") {
            // Milieu gauche (10% de l'écran ou fixé)
            left = 20; // 100px depuis la gauche
        } else if (id === "fenetre-contact") {
            // Milieu droite
            left = screenWidth - modalWidth - 20; // 100px depuis la droite
        } else {
            // Centrage classique
            left = (screenWidth - modalWidth) / 2;
        }

        content.style.left = `${left}px`;
        content.style.top = `${top}px`;
    });
}


/**
 * Ferme une fenêtre modale
 */
function fermerFenetre(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

/**
 * Met une fenêtre au premier plan
 */
function amenerAuPremierPlan(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    zIndexMax++;
    modal.style.zIndex = zIndexMax;
    const content = modal.querySelector(".modal-content");
    content.style.zIndex = zIndexMax;
}

/**
 * Initialise le déplacement d'une fenêtre
 */
function initDrag(e, modal) {
    const content = modal.querySelector(".modal-content");
    elementEnCours = content;

    dragOffsetX = e.clientX - content.getBoundingClientRect().left;
    dragOffsetY = e.clientY - content.getBoundingClientRect().top;

    content.style.transform = "none"; // Supprimer le centrage CSS

    document.addEventListener("mousemove", deplacer);
    document.addEventListener("mouseup", arreterDeplacer);
}

/**
 * Déplacement de la fenêtre
 */
function deplacer(e) {
    if (!elementEnCours) return;

    let x = e.clientX - dragOffsetX;
    let y = e.clientY - dragOffsetY;

    // Empêcher la fenêtre de sortir de l'écran
    const maxX = window.innerWidth - elementEnCours.offsetWidth;
    const maxY = window.innerHeight - elementEnCours.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    elementEnCours.style.left = `${x}px`;
    elementEnCours.style.top = `${y}px`;
}

/**
 * Arrêter le déplacement
 */
function arreterDeplacer() {
    if (elementEnCours) {
        const id = elementEnCours.closest(".modal").id;
        positions[id] = {
            left: elementEnCours.style.left,
            top: elementEnCours.style.top,
        };
    }

    document.removeEventListener("mousemove", deplacer);
    document.removeEventListener("mouseup", arreterDeplacer);
    elementEnCours = null;
}
