// Gestione Cookie Banner
function setCookie(name, value, days) {
    try {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
        return true;
    } catch (e) {
        console.error('Errore nel settaggio del cookie:', e);
        return false;
    }
}

function getCookie(name) {
    try {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    } catch (e) {
        console.error('Errore nella lettura del cookie:', e);
        return null;
    }
}

// Alternativa usando localStorage come fallback
function setConsent(accepted) {
    try {
        // Prova prima con i cookie
        const cookieSet = setCookie('cookiesAccepted', accepted.toString(), 365);
        
        // Se il cookie non funziona, usa localStorage come fallback
        if (!cookieSet) {
            localStorage.setItem('cookiesAccepted', accepted.toString());
        }
    } catch (e) {
        console.error('Errore nel salvare il consenso:', e);
    }
}

function hasConsent() {
    try {
        // Controlla prima i cookie
        const cookieConsent = getCookie('cookiesAccepted');
        if (cookieConsent) {
            return cookieConsent === 'true';
        }
        
        // Se non trova il cookie, controlla localStorage
        const localConsent = localStorage.getItem('cookiesAccepted');
        return localConsent === 'true';
    } catch (e) {
        console.error('Errore nel verificare il consenso:', e);
        return false;
    }
}

// Funzioni da eseguire quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Variabili globali
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const hero = document.querySelector('.hero');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    // Gestione Cookie Banner
    if (!hasConsent()) {
        cookieBanner.style.display = 'block';
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            setConsent(true);
            cookieBanner.style.display = 'none';
        });
    }

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
            e.stopPropagation();
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
            navbar.style.transform = 'translateY(-100%)';
        } else {
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
            
            reviewsSlider.style.animation = `slide ${currentSpeed}s linear infinite`;
        }
    }

    // Controlli velocità slider
    let currentSpeed = 120;
    let isPlaying = true;
    let direction = 1;
    const slider = document.querySelector('.reviews-slider');
    const rewindButton = document.getElementById('rewindButton');
    const playButton = document.getElementById('slowSlide');
    const fastButton = document.getElementById('fastSlide');

    // Inizializza lo slider
    initReviewSlider();

    function updatePlayButtonIcon() {
        if (playButton) {
            playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        }
    }

    updatePlayButtonIcon();

    function updateSliderAnimation() {
        if (slider) {
            if (isPlaying) {
                slider.style.animation = 'none';
                void slider.offsetWidth;
                slider.style.animation = `slide ${currentSpeed}s linear infinite`;
                slider.style.animationDirection = direction > 0 ? 'normal' : 'reverse';
            } else {
                slider.style.animation = 'none';
            }
        }
    }

    if (rewindButton) {
        rewindButton.addEventListener('click', () => {
            if (isPlaying) {
                direction = -1;
                currentSpeed = 120;
                updateSliderAnimation();
            }
        });
    }

    if (playButton) {
        playButton.addEventListener('click', () => {
            isPlaying = !isPlaying;
            updatePlayButtonIcon();
            updateSliderAnimation();
        });
    }

    if (fastButton) {
        fastButton.addEventListener('click', () => {
            if (isPlaying) {
                direction = 1;
                if (currentSpeed > 30) {
                    currentSpeed -= 30;
                } else {
                    currentSpeed = 120;
                }
                updateSliderAnimation();
            }
        });
    }

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

        slider.addEventListener('animationend', () => {
            if (isPlaying) {
                updateSliderAnimation();
            }
        });
    }
});