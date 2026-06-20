import re
import os

files = [
    'celulares.html',
    'tablets.html',
    'baterias.html',
    'audio.html',
    'acessorios.html',
    'informatica.html',
    'moda.html',
    'perfumes.html',
    'outros.html'
]

# 1. Regex para remover a busca do header
header_search_pattern = re.compile(
    r'<!-- Barra de Busca -->\s*<div class="search-container">.*?</div>\s*</div>',
    re.DOTALL
)

for file in files:
    if not os.path.exists(file):
        print(f"File {file} not found")
        continue

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remover a busca do header
    # Vamos encontrar o container de busca e remover
    # No header, o search-container fica entre o menu de navegação e as ações mobile
    # Estrutura típica:
    #             </nav>
    # 
    #             <!-- Barra de Busca -->
    #             <div class="search-container">
    #                 ...
    #             </div>
    # 
    #             <!-- Ações Mobile -->
    
    modified = re.sub(
        r'<!-- Barra de Busca -->\s*<div class="search-container">.*?</div>\s*</div>\s*<!-- Ações Mobile',
        '</div>\n\n            <!-- Ações Mobile',
        content,
        flags=re.DOTALL
    )
    
    # Caso o comentário ou espaçamento seja levemente diferente:
    modified = re.sub(
        r'<!-- Barra de Busca -->\s*<div class="search-container">.*?</div>',
        '',
        modified,
        flags=re.DOTALL
    )

    # 2. Inserir a nova busca no category-nav
    # Estrutura típica do category-nav:
    #     <div class="category-nav">
    #         <div class="category-nav-container">
    #             <button ...>...</button>
    #             ...
    #         </div>
    #     </div>
    
    nav_pattern = re.compile(
        r'(<div class="category-nav-container">)(.*?)(</div>\s*</div>)',
        re.DOTALL
    )
    
    def replace_nav(match):
        prefix = match.group(1)
        buttons = match.group(2).strip()
        suffix = match.group(3)
        
        # Cria a estrutura envelopando os botões e adicionando a busca lateral
        new_nav = f"""{prefix}
            <div style="display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none;">
                {buttons}
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
        {suffix}"""
        return new_nav

    modified = nav_pattern.sub(replace_nav, modified)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(modified)
    print(f"Successfully updated {file}")
