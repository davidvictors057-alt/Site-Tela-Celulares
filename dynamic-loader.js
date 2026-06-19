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
        
        if (!category) return;
        
        // Check if Supabase JS Client is loaded
        if (typeof window.supabase === 'undefined') return;
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        
        try {
            // 2. Query products for current category
            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category)
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            if (!products || products.length === 0) return; // Fallback: keep static HTML
            
            // 3. Group products by sub_category
            const groups = {};
            products.forEach(product => {
                const sub = product.sub_category || 'default';
                if (!groups[sub]) groups[sub] = [];
                groups[sub].push(product);
            });
            
            // 4. Render each subcategory group
            Object.keys(groups).forEach(sub => {
                // Find subcategory element by ID (e.g. #realme, #xiaomi, #entrada, #amazon-fire, etc.)
                let sectionId = sub;
                // Map custom subcategories to element IDs if needed
                if (sub === 'xiaomi') sectionId = 'xiaomi';
                else if (sub === 'amazon-fire') sectionId = 'amazon-fire';
                
                const section = document.getElementById(sectionId) || document.getElementById(sub);
                if (!section) return;
                
                const grid = section.querySelector('.category-grid') || section.querySelector('.products-grid');
                if (!grid) return;
                
                // Clear static HTML cards
                grid.innerHTML = '';
                
                const items = groups[sub];
                items.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'horizontal-card';
                    
                    // Colors
                    const specs = product.specs || {};
                    let colorsHtml = '';
                    
                    // Normaliza cores para um formato uniforme: [{ hex, name }]
                    let normalizedColors = [];
                    if (specs.colors) {
                        if (Array.isArray(specs.colors)) {
                            normalizedColors = specs.colors.map(c => {
                                if (typeof c === 'object' && c !== null) {
                                    return { hex: c.hex || '#000000', name: c.name || 'Cor' };
                                }
                                return { hex: '#000000', name: String(c) };
                            });
                        } else if (typeof specs.colors === 'string') {
                            normalizedColors = specs.colors.split(',').map(c => c.trim()).filter(c => c !== '').map(c => ({ hex: '#000000', name: c }));
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
                            // Se colorObj.hex é válido e diferente de '#000000', usamos ele, senão tentamos o mapeamento
                            const hex = (colorObj.hex && colorObj.hex !== '#000000') ? colorObj.hex : (colorMap[cleanColor] || '#000000');
                            return `<span class="color-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${hex};" title="${colorObj.name}"></span>`;
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
                    
                    // Storage
                    let storageHtml = '';
                    let normalizedStorage = [];
                    if (specs.storage) {
                        if (Array.isArray(specs.storage)) {
                            normalizedStorage = specs.storage;
                        } else if (typeof specs.storage === 'string') {
                            normalizedStorage = [specs.storage];
                        }
                    }

                    if (normalizedStorage.length > 0) {
                        const badges = normalizedStorage.map((st, idx) => {
                            return `<span class="storage-badge ${idx === 0 ? 'active' : ''}">${st}</span>`;
                        }).join('');
                        storageHtml = `
                            <div class="storage-selector">
                                ${badges}
                            </div>
                        `;
                    }
                    
                    // Specs List (bullet points)
                    let specsHtml = '';
                    if (product.description) {
                        specsHtml = product.description.split('\n').map(line => `<li>${line.trim()}</li>`).join('');
                    }
                    
                    const priceFormatted = parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                    const storageLabel = normalizedStorage.length > 0 ? ` (${normalizedStorage[0]})` : '';
                    const waText = encodeURIComponent(`Olá, gostaria de comprar o ${product.name}${storageLabel} por R$ ${priceFormatted}`);
                    const waLink = `https://wa.me/5517997559675?text=${waText}`;
                    
                    // mix-blend-mode: multiply blends the white image background perfectly into the grey cards!
                    card.innerHTML = `
                        <div class="horizontal-image-container">
                            <img src="${product.image_url || 'public/carousel/realme_c85.png'}" alt="${product.name}" style="mix-blend-mode: multiply;">
                        </div>
                        <div class="horizontal-info">
                            <h3 class="horizontal-title">${product.name}</h3>
                            ${colorsHtml}
                            ${storageHtml}
                            <ul class="spec-list">
                                ${specsHtml}
                            </ul>
                            <div class="horizontal-price-buy-row">
                                <span class="horizontal-price">R$ ${priceFormatted}</span>
                                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="horizontal-buy-btn">Comprar</a>
                            </div>
                        </div>
                    `;
                    
                    grid.appendChild(card);
                });
                
                // Rebind interactive selectors (Color dots)
                grid.querySelectorAll('.color-dot').forEach(dot => {
                    dot.addEventListener('click', function() {
                        const parent = this.closest('.color-dots');
                        parent.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
                        this.classList.add('active');
                        
                        const label = this.closest('.color-selector').querySelector('span');
                        const colorName = this.getAttribute('title');
                        label.textContent = `Cor: ${colorName}`;
                    });
                });
                
                // Rebind storage badges
                grid.querySelectorAll('.storage-badge').forEach(badge => {
                    badge.addEventListener('click', function() {
                        const parent = this.closest('.storage-selector');
                        parent.querySelectorAll('.storage-badge').forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            });

            // 5. Destaca e rola até o produto de forma global
            window.highlightProduct = function(name) {
                if (!name) return;
                name = name.trim();
                
                // Encontra qual é a subcategoria (grupo) do produto destacado para garantir que a aba esteja ativa
                const targetProduct = products.find(p => p.name.toLowerCase().trim() === name.toLowerCase());
                if (targetProduct) {
                    const sub = targetProduct.sub_category || 'default';
                    let sectionId = sub;
                    if (sub === 'xiaomi') sectionId = 'xiaomi';
                    else if (sub === 'amazon-fire') sectionId = 'amazon-fire';
                    
                    // Clica no botão correspondente da aba para ativá-la e exibi-la
                    const categoryBtn = document.querySelector(`.category-btn[onclick*="${sub}"]`);
                    if (categoryBtn) {
                        // Remove active de todos os botões e seções
                        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                        document.querySelectorAll('.category-section').forEach(sec => sec.classList.remove('active'));
                        
                        // Ativa a aba
                        categoryBtn.classList.add('active');
                        const section = document.getElementById(sectionId) || document.getElementById(sub);
                        if (section) {
                            section.classList.add('active');
                        }
                    }
                }

                setTimeout(() => {
                    const cards = document.querySelectorAll('.horizontal-card');
                    let targetCard = null;
                    for (const card of cards) {
                        const titleEl = card.querySelector('.horizontal-title');
                        if (titleEl && titleEl.textContent.trim().toLowerCase() === name.toLowerCase()) {
                            targetCard = card;
                            break;
                        }
                    }
                    
                    if (targetCard) {
                        // Rola até o card correspondente de forma suave e centralizada
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Aplica borda de destaque e sombra temporária premium (pulso laranja)
                        targetCard.style.outline = '3px solid var(--accent)';
                        targetCard.style.boxShadow = '0 0 25px rgba(242, 92, 5, 0.7)';
                        targetCard.style.transform = 'scale(1.03)';
                        targetCard.style.transition = 'outline 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease';
                        
                        setTimeout(() => {
                            targetCard.style.outline = '';
                            targetCard.style.boxShadow = '';
                            targetCard.style.transform = '';
                        }, 3500);
                    }
                }, 200); // Pequeno delay para garantir renderização e troca de aba
            };

            const urlParams = new URLSearchParams(window.location.search);
            const highlightName = urlParams.get('highlight');
            if (highlightName) {
                window.highlightProduct(highlightName);
            }
            
        } catch (err) {
            console.error(`Erro ao carregar produtos dinâmicos da categoria ${category}:`, err);
        }
    });
})();
