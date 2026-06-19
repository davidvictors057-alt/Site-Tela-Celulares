// admin.js - Administrative Dashboard Controller

// Biblioteca de Diálogos Premium Customizados
window.alert = function(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'premium-dialog-overlay';
        
        const card = document.createElement('div');
        card.className = 'premium-dialog-card';
        
        card.innerHTML = `
            <div class="premium-dialog-icon alert">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 16 12 12"></polyline>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </div>
            <div class="premium-dialog-message">${message.replace(/\n/g, '<br>')}</div>
            <div class="premium-dialog-actions">
                <button class="premium-dialog-btn ok">OK</button>
            </div>
        `;
        
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        
        // Ativa animação de entrada
        setTimeout(() => {
            overlay.classList.add('active');
            card.classList.add('active');
        }, 10);
        
        const btnOk = card.querySelector('.premium-dialog-btn.ok');
        btnOk.focus();
        
        const closeAlert = () => {
            overlay.classList.remove('active');
            card.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                resolve();
            }, 200);
        };
        
        btnOk.addEventListener('click', closeAlert);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeAlert();
        });
    });
};

window.confirm = function(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'premium-dialog-overlay';
        
        const card = document.createElement('div');
        card.className = 'premium-dialog-card';
        
        card.innerHTML = `
            <div class="premium-dialog-icon confirm">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ffc915" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            </div>
            <div class="premium-dialog-message">${message.replace(/\n/g, '<br>')}</div>
            <div class="premium-dialog-actions confirm-layout">
                <button class="premium-dialog-btn cancel">Cancelar</button>
                <button class="premium-dialog-btn confirm-ok">Confirmar</button>
            </div>
        `;
        
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        
        // Ativa animação de entrada
        setTimeout(() => {
            overlay.classList.add('active');
            card.classList.add('active');
        }, 10);
        
        const btnCancel = card.querySelector('.premium-dialog-btn.cancel');
        const btnConfirm = card.querySelector('.premium-dialog-btn.confirm-ok');
        btnConfirm.focus();
        
        const handleAction = (value) => {
            overlay.classList.remove('active');
            card.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                resolve(value);
            }, 200);
        };
        
        btnCancel.addEventListener('click', () => handleAction(false));
        btnConfirm.addEventListener('click', () => handleAction(true));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) handleAction(false);
        });
    });
};


const supabaseUrl = 'https://hoceltmynggfpdyyvdmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvY2VsdG15bmdnZnBkeXl2ZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2Mjk0OTksImV4cCI6MjA5NzIwNTQ5OX0.Smt5T1v7dzSMEeM05Iyj9itgpYSwPmkfCKm5pZXzIzQ';

let supabaseClient = null;
try {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
    } else {
        console.error('Biblioteca cliente do Supabase não encontrada no escopo global (window.supabase).');
    }
} catch (e) {
    console.error('Falha ao inicializar o cliente Supabase:', e);
}

let currentSession = null;
let processedImageBlob = null;
let processedImageName = '';
let processedCarouselBlob = null;
let processedCarouselName = '';
let processedNewLaunchBlob = null;
let processedNewLaunchName = '';
let isEditing = false;
let productsList = [];

