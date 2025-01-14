// Funzioni da eseguire quando il DOM è completamente caricato
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
});