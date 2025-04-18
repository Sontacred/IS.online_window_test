let zIndexMax = 1000;
let dragOffsetX = 0;
let dragOffsetY = 0;
let elementEnCours = null;
const positionsSauvegardees = {};

function ouvrirFenetre(id) {
    const modal = document.getElementById(id);
    if (modal) {
        zIndexMax++;
        modal.style.display = "block";
        modal.style.zIndex = zIndexMax;

        const content = modal.querySelector(".modal-content");
        const saved = positionsSauvegardees[id];
        if (saved) {
          content.style.left = saved.left;
          content.style.top = saved.top;
          content.style.transform = 'none';
      } else {
          content.style.left = '50%';
          content.style.top = '50%';
          content.style.transform = 'translate(-50%, -50%)';
      }
    }
}

function fermerFenetre(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
    }
}

function amenerAuPremierPlan(id) {
    const modal = document.getElementById(id);
    if (modal) {
        zIndexMax++;
        modal.style.zIndex = zIndexMax;
    }
}

function initDrag(e, modal) {
  const content = modal.querySelector(".modal-content");
  elementEnCours = content;

  // Utilise getBoundingClientRect pour obtenir la position absolue réelle
  const rect = content.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  // Si aucun style left/top n'est encore défini, on les fixe avec la position actuelle
  if (!content.style.left) content.style.left = rect.left + "px";
  if (!content.style.top) content.style.top = rect.top + "px";

  document.addEventListener('mousemove', deplacer);
  document.addEventListener('mouseup', arreterDeplacer);
}


function deplacer(e) {
  elementEnCours.style.transform = 'none';
    if (elementEnCours) {
        const left = (e.clientX - dragOffsetX);
        const top = (e.clientY - dragOffsetY);

        elementEnCours.style.left = left + 'px';
        elementEnCours.style.top = top + 'px';
    }
}

function arreterDeplacer() {
    if (elementEnCours) {
        const id = elementEnCours.closest(".modal").id;
        positionsSauvegardees[id] = {
            left: elementEnCours.style.left,
            top: elementEnCours.style.top
        };
    }
    document.removeEventListener('mousemove', deplacer);
    document.removeEventListener('mouseup', arreterDeplacer);
    elementEnCours = null;
}
