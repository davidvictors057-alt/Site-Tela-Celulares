const fs = require('fs');
const path = require('path');

const files = [
    'celulares.html',
    'tablets.html',
    'baterias.html',
    'audio.html',
    'acessorios.html',
    'informatica.html',
    'moda.html',
    'perfumes.html',
    'outros.html'
];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
        console.log(`File ${file} not found`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Remover a busca do header
    content = content.replace(
        /<!-- Barra de Busca -->\s*<div class="search-container">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Ações Mobile/g,
        '</div>\n\n            <!-- Ações Mobile'
    );
    
    content = content.replace(
        /<!-- Barra de Busca -->\s*<div class="search-container">[\s\S]*?<\/div>/g,
        ''
    );

    // 2. Inserir a busca na sub-navegação
    const navRegex = /<div class="category-nav-container">([\s\S]*?)<\/div>\s*<\/div>/g;
    
    content = content.replace(navRegex, (match, buttons) => {
        return `<div class="category-nav-container">
            <div style="display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none;">
                ${buttons.trim()}
            </div>
            <div class="category-nav-search">
                <div class="search-box">
                    <input type="text" placeholder="Buscar nesta categoria..." id="search-input" autocomplete="off">
                    <button class="btn-search" aria-label="Buscar">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully updated ${file}`);
});
