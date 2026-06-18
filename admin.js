// admin.js - Administrative Dashboard Controller

const supabaseUrl = 'https://hoceltmynggfpdyyvdmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvY2VsdG15bmdnZnBkeXl2ZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2Mjk0OTksImV4cCI6MjA5NzIwNTQ5OX0.Smt5T1v7dzSMEeM05Iyj9itgpYSwPmkfCKm5pZXzIzQ';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let currentSession = null;
let processedImageBlob = null;
let processedImageName = '';
let isEditing = false;
let productsList = [];

// Inicia verificação de sessão
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
        window.location.href = 'index.html';
        return;
    }
    
    currentSession = session;
    
    // Carrega produtos cadastrados
    loadProducts();
    
    // Configura formulário e upload de imagem
    setupForm();
    setupImageProcessor();
    
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.href = 'index.html';
        });
    }
});

// Carrega a tabela de produtos cadastrados
async function loadProducts() {
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;
    
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        
        productsList = products;
        tableBody.innerHTML = '';
        
        if (products.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="admin-no-products">Nenhum produto cadastrado no momento.</td>
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
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        tableBody.innerHTML = `<tr><td colspan="4" class="admin-no-products" style="color: #d9534f;">Erro ao buscar produtos: ${err.message}</td></tr>`;
    }
}

// Configura o extrator de fundo e compressão da foto via Canvas
function setupImageProcessor() {
    const fileInput = document.getElementById('prod-image-file');
    const previewPanel = document.getElementById('preview-panel');
    const previewImg = document.getElementById('preview-img-tag');
    const statusBadge = document.getElementById('processing-status-badge');
    const sizeInfo = document.getElementById('processing-size-info');
    
    if (!fileInput) return;
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Exibe o painel de preview
        if (previewPanel) previewPanel.style.display = 'block';
        if (statusBadge) {
            statusBadge.innerText = 'Processando...';
            statusBadge.className = 'status-badge-processing';
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Inicia processamento recursivo para enquadrar na qualidade de 200KB
                processImage(img, 650, file.name);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    // Função interna recursiva para redimensionamento e transparência de pixels
    function processImage(img, maxDim, filename) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calcula novas dimensões mantendo a proporção
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
        
        // Desenha a imagem no Canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // EXTRAÇÃO DE FUNDO BRANCO: Varre e transforma pixels brancos em transparentes
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Se o pixel for muito próximo do branco (RGB > 240)
            if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0; // Torna o pixel totalmente transparente (Alpha 0)
            }
        }
        
        // Atualiza a imagem com os pixels transparentes aplicados
        ctx.putImageData(imageData, 0, 0);
        
        // Exporta para PNG (necessário para manter o canal transparente)
        canvas.toBlob((blob) => {
            const sizeKB = blob.size / 1024;
            
            // Verificação de compressão: se passar de 200KB, reduz a dimensão máxima em 50px e reprocessa
            if (sizeKB > 200 && maxDim > 350) {
                console.log(`Tamanho atual (${sizeKB.toFixed(1)} KB) excede 200KB. Reprocessando com menor dimensão...`);
                processImage(img, maxDim - 50, filename);
                return;
            }
            
            // Armazena o blob resultante para upload posterior
            processedImageBlob = blob;
            
            // Modifica o nome do arquivo para .png
            const dotIdx = filename.lastIndexOf('.');
            const nameWithoutExt = dotIdx !== -1 ? filename.substring(0, dotIdx) : filename;
            processedImageName = `${Date.now()}_${nameWithoutExt}.png`;
            
            // Atualiza a interface
            if (previewImg) previewImg.src = URL.createObjectURL(blob);
            if (sizeInfo) sizeInfo.innerText = `Tamanho: ${sizeKB.toFixed(1)} KB`;
            if (statusBadge) {
                statusBadge.innerText = 'Pronto!';
                statusBadge.className = 'status-badge-processing done';
            }
        }, 'image/png');
    }
}

// Configura o envio do formulário de criação/edição
function setupForm() {
    const form = document.getElementById('admin-product-form');
    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    
    if (!form) return;
    
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
        
        // Coleta JSON de especificações adicionais
        const specs = {
            storage: document.getElementById('spec-storage').value.trim() || null,
            ram: document.getElementById('spec-ram').value.trim() || null,
            colors: document.getElementById('spec-colors').value.split(',').map(c => c.trim()).filter(c => c !== '') || null
        };
        
        try {
            let imageUrl = null;
            
            // Se o usuário selecionou e processou uma imagem nova
            if (processedImageBlob) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(processedImageName, processedImageBlob, {
                        contentType: 'image/png',
                        cacheControl: '3600'
                    });
                    
                if (uploadError) throw uploadError;
                
                // Obtém URL pública do bucket
                const { data: publicUrlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(processedImageName);
                    
                imageUrl = publicUrlData.publicUrl;
            } else if (isEditing) {
                // Mantém a imagem anterior ao editar
                const product = productsList.find(p => p.id === id);
                if (product) imageUrl = product.image_url;
            }
            
            const productData = {
                name,
                category,
                sub_category,
                description,
                price,
                original_price,
                specs,
                is_best_seller,
                ...(imageUrl && { image_url: imageUrl })
            };
            
            let queryError;
            
            if (isEditing) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', id);
                queryError = error;
            } else {
                const { error } = await supabase
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
    
    document.getElementById('product-id').value = product.id;
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-category').value = product.category;
    document.getElementById('prod-subcategory').value = product.sub_category || '';
    document.getElementById('prod-desc').value = product.description || '';
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-original-price').value = product.original_price || '';
    document.getElementById('prod-best-seller').checked = product.is_best_seller;
    
    // Especificações
    const specs = product.specs || {};
    document.getElementById('spec-storage').value = specs.storage || '';
    document.getElementById('spec-ram').value = specs.ram || '';
    document.getElementById('spec-colors').value = specs.colors ? specs.colors.join(', ') : '';
    
    // Imagem preview anterior
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
    }
    
    // Sobe a tela para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Exclui um produto do banco e opcionalmente a foto do bucket
window.deleteProduct = async function(id, imageUrl) {
    if (!confirm('Tem certeza que deseja excluir permanentemente este produto?')) return;
    
    try {
        // Deleta registro na tabela
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        
        // Deleta imagem no Storage Bucket (opcional, extrai caminho do arquivo da URL)
        if (imageUrl) {
            const bucketPathIdx = imageUrl.indexOf('/product-images/');
            if (bucketPathIdx !== -1) {
                const fileName = imageUrl.substring(bucketPathIdx + '/product-images/'.length);
                await supabase.storage
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

// Reseta formulário para o estado inicial
function resetForm() {
    isEditing = false;
    processedImageBlob = null;
    processedImageName = '';
    
    document.getElementById('form-title').innerText = 'Cadastrar Novo Produto';
    document.getElementById('btn-save-product').innerText = 'Cadastrar Produto';
    document.getElementById('btn-cancel-edit').style.display = 'none';
    
    document.getElementById('admin-product-form').reset();
    document.getElementById('product-id').value = '';
    
    const previewPanel = document.getElementById('preview-panel');
    if (previewPanel) previewPanel.style.display = 'none';
}
