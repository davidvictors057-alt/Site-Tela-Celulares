/* ==========================================================================
   SITE TELA CELULARES (CLONE REALME STORE) - APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. URL CATEGORY SWITCHER FOR celulares.html
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetBtn = document.querySelector(`.category-btn[onclick*="${catParam}"]`);
        if (targetBtn) {
            // Remove active de todos
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.category-section').forEach(sec => sec.classList.remove('active'));
            
            // Ativa o alvo
            targetBtn.classList.add('active');
            const targetSec = document.getElementById(catParam);
            if (targetSec) {
                targetSec.classList.add('active');
            }
        }
    }

    // 2. SCROLL EFFECT ON HEADER
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. HERO CAROUSEL LOGIC
    const carousel = document.getElementById('hero-carousel');
    
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        
        let currentIndex = 0;
        let autoplayInterval;
        const autoplayDelay = 5000; // 5 segundos

        // Função para mostrar um slide específico
        function showSlide(index) {
            // Tratar limites de índice
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }

            // Atualizar classes ativa nos slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                if (parseInt(slide.getAttribute('data-index')) === currentIndex) {
                    slide.classList.add('active');
                }
            });

            // Atualizar classes ativa nos dots
            dots.forEach(dot => {
                dot.classList.remove('active');
                if (parseInt(dot.getAttribute('data-index')) === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }

        // Função para avançar o slide
        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        // Função para retroceder o slide
        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        // Iniciar Autoplay
        function startAutoplay() {
            stopAutoplay(); // Garantir que não existam múltiplos intervalos
            autoplayInterval = setInterval(nextSlide, autoplayDelay);
        }

        // Parar Autoplay
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Eventos dos botões de navegação
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoplay(); // Reiniciar cronômetro após ação do usuário
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoplay(); // Reiniciar cronômetro após ação do usuário
            });
        }

        // Eventos nos pontos indicadores (dots)
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'));
                showSlide(targetIndex);
                startAutoplay(); // Reiniciar cronômetro após ação do usuário
            });
        });

        // Iniciar
        showSlide(currentIndex);
        startAutoplay();

        // Pausar autoplay ao passar o mouse sobre o carrossel
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // 4. SEARCH INTERACTION
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    console.log(`Buscando por: ${query}`);
                    // Simulação de busca
                    alert(`Simulando busca por: "${query}" na Tela Celulares`);
                }
            }
        });
    }

    // 5. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

