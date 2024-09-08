
document.addEventListener('DOMContentLoaded', () => {
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        box.classList.add('show');
    });
});
const images = document.querySelectorAll('.imagens img');

let currentIndex = 0;

/* trocar imagem em sequencia */
function showNextImage() {

    images[currentIndex].classList.remove('active');
    
   /* ciclo das imagens */
    currentIndex = (currentIndex + 1) % images.length;
    
    images[currentIndex].classList.add('active');
}

images[currentIndex].classList.add('active');

setInterval(showNextImage, 3000);