const defaultProducts = [
    {
        name: "Realme Note 70",
        description: "Dimensity 6080 & Carga 33W",
        price: 1299.00,
        original_price: 1599.00,
        category: "celulares",
        sub_category: "realme",
        image_url: "public/carousel/realme_note70.png",
        specs: { storage: "256GB", ram: "8GB", colors: ["Preto", "Azul"] },
        is_best_seller: true
    },
    {
        name: "Realme Note 60",
        description: "Processador Unisoc T612",
        price: 999.00,
        original_price: 1299.00,
        category: "celulares",
        sub_category: "realme",
        image_url: "public/carousel/realme_note60_best_seller.png",
        specs: { storage: "128GB", ram: "4GB", colors: ["Preto", "Azul"] },
        is_best_seller: true
    },
    {
        name: "Realme C85",
        description: "Bateria Titan de 7000mAh",
        price: 1970.00,
        original_price: 2499.00,
        category: "celulares",
        sub_category: "realme",
        image_url: "public/carousel/realme_c85_best_seller.png",
        specs: { storage: "256GB", ram: "8GB", colors: ["Dourado", "Preto"] },
        is_best_seller: true
    },
    {
        name: "Realme 14 5G",
        description: "AMOLED 120Hz & Dimensity 7050",
        price: 2390.00,
        original_price: 2899.00,
        category: "celulares",
        sub_category: "realme",
        image_url: "public/Cell/Realme 14 5G.webp",
        specs: { storage: "512GB", ram: "12GB", colors: ["Preto", "Prata"] },
        is_best_seller: true
    },
    {
        name: "Realme C100i",
        description: "Helio G85 & Bateria 5000mAh",
        price: 1459.00,
        original_price: 1799.00,
        category: "celulares",
        sub_category: "realme",
        image_url: "public/Cell/Realme C100i.png",
        specs: { storage: "128GB", ram: "4GB", colors: ["Preto", "Azul"] },
        is_best_seller: true
    },
    {
        name: "Realme C71",
        description: "Bateria 6000mAh & Helio G85",
        price: 1285.00,
        original_price: 1599.00,
        category: "celulares",
        sub_category: "realme",
        image_url: "public/Cell/realme-C71.jpg",
        specs: { storage: "128GB", ram: "4GB", colors: ["Preto", "Verde"] },
        is_best_seller: true
    },
    {
        name: "Redmi 15C",
        description: "Processador Helio G85 & 256GB",
        price: 1549.00,
        original_price: 1899.00,
        category: "celulares",
        sub_category: "xiaomi",
        image_url: "public/Cell/redmi 15c.webp",
        specs: { storage: "256GB", ram: "8GB", colors: ["Preto", "Verde", "Azul"] },
        is_best_seller: true
    },
    {
        name: "Poco X8 Pro",
        description: "Dimensity 8300-Ultra & 512GB",
        price: 3230.00,
        original_price: 3899.00,
        category: "celulares",
        sub_category: "xiaomi",
        image_url: "public/Cell/Poco x8 pro.png",
        specs: { storage: "512GB", ram: "12GB", colors: ["Preto", "Cinza"] },
        is_best_seller: true
    },
    {
        name: "Positivo P51",
        description: "Formato Flip & Botão SOS",
        price: 350.00,
        original_price: 499.00,
        category: "celulares",
        sub_category: "entrada",
        image_url: "public/Cell/Positivo P51.webp",
        specs: { storage: null, ram: null, colors: ["Preto"] },
        is_best_seller: true
    }
];

// Função principal de inicialização do painel administrativo
async function initAdmin() {
    // Configura formulário e upload de imagem primeiro (ações locais)
    setupForm();
    setupImageProcessor();
    
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (supabaseClient) {
                try {
                    await supabaseClient.auth.signOut();
                } catch (e) {
                    console.error('Erro ao deslogar:', e);
                }
            }
            window.location.href = 'index.html';
        });
    }

    const importBtn = document.getElementById('btn-import-defaults');
    if (importBtn) {
        importBtn.addEventListener('click', syncAllProductsFromHTML);
    }

    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = productsList.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query) || 
                (p.description && p.description.toLowerCase().includes(query))
            );
            displayProductsList(filtered);
        });
    }

    // Se o supabase não pôde ser inicializado, exibe o aviso na tabela e encerra fluxo assíncrono
    if (!supabaseClient) {
        const tableBody = document.getElementById('products-table-body');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="admin-no-products" style="color: #d9534f; font-weight: 600;">
                        Erro: Não foi possível conectar ao Supabase (Script do CDN falhou).<br>
                        <span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted);">Verifique se você possui conexão com a internet e recarregue a página.</span>
                    </td>
                </tr>
            `;
        }
        return;
    }

    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error || !session) {
            window.location.href = 'index.html';
            return;
        }
        
        currentSession = session;
        
        // Carrega produtos cadastrados do Supabase
        loadProducts();
    } catch (err) {
        console.error('Erro durante validação da sessão ou carregamento inicial:', err);
        const tableBody = document.getElementById('products-table-body');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="admin-no-products" style="color: #d9534f;">
                        Erro na conexão com o banco de dados: ${err.message}
                    </td>
                </tr>
            `;
        }
    }
}

// Garante que o painel inicialize independente do estado de carregamento do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
} else {
    initAdmin();
}

