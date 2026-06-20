// dynamic-loader.js - Dynamic category products loader from Supabase

(function() {
    const supabaseUrl = 'https://hoceltmynggfpdyyvdmb.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvY2VsdG15bmdnZnBkeXl2ZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2Mjk0OTksImV4cCI6MjA5NzIwNTQ5OX0.Smt5T1v7dzSMEeM05Iyj9itgpYSwPmkfCKm5pZXzIzQ';

    document.addEventListener('DOMContentLoaded', async () => {
        // 1. Detect category from URL / File Name
        let category = '';
        const path = window.location.pathname.toLowerCase();
        
        if (path.includes('celulares')) category = 'celulares';
        else if (path.includes('tablets')) category = 'tablets';
        else if (path.includes('audio')) category = 'audio';
        else if (path.includes('baterias')) category = 'baterias';
        else if (path.includes('acessorios')) category = 'acessorios';
        else if (path.includes('informatica')) category = 'informatica';
        else if (path.includes('moda')) category = 'moda';
        else if (path.includes('perfumes')) category = 'perfumes';
        else if (path.includes('outros')) category = 'outros';
        
        if (!category) return;

        // Renderiza Skeleton Loaders nas páginas com carregamento dinâmico para evitar Layout Shifts do footer
        const allGrids = document.querySelectorAll('.category-grid, .products-grid');
        const isDynamicPage = ['perfumes', 'moda', 'outros'].includes(category);
        
        if (isDynamicPage && allGrids.length > 0) {
            allGrids.forEach(grid => {
                grid.innerHTML = `
                    <div class="skeleton-card">
                        <div class="skeleton-image"></div>
                        <div class="skeleton-info">
                            <div class="skeleton-text skeleton-title"></div>
                            <div class="skeleton-text skeleton-badge"></div>
                            <div class="skeleton-text skeleton-bullet"></div>
                            <div class="skeleton-text skeleton-bullet-short"></div>
                            <div class="skeleton-price-row">
                                <div class="skeleton-text skeleton-price"></div>
                                <div class="skeleton-text skeleton-btn"></div>
                            </div>
                        </div>
                    </div>
                    <div class="skeleton-card">
                        <div class="skeleton-image"></div>
                        <div class="skeleton-info">
                            <div class="skeleton-text skeleton-title"></div>
                            <div class="skeleton-text skeleton-badge"></div>
                            <div class="skeleton-text skeleton-bullet"></div>
                            <div class="skeleton-text skeleton-bullet-short"></div>
                            <div class="skeleton-price-row">
                                <div class="skeleton-text skeleton-price"></div>
                                <div class="skeleton-text skeleton-btn"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        // Check if Supabase JS Client is loaded
        if (typeof window.supabase === 'undefined') return;
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        
        try {             // 2. Query products for current category
            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category)
                .neq('is_paused', true)
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            
            if (!products || products.length === 0) {
                allGrids.forEach(grid => {
                    grid.innerHTML = `
                        <div class="no-products-message" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #86868b; font-family: 'Outfit', sans-serif;">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 15px; color: #d2d2d7; display: block;">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                            <p style="font-size: 1.1rem; font-weight: 500; margin-bottom: 5px;">Nenhum produto disponível</p>
                            <p style="font-size: 0.9rem;">Estamos preparando novidades para esta categoria. Volte em breve!</p>
                        </div>
                    `;
                });
                return;
            }
            
            // 3. Group products by sub_category
            const groups = {};
            products.forEach(product => {
                const sub = product.sub_category || 'default';
                if (!groups[sub]) groups[sub] = [];
                groups[sub].push(product);
            });
            
            const renderedSections = new Set();

            // 4. Render each subcategory group
            Object.keys(groups).forEach(sub => {
                let sectionId = sub;
                if (category === 'tablets') {
                    if (sub === 'xiaomi') sectionId = 'xiaomi-tablets';
                    else if (sub === 'entrada') sectionId = 'amazon-fire';
                } else {
                    if (sub === 'xiaomi') sectionId = 'xiaomi';
                    else if (sub === 'amazon-fire') sectionId = 'amazon-fire';
                }
                
                const section = document.getElementById(sectionId) || document.getElementById(sub);
                if (!section) return;
                
                const grid = section.querySelector('.category-grid') || section.querySelector('.products-grid');
                if (!grid) return;
                
                grid.innerHTML = '';
                renderedSections.add(section.id);
                
                const items = groups[sub];
                items.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'horizontal-card';
                    
                    // Colors
                    const specs = product.specs || {};
                    let colorsHtml = '';
                    
                    let normalizedColors = [];
                    if (specs.colors) {
                        if (Array.isArray(specs.colors)) {
                            normalizedColors = specs.colors.map(c => {
                                if (typeof c === 'object' && c !== null) {
                                    return { 
                                        hex: c.hex || '#000000', 
                                        name: c.name || 'Cor', 
                                        image_url: c.image_url || null 
                                    };
                                }
                                return { hex: '#000000', name: String(c), image_url: null };
                            });
                        } else if (typeof specs.colors === 'string') {
                            normalizedColors = specs.colors.split(',').map(c => c.trim()).filter(c => c !== '').map(c => ({ hex: '#000000', name: c, image_url: null }));
                        }
                    }

                    if (normalizedColors.length > 0) {
                        const colorMap = {
                            'preto': '#1d1d1f', 'azul': '#0066cc', 'dourado': '#e5c158',
                            'branco': '#ffffff', 'cinza': '#86868b', 'verde': '#34c759',
                            'rosa': '#ff2d55', 'roxo': '#af52de', 'vermelho': '#ff3b30',
                            'prata': '#d1d1d6', 'grafit': '#3a3a3c', 'gold': '#f5d0a9',
                            'silver': '#e5e5ea', 'black': '#000000', 'blue': '#0000ff'
                        };
                        
                        const dots = normalizedColors.map((colorObj, idx) => {
                            const cleanColor = colorObj.name.toLowerCase().trim();
                            const hex = (colorObj.hex && colorObj.hex !== '#000000') ? colorObj.hex : (colorMap[cleanColor] || '#000000');
                            const colorImg = colorObj.image_url || '';
                            return `<span class="color-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${hex};" title="${colorObj.name}" data-image="${colorImg}"></span>`;
                        }).join('');
                        
                        colorsHtml = `
                            <div class="color-selector">
                                <span>Cor: ${normalizedColors[0].name}</span>
                                <div class="color-dots">
                                    ${dots}
                                </div>
                            </div>
                        `;
                    }
                    
                    // Storage (Variations)
                    let normalizedStorage = [];
                    if (specs.storage) {
                        if (Array.isArray(specs.storage)) {
                            normalizedStorage = specs.storage.map(s => {
                                if (typeof s === 'object' && s !== null) {
                                    return { 
                                        value: s.value || '', 
                                        price: s.price || null,
                                        color: s.color || null 
                                    };
                                }
                                return { value: String(s), price: null, color: null };
                            });
                        } else if (typeof specs.storage === 'string') {
                            normalizedStorage = specs.storage.split(',').map(s => s.trim()).filter(s => s !== '').map(s => ({ value: s, price: null, color: null }));
                        }
                    }

                    // Specs List (bullet points)
                    let specsHtml = '';
                    if (product.description) {
                        specsHtml = product.description.split('\n').map(line => `<li>${line.trim()}</li>`).join('');
                    }
                    
                    // Calculate active/initial price and links
                    let initialPrice = parseFloat(product.price);
                    let initialStorageLabel = '';
                    
                    // Filter storage for initial color
                    const activeColorObj = normalizedColors.find((_, idx) => idx === 0);
                    let initialColorName = activeColorObj ? activeColorObj.name : '';
                    let initialColorLabel = activeColorObj ? ` - Cor: ${activeColorObj.name}` : '';
                    
                    const filteredStorageForInit = normalizedStorage.filter(s => 
                        !s.color || (initialColorName && s.color.toLowerCase().trim() === initialColorName.toLowerCase().trim())
                    );
                    
                    if (filteredStorageForInit.length > 0) {
                        initialStorageLabel = ` (${filteredStorageForInit[0].value})`;
                        if (filteredStorageForInit[0].price) {
                            initialPrice = parseFloat(filteredStorageForInit[0].price);
                        }
                    }
                    
                    const priceFormatted = initialPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                    const waText = encodeURIComponent(`Olá, gostaria de comprar o ${product.name}${initialStorageLabel}${initialColorLabel} por R$ ${priceFormatted}`);
                    const waLink = `https://wa.me/5517997559675?text=${waText}`;
                    
                    const defaultImg = category === 'perfumes' ? 'public/carousel/perfume_placeholder.png' : 'public/carousel/realme_c85.png';
                    const initialImg = (activeColorObj && activeColorObj.image_url) 
                        ? activeColorObj.image_url 
                        : (product.image_url || defaultImg);
                        
                    card.setAttribute('data-base-price', product.price);
                    card.setAttribute('data-product-name', product.name);
                    card.innerHTML = `
                        <div class="horizontal-image-container">
                            <img src="${initialImg}" alt="${product.name}" style="mix-blend-mode: multiply;" data-default-src="${product.image_url || defaultImg}">
                        </div>
                        <div class="horizontal-info">
                            <h3 class="horizontal-title">${product.name}</h3>
                            ${colorsHtml}
                            <div class="storage-selector-container"></div>
                            <ul class="spec-list">
                                ${specsHtml}
                            </ul>
                            <div class="horizontal-price-buy-row">
                                <span class="horizontal-price">R$ ${priceFormatted}</span>
                                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="horizontal-buy-btn">Comprar</a>
                            </div>
                        </div>
                    `;
                    
                    // Render storage badges for the initial color
                    const storageContainer = card.querySelector('.storage-selector-container');
                    if (storageContainer) {
                        renderStorageBadgesForColor(initialColorName, storageContainer);
                    }
                    
                    grid.appendChild(card);

                    // Rebind interactive selectors (Color dots)
                    card.querySelectorAll('.color-dot').forEach(dot => {
                        dot.addEventListener('click', function() {
                            const parent = this.closest('.color-dots');
                            parent.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
                            this.classList.add('active');
                            
                            const label = this.closest('.color-selector').querySelector('span');
                            const colorName = this.getAttribute('title');
                            label.textContent = `Cor: ${colorName}`;
                            
                            // Update image
                            const imgEl = card.querySelector('.horizontal-image-container img');
                            if (imgEl) {
                                const colorImg = this.getAttribute('data-image');
                                if (colorImg) {
                                    imgEl.src = colorImg;
                                } else {
                                    const defaultSrc = imgEl.getAttribute('data-default-src');
                                    if (defaultSrc) imgEl.src = defaultSrc;
                                }
                            }
                            
                            // Re-render storage badges for the selected color
                            const storageCont = card.querySelector('.storage-selector-container');
                            if (storageCont) {
                                renderStorageBadgesForColor(colorName, storageCont);
                            }
                            
                            updateCardBuyLinkAndPrice(card);
                        });
                    });
                
                // Helper to render storage badges filtered by color name
                function renderStorageBadgesForColor(colorName, container, activeValue = null) {
                    container.innerHTML = '';
                    const card = container.closest('.horizontal-card');
                    if (!card) return;
                    
                    // Filter storage options by color name (match or no color specified)
                    const filtered = normalizedStorage.filter(s => 
                        !s.color || (colorName && s.color.toLowerCase().trim() === colorName.toLowerCase().trim())
                    );
                    
                    if (filtered.length === 0) {
                        container.style.display = 'none';
                        return;
                    }
                    
                    container.style.display = 'block';
                    filtered.forEach((st, idx) => {
                        const badge = document.createElement('span');
                        badge.className = 'storage-badge';
                        badge.textContent = st.value;
                        if (st.price) {
                            badge.setAttribute('data-price', st.price);
                        }
                        
                        const isBadgeActive = activeValue ? st.value === activeValue : idx === 0;
                        if (isBadgeActive) {
                            badge.classList.add('active');
                        }
                        
                        badge.addEventListener('click', function() {
                            container.querySelectorAll('.storage-badge').forEach(b => b.classList.remove('active'));
                            this.classList.add('active');
                            updateCardBuyLinkAndPrice(card);
                        });
                        container.appendChild(badge);
                    });
                }
                
                // Helper to update price and WhatsApp link dynamically
                function updateCardBuyLinkAndPrice(card) {
                    if (!card) return;
                    const basePrice = parseFloat(card.getAttribute('data-base-price'));
                    const productName = card.getAttribute('data-product-name');
                    
                    // Capacity
                    const activeStorage = card.querySelector('.storage-badge.active');
                    let storageLabel = '';
                    let priceToUse = basePrice;
                    if (activeStorage) {
                        storageLabel = ` (${activeStorage.textContent})`;
                        const customPrice = activeStorage.getAttribute('data-price');
                        if (customPrice) {
                            priceToUse = parseFloat(customPrice);
                        }
                    }
                    
                    // Color
                    const activeColor = card.querySelector('.color-dot.active');
                    let colorLabel = '';
                    if (activeColor) {
                        const colorTitle = activeColor.getAttribute('title');
                        if (colorTitle) {
                            colorLabel = ` - Cor: ${colorTitle}`;
                        }
                    }
                    
                    // Format price
                    const priceFormatted = priceToUse.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                    
                    // Update price element
                    const priceEl = card.querySelector('.horizontal-price');
                    if (priceEl) {
                        priceEl.textContent = `R$ ${priceFormatted}`;
                    }
                    
                    // Update WhatsApp buy link
                    const buyBtn = card.querySelector('.horizontal-buy-btn');
                    if (buyBtn) {
                        const waText = encodeURIComponent(`Olá, gostaria de comprar o ${productName}${storageLabel}${colorLabel} por R$ ${priceFormatted}`);
                        buyBtn.href = `https://wa.me/5517997559675?text=${waText}`;
                    }
                }
                });
            });

            // 5. Para as subcategorias que não possuem produtos cadastrados, exibe "Em breve" em vez de carregamento infinito
            const allGridsOnPage = document.querySelectorAll('.category-grid, .products-grid');
            allGridsOnPage.forEach(grid => {
                const parentSection = grid.closest('[id]');
                if (parentSection && !renderedSections.has(parentSection.id)) {
                    grid.innerHTML = `
                        <div class="empty-subcategory-message" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #86868b; font-family: 'Outfit', sans-serif;">
                            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 10px; color: #d2d2d7; display: block;">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                            <p style="font-size: 1rem; font-weight: 500; margin-bottom: 4px; color: var(--text-secondary);">Em breve</p>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">Novos produtos serão adicionados nesta categoria.</p>
                        </div>
                    `;
                }
            });
 
            // 6. Aciona o destaque de produtos global
            const urlParams = new URLSearchParams(window.location.search);
            const highlightName = urlParams.get('highlight');
            if (highlightName && typeof window.highlightProduct === 'function') {
                window.highlightProduct(highlightName);
            }
            
        } catch (err) {
            console.error(`Erro ao carregar produtos dinâmicos da categoria ${category}:`, err);
        }
    });
})();
