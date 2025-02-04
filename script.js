
// Gestione Cookie Banner
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";

}// Funzioni da eseguire quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Variabili globali
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const hero = document.querySelector('.hero');
 
    // Smooth scrolling per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Trova l'elemento target
            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Chiude il menu mobile se aperto
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
 
    // Animazione elementi al momento dello scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animation');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });
 
    // Osserva gli elementi per l'animazione
    document.querySelectorAll('.service-card, .pickup-card, .method').forEach((el) => {
        observer.observe(el);
    });
 
    // Effetto parallax per l'hero section
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
 
    // Toggle menu mobile
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Previene la propagazione dell'evento
            navLinks.classList.toggle('active');
        });
    }
 
    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        }
    });
 
    // Gestione del resize della finestra
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
 
    // Gestione scroll per navbar trasparente
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
 
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
 
    // Gestione slider recensioni
    function initReviewSlider() {
        const reviewsSlider = document.querySelector('.reviews-slider');
        if (reviewsSlider) {
            const originalContent = reviewsSlider.innerHTML;
            reviewsSlider.innerHTML = originalContent + originalContent + originalContent + originalContent;
            
            // Avvia l'animazione immediatamente
            reviewsSlider.style.animation = `slide ${currentSpeed}s linear infinite`;
        }
    }
 
    // Controlli velocità slider
    let currentSpeed = 120; // Velocità minima (più lenta)
    let isPlaying = true; // Autoplay attivo
    let direction = 1; // 1 per avanti, -1 per indietro
    const slider = document.querySelector('.reviews-slider');
    const rewindButton = document.getElementById('rewindButton');
    const playButton = document.getElementById('slowSlide');
    const fastButton = document.getElementById('fastSlide');
 
    // Inizializza lo slider
    initReviewSlider();
 
    // Aggiorna l'icona del pulsante play/stop
    function updatePlayButtonIcon() {
        if (playButton) {
            playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        }
    }
 
    // Imposta l'icona iniziale su pausa dato che è in autoplay
    updatePlayButtonIcon();
 
    // Aggiorna animazione slider
    function updateSliderAnimation() {
        if (slider) {
            if (isPlaying) {
                slider.style.animation = 'none';
                void slider.offsetWidth; // Trigger reflow
                slider.style.animation = `slide ${currentSpeed}s linear infinite`;
                slider.style.animationDirection = direction > 0 ? 'normal' : 'reverse';
            } else {
                slider.style.animation = 'none';
            }
        }
    }
 
    // Gestione pulsante rewind
    if (rewindButton) {
        rewindButton.addEventListener('click', () => {
            if (isPlaying) {
                direction = -1;
                currentSpeed = 120; // Reset alla velocità più lenta
                updateSliderAnimation();
            }
        });
    }
 
    // Gestione pulsante play/stop
    if (playButton) {
        playButton.addEventListener('click', () => {
            isPlaying = !isPlaying;
            updatePlayButtonIcon();
            updateSliderAnimation();
        });
    }
 
    // Gestione pulsante forward/velocità
    if (fastButton) {
        fastButton.addEventListener('click', () => {
            if (isPlaying) {
                direction = 1;
                if (currentSpeed > 30) {
                    currentSpeed -= 30; // Aumenta velocità
                } else {
                    currentSpeed = 120; // Reset alla velocità più lenta
                }
                updateSliderAnimation();
            }
        });
    }
 
    // Pausa al hover
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            if (isPlaying) {
                slider.style.animationPlayState = 'paused';
            }
        });
 
        slider.addEventListener('mouseleave', () => {
            if (isPlaying) {
                slider.style.animationPlayState = 'running';
            }
        });
 
        // Gestisce il reset dell'animazione per un ciclo fluido
        slider.addEventListener('animationend', () => {
            if (isPlaying) {
                updateSliderAnimation();
            }
        });
    }
 });
 // Gestione Cookie Banner
 const cookieBanner = document.getElementById('cookie-banner');
 const acceptCookies = document.getElementById('accept-cookies');

 if (!getCookie('cookiesAccepted')) {
     cookieBanner.style.display = 'block';
 }

 if (acceptCookies) {
     acceptCookies.addEventListener('click', function() {
         setCookie('cookiesAccepted', 'true', 365);
         cookieBanner.style.display = 'none';
     });
 }