// Carrega a tabela de produtos cadastrados do Supabase
async function loadProducts() {
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;
    
    if (!supabaseClient) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="admin-no-products" style="color: #d9534f;">
                    Erro: Supabase não inicializado. Verifique a conexão.
                </td>
            </tr>
        `;
        return;
    }
    
    try {
        const { data: products, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        productsList = products;
        
        // Limpa o input de busca ao carregar a lista geral
        const searchInput = document.getElementById('admin-search-input');
        if (searchInput) searchInput.value = '';
        
        displayProductsList(productsList);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        tableBody.innerHTML = `<tr><td colspan="4" class="admin-no-products" style="color: #d9534f;">Erro ao buscar produtos: ${err.message}</td></tr>`;
    }
}

// Renderiza a lista de produtos passada no escopo da tabela
function displayProductsList(products) {
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="admin-no-products">Nenhum produto encontrado.</td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        // Thumbnail do produto
        const imageSrc = product.image_url || 'public/carousel/realme_c85.png';
        
        row.innerHTML = `
            <td>
                <div class="admin-product-item">
                    <div class="admin-product-thumb">
                        <img src="${imageSrc}" alt="${product.name}">
                    </div>
                    <div class="admin-product-info">
                        <span class="admin-product-name">${product.name}</span>
                        <span class="admin-product-category">${product.category}</span>
                    </div>
                </div>
            </td>
            <td>
                <span class="admin-product-price">R$ ${parseFloat(product.price).toFixed(2)}</span>
            </td>
            <td>
                ${product.is_best_seller ? '<span class="admin-best-seller-badge">Sim</span>' : 'Não'}
            </td>
            <td>
                <div class="admin-actions-cell">
                    <button class="btn-admin-action edit" onclick="startEditProduct('${product.id}')" title="Editar">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-admin-action delete" onclick="deleteProduct('${product.id}', '${product.image_url}')" title="Excluir">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Configura a exibição dinâmica de campos de imagens de acordo com os checkboxes
function toggleConditionalImageFields() {
    const bestSellerCheckbox = document.getElementById('prod-best-seller');
    const newLaunchCheckbox = document.getElementById('prod-new-launch');
    const carouselGroup = document.getElementById('carousel-image-group');
    const newLaunchGroup = document.getElementById('new-launch-image-group');

    if (bestSellerCheckbox && carouselGroup) {
        carouselGroup.style.display = bestSellerCheckbox.checked ? 'block' : 'none';
    }
    if (newLaunchCheckbox && newLaunchGroup) {
        newLaunchGroup.style.display = newLaunchCheckbox.checked ? 'block' : 'none';
    }
}

// Configura os processadores de foto genéricos via Canvas
function setupGenericImageProcessor(inputEl, previewPanel, previewImg, statusBadge, sizeInfo, options) {
    if (!inputEl) return;
    
    inputEl.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (previewPanel) previewPanel.style.display = 'block';
        if (statusBadge) {
            statusBadge.innerText = 'Processando...';
            statusBadge.className = 'status-badge-processing';
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Dimensão inicial: 650px para catálogo (leve), 1200px para carrossel/destaque (qualidade maior)
                const initialDim = options.removeBackground ? 650 : 1200;
                processGenericImage(img, initialDim, file.name);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    function processGenericImage(img, maxDim, filename) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxDim) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
            }
        } else {
            if (height > maxDim) {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Se a remoção de fundo estiver ativada
        if (options.removeBackground) {
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                if (r > 240 && g > 240 && b > 240) {
                    data[i+3] = 0; // Transparência
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }
        
        canvas.toBlob((blob) => {
            const sizeKB = blob.size / 1024;
            const limit = options.limitKB || 200;
            
            if (sizeKB > limit && maxDim > 350) {
                console.log(`Tamanho (${sizeKB.toFixed(1)} KB) excede limite (${limit} KB). Reprocessando com menor dimensão...`);
                processGenericImage(img, maxDim - 50, filename);
                return;
            }
            
            const dotIdx = filename.lastIndexOf('.');
            const nameWithoutExt = dotIdx !== -1 ? filename.substring(0, dotIdx) : filename;
            const finalName = `${Date.now()}_${options.prefix}_${nameWithoutExt}.png`;
            
            options.onComplete(blob, finalName);
            
            if (previewImg) previewImg.src = URL.createObjectURL(blob);
            if (sizeInfo) sizeInfo.innerText = `Tamanho: ${sizeKB.toFixed(1)} KB`;
            if (statusBadge) {
                statusBadge.innerText = 'Pronto!';
                statusBadge.className = 'status-badge-processing done';
            }
        }, 'image/png');
    }
}

function setupImageProcessor() {
    // 1. Processador de Imagem do Catálogo (Remove fundo, limite 200KB)
    setupGenericImageProcessor(
        document.getElementById('prod-image-file'),
        document.getElementById('preview-panel'),
        document.getElementById('preview-img-tag'),
        document.getElementById('processing-status-badge'),
        document.getElementById('processing-size-info'),
        {
            removeBackground: true,
            limitKB: 200,
            prefix: 'catalog',
            onComplete: (blob, filename) => {
                processedImageBlob = blob;
                processedImageName = filename;
            }
        }
    );

    // 2. Processador de Imagem do Carrossel (Mantém fundo, limite 500KB)
    setupGenericImageProcessor(
        document.getElementById('prod-carousel-image-file'),
        document.getElementById('carousel-preview-panel'),
        document.getElementById('carousel-preview-img-tag'),
        document.getElementById('carousel-status-badge'),
        document.getElementById('carousel-size-info'),
        {
            removeBackground: false,
            limitKB: 500,
            prefix: 'carousel',
            onComplete: (blob, filename) => {
                processedCarouselBlob = blob;
                processedCarouselName = filename;
            }
        }
    );

    // 3. Processador de Imagem de Novos Lançamentos (Mantém fundo, limite 500KB)
    setupGenericImageProcessor(
        document.getElementById('prod-new-launch-image-file'),
        document.getElementById('new-launch-preview-panel'),
        document.getElementById('new-launch-preview-img-tag'),
        document.getElementById('new-launch-status-badge'),
        document.getElementById('new-launch-size-info'),
        {
            removeBackground: false,
            limitKB: 500,
            prefix: 'newlaunch',
            onComplete: (blob, filename) => {
                processedNewLaunchBlob = blob;
                processedNewLaunchName = filename;
            }
        }
    );

    // 4. Configura ouvintes dos checkboxes de exibição para mostrar/ocultar os campos de arquivos correspondentes
    const bestSellerCheckbox = document.getElementById('prod-best-seller');
    const newLaunchCheckbox = document.getElementById('prod-new-launch');
    if (bestSellerCheckbox) bestSellerCheckbox.addEventListener('change', toggleConditionalImageFields);
    if (newLaunchCheckbox) newLaunchCheckbox.addEventListener('change', toggleConditionalImageFields);
}

// Variáveis e funções para controle das tags dinâmicas no cadastro
let activeVariations = [];
let activeColors = []; // [{ hex: "#000000", name: "Preto" }]

function renderVariations() {
    const container = document.getElementById('variations-container');
    if (!container) return;
    container.innerHTML = '';
    
    activeVariations.forEach((val, idx) => {
        const tag = document.createElement('div');
        tag.className = 'admin-tag-item';
        tag.innerHTML = `
            <span>${val}</span>
            <button type="button" class="admin-tag-remove-btn" onclick="removeVariation(${idx})">&times;</button>
        `;
        container.appendChild(tag);
    });
}

window.removeVariation = function(index) {
    activeVariations.splice(index, 1);
    renderVariations();
};

function renderColors() {
    const container = document.getElementById('colors-container');
    if (!container) return;
    container.innerHTML = '';
    
    activeColors.forEach((color, idx) => {
        const tag = document.createElement('div');
        tag.className = 'admin-color-tag-item';
        tag.innerHTML = `
            <span class="admin-color-dot-preview" style="background-color: ${color.hex};"></span>
            <span>${color.name}</span>
            <button type="button" class="admin-tag-remove-btn" onclick="removeColor(${idx})">&times;</button>
        `;
        container.appendChild(tag);
    });
}

window.removeColor = function(index) {
    activeColors.splice(index, 1);
    renderColors();
};

// Configura o envio do formulário de criação/edição
function setupForm() {
    const form = document.getElementById('admin-product-form');
    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    
    if (!form) return;

    // Configura os botões de adicionar características dinâmicas
    const btnAddVariation = document.getElementById('btn-add-variation');
    const variationInput = document.getElementById('variation-input');
    if (btnAddVariation && variationInput) {
        btnAddVariation.onclick = () => {
            const val = variationInput.value.trim();
            if (val && !activeVariations.includes(val)) {
                activeVariations.push(val);
                variationInput.value = '';
                renderVariations();
            }
        };
        variationInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                btnAddVariation.click();
            }
        };
    }

    const btnAddColor = document.getElementById('btn-add-color');
    const colorPicker = document.getElementById('color-picker');
    const colorNameInput = document.getElementById('color-name-input');
    if (btnAddColor && colorPicker && colorNameInput) {
        btnAddColor.onclick = () => {
            const hex = colorPicker.value;
            const name = colorNameInput.value.trim();
            if (name) {
                if (!activeColors.some(c => c.name.toLowerCase() === name.toLowerCase())) {
                    activeColors.push({ hex, name });
                    colorNameInput.value = '';
                    renderColors();
                } else {
                    alert('Já existe uma cor com este nome cadastrada.');
                }
            } else {
                alert('Por favor, informe o nome para a cor.');
            }
        };
        colorNameInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                btnAddColor.click();
            }
        };
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const saveBtn = document.getElementById('btn-save-product');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerText = 'Salvando produto...';
        }
        
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('prod-name').value.trim();
        const category = document.getElementById('prod-category').value;
        const sub_category = document.getElementById('prod-subcategory').value || null;
        const description = document.getElementById('prod-desc').value.trim();
        const price = parseFloat(document.getElementById('prod-price').value);
        const original_price_val = document.getElementById('prod-original-price').value;
        const original_price = original_price_val ? parseFloat(original_price_val) : null;
        
        const is_best_seller = document.getElementById('prod-best-seller').checked;
        const is_new_launch = document.getElementById('prod-new-launch').checked;
        
        try {
            let imageUrl = null;
            let carouselImageUrl = null;
            let newLaunchImageUrl = null;
            
            // 1. Upload da foto do catálogo
            if (processedImageBlob) {
                const { data: uploadData, error: uploadError } = await supabaseClient.storage
                     .from('product-images')
                     .upload(processedImageName, processedImageBlob, {
                         contentType: 'image/png',
                         cacheControl: '3600'
                     });
                     
                if (uploadError) throw uploadError;
                
                const { data: publicUrlData } = supabaseClient.storage
                    .from('product-images')
                    .getPublicUrl(processedImageName);
                    
                imageUrl = publicUrlData.publicUrl;
            } else if (isEditing) {
                const product = productsList.find(p => p.id === id);
                if (product) imageUrl = product.image_url;
            }

            // 2. Upload da foto do carrossel (Mais Vendidos)
            if (is_best_seller && processedCarouselBlob) {
                const { data: uploadData, error: uploadError } = await supabaseClient.storage
                     .from('product-images')
                     .upload(processedCarouselName, processedCarouselBlob, {
                         contentType: 'image/png',
                         cacheControl: '3600'
                     });
                     
                if (uploadError) throw uploadError;
                
                const { data: publicUrlData } = supabaseClient.storage
                    .from('product-images')
                    .getPublicUrl(processedCarouselName);
                    
                carouselImageUrl = publicUrlData.publicUrl;
            } else if (isEditing) {
                const product = productsList.find(p => p.id === id);
                if (product && product.specs) {
                    carouselImageUrl = product.specs.carousel_image_url || null;
                }
            }

            // 3. Upload da foto de Novos Lançamentos
            if (is_new_launch && processedNewLaunchBlob) {
                const { data: uploadData, error: uploadError } = await supabaseClient.storage
                     .from('product-images')
                     .upload(processedNewLaunchName, processedNewLaunchBlob, {
                         contentType: 'image/png',
                         cacheControl: '3600'
                     });
                     
                if (uploadError) throw uploadError;
                
                const { data: publicUrlData } = supabaseClient.storage
                    .from('product-images')
                    .getPublicUrl(processedNewLaunchName);
                    
                newLaunchImageUrl = publicUrlData.publicUrl;
            } else if (isEditing) {
                const product = productsList.find(p => p.id === id);
                if (product && product.specs) {
                    newLaunchImageUrl = product.specs.new_launch_image_url || null;
                }
            }

            // Coleta JSON de especificações dinâmicas incluindo as novas URLs
            const specs = {
                storage: activeVariations.length > 0 ? activeVariations : null,
                colors: activeColors.length > 0 ? activeColors : null,
                carousel_image_url: is_best_seller ? carouselImageUrl : null,
                new_launch_image_url: is_new_launch ? newLaunchImageUrl : null
            };
            
            const productData = {
                name,
                category,
                sub_category,
                description,
                price,
                original_price,
                specs,
                is_best_seller,
                is_new_launch,
                ...(imageUrl && { image_url: imageUrl })
            };
            
            let queryError;
            
            if (isEditing) {
                const { error } = await supabaseClient
                    .from('products')
                    .update(productData)
                    .eq('id', id);
                queryError = error;
            } else {
                const { error } = await supabaseClient
                    .from('products')
                    .insert([productData]);
                queryError = error;
            }
            
            if (queryError) throw queryError;
            
            alert(isEditing ? 'Produto editado com sucesso!' : 'Produto cadastrado com sucesso!');
            
            // Limpa formulário e recarrega lista
            resetForm();
            loadProducts();
            
        } catch (err) {
            console.error('Erro ao salvar produto:', err);
            alert(`Erro ao salvar produto: ${err.message}`);
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerText = isEditing ? 'Salvar Alterações' : 'Cadastrar Produto';
            }
        }
    });
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            resetForm();
        });
    }
}

