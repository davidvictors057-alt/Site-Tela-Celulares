/* ==========================================================================
   SITE TELA CELULARES (CLONE REALME STORE) - APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const supabaseUrl = 'https://hoceltmynggfpdyyvdmb.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvY2VsdG15bmdnZnBkeXl2ZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2Mjk0OTksImV4cCI6MjA5NzIwNTQ5OX0.Smt5T1v7dzSMEeM05Iyj9itgpYSwPmkfCKm5pZXzIzQ';
    
    let supabase = null;
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    }

    // Verifica sessão ativa para ajustar menu de login/painel
    if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                const loginBtns = document.querySelectorAll('.login-trigger');
                loginBtns.forEach(btn => {
                    btn.classList.remove('login-trigger');
                    btn.setAttribute('href', 'admin.html');
                    if (btn.classList.contains('mobile-login-btn')) {
                        btn.setAttribute('aria-label', 'Painel Administrativo');
                    } else {
                        btn.innerText = 'Painel Admin';
                    }
                });
            }
        });
    }

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
        const autoplayDelay = 2500; // 2.5 segundos (velocidade dobrada)

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

    // 4. LÓGICA DE BUSCA DE PRODUTOS REAL EM TEMPO REAL
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // Desativa autocomplete do navegador
        searchInput.setAttribute('autocomplete', 'off');
        
        // Cria o dropdown flutuante dinamicamente se não existir
        let dropdown = document.getElementById('search-results-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'search-results-dropdown';
            dropdown.className = 'search-results-dropdown';
            const searchBox = searchInput.closest('.search-box');
            if (searchBox) {
                searchBox.style.position = 'relative';
                searchBox.appendChild(dropdown);
            }
        }

        let searchProductsList = [];
        
        // Carrega produtos uma vez do banco de dados para busca local
        async function fetchAllProductsForSearch() {
            if (typeof window.supabase !== 'undefined') {
                const client = window.supabase.createClient(supabaseUrl, supabaseKey);
                try {
                    const { data, error } = await client
                        .from('products')
                        .select('name, price, category, sub_category, image_url, specs');
                    if (!error && data) {
                        searchProductsList = data;
                    }
                } catch (e) {
                    console.error('Erro ao carregar produtos para busca:', e);
                }
            }
        }
        
        fetchAllProductsForSearch();

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                dropdown.innerHTML = '';
                dropdown.classList.remove('active');
                return;
            }

            const filtered = searchProductsList.filter(p => 
                p.name.toLowerCase().includes(query) || 
                (p.category && p.category.toLowerCase().includes(query)) ||
                (p.sub_category && p.sub_category.toLowerCase().includes(query))
            );

            dropdown.innerHTML = '';
            
            if (filtered.length === 0) {
                dropdown.innerHTML = '<div class="search-no-results">Nenhum produto encontrado</div>';
            } else {
                // Mostra no máximo 5 resultados
                filtered.slice(0, 5).forEach(product => {
                    const item = document.createElement('a');
                    item.className = 'search-result-item';
                    
                    const priceFormatted = parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                    const storageText = product.specs && product.specs.storage ? ` (${Array.isArray(product.specs.storage) ? product.specs.storage[0] : product.specs.storage})` : '';
                    
                    // Direciona para a página correspondente da categoria com destaque do produto
                    let targetUrl = `${product.category}.html`;
                    const params = new URLSearchParams();
                    if (product.sub_category) {
                        params.append('cat', product.sub_category);
                    }
                    params.append('highlight', product.name);
                    item.href = `${targetUrl}?${params.toString()}`;

                    // Intercepta o clique se já estivermos na página correspondente
                    item.addEventListener('click', (e) => {
                        const currentPath = window.location.pathname.toLowerCase();
                        const targetPage = `${product.category}.html`.toLowerCase();
                        
                        if (currentPath.includes(targetPage) || (targetPage === 'celulares.html' && currentPath === '/') || (targetPage === 'celulares.html' && currentPath.endsWith('index.html'))) {
                            // Se estivermos na home e buscar celular, deixa navegar normalmente para ir para celulares.html
                            if (currentPath === '/' || currentPath.endsWith('index.html')) {
                                return;
                            }
                            
                            e.preventDefault();
                            dropdown.classList.remove('active');
                            searchInput.value = '';
                            
                            // 1. Ativa a subcategoria correta se necessário
                            if (product.sub_category) {
                                // Altera a URL discretamente no histórico
                                const newUrl = window.location.pathname + `?cat=${product.sub_category}&highlight=${encodeURIComponent(product.name)}`;
                                history.pushState(null, '', newUrl);
                                
                                const categoryBtn = document.querySelector(`.category-btn[onclick*="${product.sub_category}"]`);
                                if (categoryBtn) {
                                    // Clica no botão da categoria para alternar a marca na tela
                                    categoryBtn.click();
                                }
                            } else {
                                const newUrl = window.location.pathname + `?highlight=${encodeURIComponent(product.name)}`;
                                history.pushState(null, '', newUrl);
                            }
                            
                            // 2. Rola e destaca de imediato
                            setTimeout(() => {
                                const cards = document.querySelectorAll('.horizontal-card');
                                let targetCard = null;
                                for (const card of cards) {
                                    const titleEl = card.querySelector('.horizontal-title');
                                    if (titleEl && titleEl.textContent.trim().toLowerCase() === product.name.toLowerCase()) {
                                        targetCard = card;
                                        break;
                                    }
                                }
                                
                                if (targetCard) {
                                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    targetCard.style.outline = '3px solid var(--accent)';
                                    targetCard.style.boxShadow = '0 0 25px rgba(242, 92, 5, 0.4)';
                                    targetCard.style.transform = 'scale(1.02)';
                                    
                                    setTimeout(() => {
                                        targetCard.style.outline = '';
                                        targetCard.style.boxShadow = '';
                                        targetCard.style.transform = '';
                                    }, 3500);
                                }
                            }, 100);
                        }
                    });

                    item.innerHTML = `
                        <div class="search-result-thumb">
                            <img src="${product.image_url || 'public/carousel/realme_c85.png'}" alt="${product.name}">
                        </div>
                        <div class="search-result-info">
                            <span class="search-result-name">${product.name}</span>
                            <span class="search-result-category">${product.category.toUpperCase()}</span>
                            <span class="search-result-price">R$ ${priceFormatted}</span>
                        </div>
                    `;
                    dropdown.appendChild(item);
                });
            }
            dropdown.classList.add('active');
        });

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                dropdown.classList.add('active');
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

    // 6. MODAL: SOBRE NÓS
    const sobreNosModal = document.getElementById('sobre-nos-modal');
    const sobreNosOpenBtn = document.getElementById('footer-sobre-nos-btn');
    const sobreNosCloseBtn = document.getElementById('sobre-nos-close');
    const sobreNosBackBtn = document.getElementById('sobre-nos-back');

    function openSobreNos(e) {
        if (e) e.preventDefault();
        sobreNosModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Travar scroll da página
    }

    function closeSobreNos() {
        sobreNosModal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll da página
    }

    if (sobreNosOpenBtn) sobreNosOpenBtn.addEventListener('click', openSobreNos);
    if (sobreNosCloseBtn) sobreNosCloseBtn.addEventListener('click', closeSobreNos);
    if (sobreNosBackBtn) sobreNosBackBtn.addEventListener('click', closeSobreNos);

    // Fechar ao clicar no overlay (fundo escuro)
    if (sobreNosModal) {
        sobreNosModal.addEventListener('click', (e) => {
            if (e.target === sobreNosModal) closeSobreNos();
        });
    }

    // Fechar com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sobreNosModal && sobreNosModal.classList.contains('active')) {
            closeSobreNos();
        }
    });

    // 7. BEST SELLERS CAROUSEL LOGIC
    const bsTrack = document.getElementById('best-sellers-track');
    const bsViewport = document.getElementById('best-sellers-viewport');
    const bsPrevBtn = document.getElementById('best-sellers-prev');
    const bsNextBtn = document.getElementById('best-sellers-next');
    const bsDotsContainer = document.getElementById('best-sellers-dots');

    if (bsTrack && bsViewport) {
        let originalCards = [];
        let currentScroll = 0;
        let isPaused = false;
        let isTransitioning = false;
        let animationFrameId = null;
        let interactionTimeout = null;
        const speed = 0.7; // pixels per frame (controls speed of continuous scroll)

        function getGapValue() {
            return window.innerWidth <= 768 ? 16 : 24;
        }

        // JS continuous smooth scroll loop
        function startMarquee() {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            
            function step() {
                if (window.innerWidth > 768) {
                    if (!isPaused && !isTransitioning) {
                        currentScroll -= speed;
                        // Calculate width of original cards (half the track scrollWidth)
                        const halfWidth = bsTrack.scrollWidth / 2;
                        if (Math.abs(currentScroll) >= halfWidth) {
                            currentScroll = 0;
                        }
                        bsTrack.style.transform = `translateX(${currentScroll}px)`;
                    }
                } else {
                    bsTrack.style.transform = ''; // let mobile scroll natively
                }
                animationFrameId = requestAnimationFrame(step);
            }
            animationFrameId = requestAnimationFrame(step);
        }

        function handleArrowClick(direction) {
            if (window.innerWidth <= 768) return; // scroll natively on mobile
            if (originalCards.length === 0) return;
            
            isPaused = true;
            isTransitioning = true;
            clearTimeout(interactionTimeout);

            const cardWidth = originalCards[0].offsetWidth;
            const gap = getGapValue();
            const itemWidth = cardWidth + gap;
            const halfWidth = bsTrack.scrollWidth / 2;

            // Calculate current index relative to itemWidth
            let activeIndex = Math.round(Math.abs(currentScroll) / itemWidth);
            let targetScroll;

            if (direction === 'next') {
                targetScroll = -(activeIndex + 1) * itemWidth;
            } else {
                targetScroll = -(activeIndex - 1) * itemWidth;
            }

            // Enable CSS transition dynamically
            bsTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

            // Seamless boundary wrap handling
            if (direction === 'next' && Math.abs(targetScroll) >= halfWidth) {
                // Animate to targetScroll in the cloned section, then jump to the original start position instantly
                bsTrack.style.transform = `translateX(${targetScroll}px)`;
                currentScroll = targetScroll;
                
                setTimeout(() => {
                    bsTrack.style.transition = 'none';
                    // Equivalent position on first half
                    currentScroll = targetScroll + halfWidth;
                    bsTrack.style.transform = `translateX(${currentScroll}px)`;
                    isTransitioning = false;
                }, 600);
            } else if (direction === 'prev' && targetScroll > 0) {
                // If moving left past 0, jump to duplicate position on second half instantly, then transition to its left neighbor
                bsTrack.style.transition = 'none';
                currentScroll = -halfWidth;
                bsTrack.style.transform = `translateX(${currentScroll}px)`;
                
                // Force reflow
                bsTrack.offsetHeight;

                // Target scroll on the duplicate portion
                targetScroll = -(halfWidth / itemWidth - 1) * itemWidth;
                
                bsTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                bsTrack.style.transform = `translateX(${targetScroll}px)`;
                currentScroll = targetScroll;

                setTimeout(() => {
                    isTransitioning = false;
                }, 600);
            } else {
                // Normal transition
                bsTrack.style.transform = `translateX(${targetScroll}px)`;
                currentScroll = targetScroll;
                setTimeout(() => {
                    isTransitioning = false;
                }, 600);
            }

            // Update dot indicator active state based on index
            updateActiveDot();

            // Resume smooth scrolling after 5 seconds of inactivity
            interactionTimeout = setTimeout(() => {
                bsTrack.style.transition = 'none';
                isPaused = false;
                interactionTimeout = null;
            }, 5000);
        }

        // Setas
        if (bsPrevBtn) {
            bsPrevBtn.addEventListener('click', () => handleArrowClick('prev'));
        }
        if (bsNextBtn) {
            bsNextBtn.addEventListener('click', () => handleArrowClick('next'));
        }

        // Dots (Indicadores) logic
        function createBsDots() {
            if (!bsDotsContainer) return;
            bsDotsContainer.innerHTML = '';
            if (window.innerWidth <= 768) return;
            if (originalCards.length === 0) return;

            // Generate one dot per original card for fine-grained navigation
            originalCards.forEach((_, idx) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (idx === 0) dot.classList.add('active');
                dot.setAttribute('data-idx', idx);
                dot.addEventListener('click', () => {
                    isPaused = true;
                    isTransitioning = true;
                    clearTimeout(interactionTimeout);

                    const cardWidth = originalCards[0].offsetWidth;
                    const gap = getGapValue();
                    const itemWidth = cardWidth + gap;
                    const targetScroll = -idx * itemWidth;

                    bsTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                    bsTrack.style.transform = `translateX(${targetScroll}px)`;
                    currentScroll = targetScroll;

                    updateActiveDot();

                    setTimeout(() => {
                        isTransitioning = false;
                    }, 600);

                    interactionTimeout = setTimeout(() => {
                        bsTrack.style.transition = 'none';
                        isPaused = false;
                        interactionTimeout = null;
                    }, 5000);
                });
                bsDotsContainer.appendChild(dot);
            });
        }

        function updateActiveDot() {
            if (!bsDotsContainer) return;
            const dots = bsDotsContainer.querySelectorAll('.dot');
            if (originalCards.length === 0 || dots.length === 0) return;
            const cardWidth = originalCards[0].offsetWidth;
            const gap = getGapValue();
            const itemWidth = cardWidth + gap;
            
            if (itemWidth <= 0) return;

            // Sync active index modulo original length
            let activeIndex = Math.round(Math.abs(currentScroll) / itemWidth) % originalCards.length;
            
            dots.forEach((dot, idx) => {
                dot.classList.remove('active');
                if (idx === activeIndex) {
                    dot.classList.add('active');
                }
            });
        }

        // Continuous sync of dots during smooth scrolling
        setInterval(() => {
            if (!isPaused && !isTransitioning && window.innerWidth > 768) {
                updateActiveDot();
            }
        }, 500);

        // Pause/resume marquee on hover
        bsViewport.addEventListener('mouseenter', () => { isPaused = true; });
        bsViewport.addEventListener('mouseleave', () => {
            if (isPaused && !isTransitioning && !interactionTimeout) {
                isPaused = false;
            }
        });

        // Initialize Carousel Structure
        function initCarousel() {
            originalCards = Array.from(bsTrack.querySelectorAll('.product-card'));
            
            // Clone all cards for a seamless infinite loop
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                bsTrack.appendChild(clone);
            });

            createBsDots();
            startMarquee();
        }

        // Busca produtos marcados como Mais Vendidos do Supabase
        async function fetchBestSellers() {
            if (typeof window.supabase !== 'undefined') {
                const client = window.supabase.createClient(supabaseUrl, supabaseKey);
                try {
                    const { data: products, error } = await client
                        .from('products')
                        .select('*')
                        .eq('is_best_seller', true)
                        .order('created_at', { ascending: false });

                    if (error) throw error;
                    
                    if (products && products.length > 0) {
                        products.forEach(product => {
                            const card = document.createElement('div');
                            card.className = 'product-card';
                            
                            const priceFormatted = parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                            const originalPriceHtml = product.original_price 
                                ? `<span class="price-original">R$ ${parseFloat(product.original_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>` 
                                : '';
                            
                            // Determina a página de destino da categoria
                            let targetPage = 'celulares.html';
                            if (product.category) {
                                targetPage = `${product.category}.html`;
                            }
                            
                            const params = new URLSearchParams();
                            if (product.sub_category) {
                                params.append('cat', product.sub_category);
                            }
                            params.append('highlight', product.name);
                            const targetLink = `${targetPage}?${params.toString()}`;
                            
                            card.setAttribute('data-href', targetLink);
                            card.style.cursor = 'pointer';

                            const finalImgUrl = (product.specs && product.specs.carousel_image_url) 
                                 ? product.specs.carousel_image_url 
                                 : (product.image_url || 'public/carousel/realme_c85.png');

                            card.innerHTML = `
                                <div class="product-image-container">
                                    <img src="${finalImgUrl}" alt="${product.name}">
                                </div>
                                <div class="product-info">
                                    <h3 class="product-title">${product.name}</h3>
                                    <p class="product-tagline">${product.description || ''}</p>
                                    <div class="product-price">
                                        <span class="price-discount">R$ ${priceFormatted}</span>
                                        ${originalPriceHtml}
                                    </div>
                                    <a href="${targetLink}" class="btn-buy-card">Ver Mercadoria</a>
                                </div>
                            `;
                            bsTrack.appendChild(card);
                        });
                    }
                } catch (err) {
                    console.error('Erro ao buscar produtos dinâmicos (Mais Vendidos):', err);
                }
            }
            initCarousel();
        }

        // Delegação de clique robusta para lidar com os cards originais e clonados no carrossel
        bsTrack.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                const href = card.getAttribute('data-href');
                if (href) {
                    e.preventDefault();
                    window.location.href = href;
                }
            }
        });

        // Inicia carregando produtos do Supabase (com fallback estático)
        fetchBestSellers();

        window.addEventListener('resize', () => {
            createBsDots();
            if (window.innerWidth <= 768) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                bsTrack.style.transform = '';
            } else {
                startMarquee();
            }
        });
    }

    const qnContainer = document.querySelector('.quick-nav-container');
    if (qnContainer && window.innerWidth <= 768) {
        const qnItems = qnContainer.querySelectorAll('.quick-nav-item');
        qnItems.forEach(item => {
            const clone = item.cloneNode(true);
            qnContainer.appendChild(clone);
        });
    }
    const loginModal = document.getElementById('admin-login-modal');
    const loginTriggers = document.querySelectorAll('.login-trigger');
    const loginCloseBtn = document.getElementById('admin-login-close');
    const loginForm = document.getElementById('admin-login-form');
    const errorMsgDiv = document.getElementById('login-error-msg');

    async function openLoginModal(e) {
        if (e) e.preventDefault();
        if (supabase) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                window.location.href = 'admin.html';
                return;
            }
        }
        if (loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (errorMsgDiv) errorMsgDiv.style.display = 'none';
        }
    }

    function closeLoginModal() {
        if (loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', openLoginModal);
    });

    // Check URL parameters to auto-open login modal
    const loginParam = new URLSearchParams(window.location.search).get('login');
    if (loginParam === 'true') {
        openLoginModal();
    }

    if (loginCloseBtn) {
        loginCloseBtn.addEventListener('click', closeLoginModal);
    }

    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeLoginModal();
        });
    }

    // Fechar com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
            closeLoginModal();
        }
    });

    // Enviar dados do login para o Supabase Auth
    if (loginForm && supabase) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (errorMsgDiv) errorMsgDiv.style.display = 'none';
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const submitBtn = document.getElementById('login-submit-btn');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Autenticando...';
            }

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) throw error;

                // Redireciona para o painel de controle
                window.location.href = 'admin.html';
            } catch (err) {
                console.error('Erro de autenticação:', err);
                if (errorMsgDiv) {
                    errorMsgDiv.innerText = 'Email ou senha inválidos. Tente novamente.';
                    errorMsgDiv.style.display = 'block';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Entrar no Painel';
                }
            }
        });
    }

    // Busca e renderiza dinamicamente a seção de Novos Lançamentos do Supabase
    async function fetchNewLaunches() {
        const newLaunchSection = document.getElementById('new-launch');
        if (!newLaunchSection || typeof window.supabase === 'undefined') return;

        const client = window.supabase.createClient(supabaseUrl, supabaseKey);
        try {
            const { data: products, error } = await client
                .from('products')
                .select('*')
                .eq('is_new_launch', true)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (products && products.length > 0) {
                // Remove o card estático original
                const heroCard = newLaunchSection.querySelector('.launch-hero-card');
                if (heroCard) heroCard.remove();

                // Remove cards dinâmicos antigos caso já tenham sido inseridos
                const existingDynamicCards = newLaunchSection.querySelectorAll('.launch-hero-card');
                existingDynamicCards.forEach(c => c.remove());

                // Para cada novo lançamento cadastrado, cria um card
                products.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'launch-hero-card';
                    card.style.marginBottom = '24px'; // margem caso haja múltiplos

                    const priceFormatted = parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                    
                    // Converte descrição ou specs para bullet points
                    let specsListHtml = '';
                    if (product.description) {
                        specsListHtml = product.description.split(' • ').map(spec => `<li>${spec.trim()}</li>`).join('');
                        if (!specsListHtml.includes('<li>')) {
                            specsListHtml = product.description.split(',').map(spec => `<li>${spec.trim()}</li>`).join('');
                        }
                    }

                    // Tenta ler capacidade das especificações
                    const storageLabel = product.specs && product.specs.storage 
                        ? (Array.isArray(product.specs.storage) ? product.specs.storage[0] : product.specs.storage)
                        : '';
                    const storageText = storageLabel ? ` (${storageLabel})` : '';

                    const waText = encodeURIComponent(`Olá, gostaria de comprar o lançamento ${product.name}${storageText} por R$ ${priceFormatted}`);
                    const waLink = `https://wa.me/5517997559675?text=${waText}`;

                    // Determina o link de Saiba Mais
                    let saibaMaisLink = 'celulares.html';
                    if (product.category) {
                        saibaMaisLink = `${product.category}.html`;
                        const params = new URLSearchParams();
                        if (product.sub_category) {
                            params.append('cat', product.sub_category);
                        }
                        params.append('highlight', product.name);
                        saibaMaisLink += `?${params.toString()}`;
                    }

                    const finalImgUrl = (product.specs && product.specs.new_launch_image_url) 
                         ? product.specs.new_launch_image_url 
                         : (product.image_url || 'public/carousel/realme_c85.png');

                     card.innerHTML = `
                         <div class="launch-image-container">
                             <img src="${finalImgUrl}" alt="${product.name}">
                         </div>
                         <div class="launch-details">
                             <div class="launch-badge">LANÇAMENTO</div>
                             <h3 class="launch-title">${product.name}</h3>
                             <p class="launch-desc">Confira o novo lançamento disponível na loja física e online com preço e condições exclusivas!</p>
                             <ul class="launch-specs">
                                 ${specsListHtml || `<li>Design inovador e moderno</li><li>Alta performance no dia a dia</li>`}
                             </ul>
                             <div class="launch-pricing">
                                 <span class="price-now">R$ ${priceFormatted}</span>
                             </div>
                             <div class="launch-actions">
                                 <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">Comprar Agora</a>
                                 <a href="${saibaMaisLink}" class="btn-secondary">Saiba Mais</a>
                             </div>
                         </div>
                     `;
                    newLaunchSection.appendChild(card);
                });
            }
        } catch (err) {
            console.error('Erro ao buscar novos lançamentos:', err);
        }
    }

    fetchNewLaunches();

    // 8. PROCESSAMENTO DE LINKS DO CABEÇALHO E INTERCEPTAÇÃO DE CLIQUES
    function setupHeaderLinks() {
        const genericCategories = [
            'loja', 'celulares', 'tablets', 'power bank', 'áudio', 'acessórios', 'informática',
            'destaques', 'mais vendidos', 'sobre nós', 'fones', 'caixas de som', 'películas',
            'cases', 'carregadores', 'cabos', 'teclados', 'teclado e mouse', 'login', 'painel admin'
        ];

        document.querySelectorAll('.nav-menu a, .mobile-actions a, .dropdown-menu a, .mega-menu a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Alvos de categoria
            const targets = ['celulares.html', 'baterias.html', 'audio.html', 'acessorios.html', 'informatica.html', 'tablets.html'];
            const isTargetPage = targets.some(t => href.includes(t));
            
            if (isTargetPage) {
                const text = link.textContent.trim();
                // Ignora se for link de categoria genérica
                if (genericCategories.includes(text.toLowerCase())) return;

                // Limpa o nome do produto para a busca/destaque
                const cleanName = text
                    .replace(/\(Destaque\)/gi, '')
                    .replace(/\(Barrinha\)/gi, '')
                    .replace(/\(Flip\)/gi, '')
                    .trim();

                if (cleanName.length > 0 && !href.includes('highlight=')) {
                    const separator = href.includes('?') ? '&' : '?';
                    const newHref = `${href}${separator}highlight=${encodeURIComponent(cleanName)}`;
                    link.setAttribute('href', newHref);
                }

                // Intercepta cliques se já estivermos na mesma página
                link.addEventListener('click', (e) => {
                    const currentPath = window.location.pathname.toLowerCase();
                    // Resolve o caminho relativo do link
                    const targetUrl = new URL(link.getAttribute('href'), window.location.origin);
                    const targetPath = targetUrl.pathname.toLowerCase();

                    // Se estamos na mesma página html (ex: celulares.html) ou mapeamento index -> celulares
                    const isSamePage = currentPath === targetPath || 
                        (currentPath.endsWith('/') && targetPath.endsWith('index.html')) || 
                        (currentPath.endsWith('index.html') && targetPath.endsWith('/'));

                    if (isSamePage) {
                        const searchParams = targetUrl.searchParams;
                        const highlight = searchParams.get('highlight');
                        const cat = searchParams.get('cat');

                        if (highlight && typeof window.highlightProduct === 'function') {
                            e.preventDefault();
                            
                            // Atualiza a URL sem recarregar
                            history.pushState(null, '', targetUrl.pathname + targetUrl.search);
                            
                            // Dispara destaque e scroll suave
                            window.highlightProduct(highlight);

                            // Fecha menu mobile se estiver aberto
                            const mobileToggle = document.getElementById('mobile-toggle');
                            const navMenu = document.getElementById('nav-menu');
                            if (mobileToggle && navMenu) {
                                mobileToggle.classList.remove('active');
                                navMenu.classList.remove('active');
                            }
                        }
                    }
                });
            }
        });
    }

    // Executa setup dos links com pequeno delay para garantir carregamento de outros scripts
    setTimeout(setupHeaderLinks, 100);
});
