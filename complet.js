document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carrousel functionality with seamless infinite loop
    const images = [
        { src: "images/make1.jpg", desc: "Un petit presentoir des circuit de formule 1 , un super cadeau pour tout passionne(e) de formule 1" },
        { src: "images/make2.jpg", desc: "Un presentoir de toutes les couleurs imprimables en 3d" },
        { src: "images/make3.jpg", desc: "Unpetit pot à crayon ,pratique pour s'organiser" },
        { src: "images/make4.jpg", desc: "Une machine cnc fabriqué grace a l'impression 3d" },
        { src: "images/make5.jpg", desc: "un double presentoir a fléchette , c'est mieux que de les laisser trainer" },
        { src: "images/make6.jpg", desc: "Un buste de deadpool pour une decoration parfaite" },
        { src: "images/make7.jpg", desc: "Un organisateur de bureau complet, ne laisser plus rien au hasard avec l'impression 3d" },
        { src: "images/make8.jpg", desc: "Le support de manette de ps4 discret mais pratique" },
        { src: "images/make9.jpg", desc: "Un grand pot a crayon tour effeil pour les fans de Paris" },
        { src: "images/make10.jpg", desc: "Un rangement pour les boite de jeut de PS4 / PS5" },
        { src: "images/make11.jpg", desc: "Un rangement discret mais propre pour votre console" },
        { src: "images/make12.jpg", desc: "Un tee parfait pour tous fan de rugby personalisable avec votre club favori" }
    ];
    let index = 0;
    const track = document.querySelector(".carousel-track");

    function updateCarousel() {
        let prevIndex = (index - 1 + images.length) % images.length;
        let nextIndex = (index + 1) % images.length;

        track.innerHTML = `
            <img src="${images[prevIndex].src}" alt="Make ${prevIndex + 1}" onclick="openImageViewer('${images[prevIndex].src}', '${images[prevIndex].desc}')">
            <img src="${images[index].src}" alt="Make ${index + 1}" class="active" onclick="openImageViewer('${images[index].src}', '${images[index].desc}')">
            <img src="${images[nextIndex].src}" alt="Make ${nextIndex + 1}" onclick="openImageViewer('${images[nextIndex].src}', '${images[nextIndex].desc}')">
        `;
    }

    function nextSlide() {
        index = (index + 1) % images.length;
        updateCarousel();
    }

    function prevSlide() {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    }

    setInterval(nextSlide, 4000);
    updateCarousel();

    window.openImageViewer = function(src, desc) {
        document.getElementById("viewerImage").src = src;
        document.getElementById("viewerDescription").textContent = desc;
        document.getElementById("imageViewer").style.display = "flex";
    };

    window.closeImageViewer = function() {
        document.getElementById("imageViewer").style.display = "none";
    };
});