// Inicia fluxo de edição (preenche os campos do formulário)
window.startEditProduct = function(id) {
    const product = productsList.find(p => p.id === id);
    if (!product) return;
    
    isEditing = true;
    
    document.getElementById('form-title').innerText = 'Editar Produto';
    document.getElementById('btn-save-product').innerText = 'Salvar Alterações';
    document.getElementById('btn-cancel-edit').style.display = 'block';
    
    // Atualiza texto da aba
    const formBtn = document.getElementById('tab-btn-form');
    if (formBtn) formBtn.innerText = 'Editar Produto';
    
    // Alterna para a aba do formulário
    switchTab('form');
    
    document.getElementById('product-id').value = product.id;
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-category').value = product.category;
    document.getElementById('prod-subcategory').value = product.sub_category || '';
    document.getElementById('prod-desc').value = product.description || '';
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-original-price').value = product.original_price || '';
    document.getElementById('prod-best-seller').checked = product.is_best_seller;
    document.getElementById('prod-new-launch').checked = product.is_new_launch || false;
    
    // Carrega especificações dinamicamente
    const specs = product.specs || {};
    activeVariations = Array.isArray(specs.storage) ? specs.storage : (specs.storage ? [specs.storage] : []);
    activeColors = Array.isArray(specs.colors) ? specs.colors : [];
    
    // Caso colors seja uma string (formato legado), faz a conversão
    if (typeof specs.colors === 'string') {
        activeColors = specs.colors.split(',').map(c => c.trim()).filter(c => c !== '').map(c => ({ hex: '#000000', name: c }));
    }
    
    renderVariations();
    renderColors();
    
    // Garante que a visibilidade dos campos de imagens opcionais esteja em sincronia
    toggleConditionalImageFields();

    // 1. Imagem de catálogo anterior
    const previewPanel = document.getElementById('preview-panel');
    const previewImg = document.getElementById('preview-img-tag');
    const sizeInfo = document.getElementById('processing-size-info');
    const statusBadge = document.getElementById('processing-status-badge');
    
    if (previewPanel && product.image_url) {
        previewPanel.style.display = 'block';
        if (previewImg) previewImg.src = product.image_url;
        if (sizeInfo) sizeInfo.innerText = 'Foto atual cadastrada';
        if (statusBadge) {
            statusBadge.innerText = 'Salva no Banco';
            statusBadge.className = 'status-badge-processing done';
        }
    } else if (previewPanel) {
        previewPanel.style.display = 'none';
        if (previewImg) previewImg.src = '';
    }

    // 2. Imagem de carrossel anterior
    const carouselPreviewPanel = document.getElementById('carousel-preview-panel');
    const carouselPreviewImg = document.getElementById('carousel-preview-img-tag');
    const carouselSizeInfo = document.getElementById('carousel-size-info');
    const carouselStatusBadge = document.getElementById('carousel-status-badge');
    const carouselImgUrl = specs.carousel_image_url;

    if (carouselPreviewPanel && carouselImgUrl) {
        carouselPreviewPanel.style.display = 'block';
        if (carouselPreviewImg) carouselPreviewImg.src = carouselImgUrl;
        if (carouselSizeInfo) carouselSizeInfo.innerText = 'Foto de Carrossel atual';
        if (carouselStatusBadge) {
            carouselStatusBadge.innerText = 'Salva no Banco';
            carouselStatusBadge.className = 'status-badge-processing done';
        }
    } else if (carouselPreviewPanel) {
        carouselPreviewPanel.style.display = 'none';
        if (carouselPreviewImg) carouselPreviewImg.src = '';
    }

    // 3. Imagem de novo lançamento anterior
    const newLaunchPreviewPanel = document.getElementById('new-launch-preview-panel');
    const newLaunchPreviewImg = document.getElementById('new-launch-preview-img-tag');
    const newLaunchSizeInfo = document.getElementById('new-launch-size-info');
    const newLaunchStatusBadge = document.getElementById('new-launch-status-badge');
    const newLaunchImgUrl = specs.new_launch_image_url;

    if (newLaunchPreviewPanel && newLaunchImgUrl) {
        newLaunchPreviewPanel.style.display = 'block';
        if (newLaunchPreviewImg) newLaunchPreviewImg.src = newLaunchImgUrl;
        if (newLaunchSizeInfo) newLaunchSizeInfo.innerText = 'Foto de Lançamento atual';
        if (newLaunchStatusBadge) {
            newLaunchStatusBadge.innerText = 'Salva no Banco';
            newLaunchStatusBadge.className = 'status-badge-processing done';
        }
    } else if (newLaunchPreviewPanel) {
        newLaunchPreviewPanel.style.display = 'none';
        if (newLaunchPreviewImg) newLaunchPreviewImg.src = '';
    }
    
    // Sobe a tela e foca no input
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        const nameInput = document.getElementById('prod-name');
        if (nameInput) nameInput.focus();
    }, 200);
};

// Exclui um produto do banco e opcionalmente a foto do bucket
window.deleteProduct = async function(id, imageUrl) {
    if (!await confirm('Tem certeza que deseja excluir permanentemente este produto?')) return;
    
    try {
        // Deleta registro na tabela
        const { error } = await supabaseClient
            .from('products')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        
        // Deleta imagem no Storage Bucket (opcional, extrai caminho do arquivo da URL)
        if (imageUrl) {
            const bucketPathIdx = imageUrl.indexOf('/product-images/');
            if (bucketPathIdx !== -1) {
                const fileName = imageUrl.substring(bucketPathIdx + '/product-images/'.length);
                await supabaseClient.storage
                    .from('product-images')
                    .remove([fileName]);
            }
        }
        
        alert('Produto excluído com sucesso!');
        loadProducts();
    } catch (err) {
        console.error('Erro ao excluir produto:', err);
        alert(`Erro ao excluir produto: ${err.message}`);
    }
};

// Reseta formulário para o estado inicial e volta para a aba de lista
function resetForm() {
    isEditing = false;
    processedImageBlob = null;
    processedImageName = '';
    processedCarouselBlob = null;
    processedCarouselName = '';
    processedNewLaunchBlob = null;
    processedNewLaunchName = '';
    
    document.getElementById('form-title').innerText = 'Cadastrar Novo Produto';
    document.getElementById('btn-save-product').innerText = 'Cadastrar Produto';
    document.getElementById('btn-cancel-edit').style.display = 'none';
    
    const formBtn = document.getElementById('tab-btn-form');
    if (formBtn) formBtn.innerText = 'Cadastrar Novo Produto';
    
    document.getElementById('admin-product-form').reset();
    document.getElementById('product-id').value = '';
    
    const previewPanel = document.getElementById('preview-panel');
    if (previewPanel) previewPanel.style.display = 'none';
    
    const carouselPreviewPanel = document.getElementById('carousel-preview-panel');
    if (carouselPreviewPanel) carouselPreviewPanel.style.display = 'none';
    
    const newLaunchPreviewPanel = document.getElementById('new-launch-preview-panel');
    if (newLaunchPreviewPanel) newLaunchPreviewPanel.style.display = 'none';
    
    // Oculta os campos condicionais
    toggleConditionalImageFields();
    
    activeVariations = [];
    activeColors = [];
    renderVariations();
    renderColors();
    
    switchTab('list');
}

// Alterna entre abas de Gerenciamento e Cadastro/Edição
window.switchTab = function(tabName) {
    const listBtn = document.getElementById('tab-btn-list');
    const formBtn = document.getElementById('tab-btn-form');
    const listContent = document.getElementById('tab-list');
    const formContent = document.getElementById('tab-form');

    if (!listBtn || !formBtn || !listContent || !formContent) return;

    if (tabName === 'list') {
        listBtn.classList.add('active');
        formBtn.classList.remove('active');
        listContent.classList.add('active');
        formContent.classList.remove('active');
    } else {
        formBtn.classList.add('active');
        listBtn.classList.remove('active');
        formContent.classList.add('active');
        listContent.classList.remove('active');
    }
};

// Função de sincronização inteligente de produtos a partir das páginas HTML locais
async function syncAllProductsFromHTML() {
    const importBtn = document.getElementById('btn-import-defaults');
    if (!supabaseClient) {
        alert('Erro: Supabase não está inicializado.');
        return;
    }
    if (!await confirm('Deseja sincronizar todos os produtos das páginas HTML locais com o banco de dados? Os produtos existentes serão atualizados e novos serão inseridos de forma limpa.')) return;
    
    importBtn.disabled = true;
    importBtn.innerText = 'Sincronizando...';
    
    const pages = [
        { name: 'celulares.html', defaultCategory: 'celulares' },
        { name: 'tablets.html', defaultCategory: 'tablets' },
        { name: 'baterias.html', defaultCategory: 'baterias' },
        { name: 'audio.html', defaultCategory: 'audio' },
        { name: 'acessorios.html', defaultCategory: 'acessorios' },
        { name: 'informatica.html', defaultCategory: 'informatica' }
    ];
    
    let allExtractedProducts = [];
    
    try {
        for (const page of pages) {
            console.log(`Buscando conteúdo de: ${page.name}`);
            const response = await fetch(page.name);
            if (!response.ok) {
                console.warn(`Página não encontrada ou inacessível: ${page.name}`);
                continue;
            }
            const htmlText = await response.text();
            const doc = new DOMParser().parseFromString(htmlText, 'text/html');
            
            const cards = doc.querySelectorAll('.horizontal-card');
            console.log(`Encontrados ${cards.length} produtos em ${page.name}`);
            
            cards.forEach(card => {
                const titleEl = card.querySelector('.horizontal-title');
                if (!titleEl) return;
                const name = titleEl.textContent.trim();
                
                // Extração e tratamento do preço
                const priceEl = card.querySelector('.horizontal-price');
                let price = 0;
                if (priceEl) {
                    const priceText = priceEl.textContent.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
                    price = parseFloat(priceText) || 0;
                }
                
                // Extração e tratamento de descrição / specs
                const specsList = card.querySelectorAll('.spec-list li');
                let description = '';
                if (specsList.length > 0) {
                    description = Array.from(specsList).map(li => li.textContent.trim()).join(' • ');
                } else {
                    const taglineEl = card.querySelector('.horizontal-tagline');
                    if (taglineEl) description = taglineEl.textContent.trim();
                }
                
                // Identificação de subcategoria a partir do ID da seção
                const sectionParent = card.closest('section');
                let sub_category = null;
                if (sectionParent && sectionParent.id) {
                    sub_category = sectionParent.id;
                    // Normalização simples das subcategorias
                    if (sub_category === 'xiaomi-tablets') sub_category = 'xiaomi';
                    if (sub_category === 'amazon-fire') sub_category = 'entrada';
                }
                
                // Cores disponíveis
                const colorDots = card.querySelectorAll('.color-dot');
                let colors = [];
                colorDots.forEach(dot => {
                    const cName = dot.getAttribute('title') || 'Cor';
                    const hex = dot.style.backgroundColor || '#000000';
                    colors.push({ hex, name: cName });
                });
                
                // Capacidades/Variações
                const storageBadges = card.querySelectorAll('.storage-badge');
                let storage = [];
                storageBadges.forEach(badge => {
                    storage.push(badge.textContent.trim());
                });
                
                // Caminho da imagem no HTML
                const imgEl = card.querySelector('.horizontal-image-container img');
                let image_url = null;
                if (imgEl) {
                    const src = imgEl.getAttribute('src');
                    if (src) image_url = src;
                }
                
                allExtractedProducts.push({
                    name,
                    price,
                    original_price: null,
                    description,
                    category: page.defaultCategory,
                    sub_category,
                    image_url,
                    specs: {
                        storage: storage.length > 0 ? storage : null,
                        colors: colors.length > 0 ? colors : null
                    },
                    is_best_seller: false,
                    is_new_launch: false
                });
            });
        }
        
        if (allExtractedProducts.length === 0) {
            alert('Não foi possível extrair nenhum produto das páginas locais.');
            return;
        }
        
        // Puxa produtos atuais do Supabase
        const { data: dbProducts, error: selectError } = await supabaseClient
            .from('products')
            .select('id, name, image_url');
            
        if (selectError) throw selectError;
        
        let insertedCount = 0;
        let updatedCount = 0;
        
        for (const extProduct of allExtractedProducts) {
            // Unificação pelo nome (case insensitive e sem espaços extras nas pontas)
            const match = dbProducts.find(p => p.name.toLowerCase().trim() === extProduct.name.toLowerCase().trim());
            
            if (match) {
                // Se o produto já possui uma imagem customizada vinda do Supabase Storage (/product-images/), preservamos ela.
                // Caso contrário, se o HTML trouxer uma imagem válida que não seja placeholder, usamos ela.
                const isSupabaseImage = match.image_url && match.image_url.includes('/product-images/');
                const finalImgUrl = isSupabaseImage 
                    ? match.image_url 
                    : ((extProduct.image_url && !extProduct.image_url.includes('placeholder')) ? extProduct.image_url : (match.image_url || extProduct.image_url));
                
                const { error: updateError } = await supabaseClient
                    .from('products')
                    .update({
                        price: extProduct.price,
                        description: extProduct.description,
                        category: extProduct.category,
                        sub_category: extProduct.sub_category,
                        image_url: finalImgUrl,
                        specs: extProduct.specs
                    })
                    .eq('id', match.id);
                    
                if (updateError) {
                    console.error(`Erro ao atualizar ${extProduct.name}:`, updateError);
                } else {
                    updatedCount++;
                }
            } else {
                // Insere novo
                const { error: insertError } = await supabaseClient
                    .from('products')
                    .insert([extProduct]);
                    
                if (insertError) {
                    console.error(`Erro ao inserir ${extProduct.name}:`, insertError);
                } else {
                    insertedCount++;
                }
            }
        }
        
        alert(`Sincronização concluída com sucesso!\n\nProdutos novos inseridos: ${insertedCount}\nProdutos existentes atualizados: ${updatedCount}`);
        loadProducts();
    } catch (err) {
        console.error('Erro geral durante a sincronização:', err);
        alert(`Erro na sincronização: ${err.message}`);
    } finally {
        importBtn.disabled = false;
        importBtn.innerText = 'Sincronizar com o Banco de Dados';
    }
}
