# Diretrizes de Comportamento e Identidade Visual (SiteRealme.md)

1. **Economia de Tokens & Concisão Extrema**:
   - Respostas curtas, objetivas e diretas ao ponto.
   - Resumos de ações em no máximo uma linha (ex: "Analisando contexto de X", "Editando Y", "Buscando na web"). Sem explicações longas.
   - Economizar tokens de saída, focando o processamento na execução das tarefas de código.

2. **Foco na Execução (Estilo Cirúrgico)**:
   - Agir de forma cirúrgica e linear. Ir direto ao arquivo/linha, fazer a modificação solicitada e aguardar.
   - Ao concluir, dar uma resposta curta como: "OK. Aguardando próxima diretriz."

3. **Linearidade Sem Loops**:
   - Sempre progredir de forma linear, sem repetir contexto desnecessariamente.

4. **Inovações e Sugestões Apenas sob Demanda**:
   - Não sugerir melhorias ou alterações adicionais por padrão.
   - Apenas propor inovações ou melhorias quando solicitado explicitamente pelo usuário (ex: "traga melhorias", "seja inovador").

---

## 5. Identidade Visual e UI (Referência: realme Store)

Para manter a consistência do design premium, dinâmico e tecnológico inspirado no site oficial da realme (https://www.realme.com/in/store), siga rigorosamente as regras abaixo em qualquer alteração visual ou de componentes:

### Cores & Contraste
- **Cor Primária (Destaque):** `#ffc915` (Amarelo realme vibrante)
- **Fundo Escuro (Dark Mode):** Principal: `#000000` (Preto puro) | Cartões, Seções secundárias e elementos de UI: `#121212` ou `#1c1c1e`
- **Texto Principal:** `#ffffff` (Contraste premium sobre o preto)
- **Texto Secundário / Descrições:** `#86868b` ou `#7e7e82` (Cinza fosco para excelente legibilidade e hierarquia)
- **Botões e CTAs:** `#ffc915` (Fundo amarelo com texto preto `#000000`) ou contornos finos em amarelo.

### Logotipo
- **Logotipo da Empresa:** Salvo em `public/logotipo/logo.jpeg`
- Deve ser exibido no Header e nos locais apropriados de branding, aplicando o contraste adequado sobre fundo escuro.

### Tipografia
- Usar fontes modernas, tecnológicas e geométricas sem serifa (ex: Inter, Outfit, Roboto ou Space Grotesk).
- Títulos principais bem destacados, peso `font-semibold` ou `font-bold` com `letter-spacing` levemente negativo (`tracking-tight` ou `tracking-tighter`).

### Estrutura e Efeitos de UI
- **Header:** Altura fixa de ~44px a 60px, fundo escuro translúcido com blur (`bg-black/90 backdrop-blur-md`), links discretos com transição suave no hover e transição para o amarelo realme.
- **Botões e CTAs:** Cantos arredondados modernos (`rounded-lg` ou `rounded-full`), fundo amarelo `#ffc915` com transições dinâmicas ao passar o mouse.
- **Grids e Cards:** Bordas levemente arredondadas (`rounded-xl` ou `rounded-2xl`). Divisões sutis com bordas cinza-escuras (`border-zinc-800`).
- **Animações & Scroll:**
  - Micro-animações no hover com transições rápidas e tecnológicas (`duration-300`).
  - Zoom sutil ao passar o mouse (`hover:scale-[1.02]`).
  - Efeitos de hover com bordas brilhantes/amarelas ou sombras sutis (glow).

### Estrutura Geral de Seções (Conforme realme Store)
1. **Cabeçalho (Global Navigation):** Fundo escuro com logo à esquerda, links centralizados em cinza (hover em amarelo/branco) e barra de busca integrada à direita.
2. **Carrossel Hero (Destaque principal):** Altura ampla com banners publicitários vibrantes apresentando o modelo em destaque, indicadores de paginação circulares na base e chevrons de paginação lateral.
3. **Barra de Acesso Rápido (Categorias):** Fileira horizontal com ícones circulares e títulos de navegação rápida (Telefone, Classificação, realme Care+, VIP, Promoção Relâmpago).
4. **Novos Lançamentos (New Launch):** Bloco estendido exibindo o lançamento de maior destaque recente (ex. Realme C85) com CTAs dedicados de "Buy Now" ou "Learn More".
5. **Grids de Produtos (Cards):** Divisão por abas/linhas temáticas de forma limpa (Best Sellers, P Series, GT Series, Number Series) com imagens em alta definição, título, preço com desconto (amarelo) e preço original riscado.
6. **Slider de Acessórios:** Seção horizontal deslizável apresentando fones de ouvido (como realme Buds T500 Pro, Air8), smartwatches e tablets.
7. **Rodapé Escuro (Footer):** Cor de fundo `#121212` ou `#000000`. Menu com links em colunas organizadas (Produtos, Programas, Apoiar, Sobre a realme). Destaque para o botão de Suporte por Chat (`bg-white` com texto escuro) e telefone de suporte, seguidos por ícones de redes sociais e atalho para download do aplicativo.


---

## 6. Processo de Debug e Assertividade

- **Surgismo Visual:** Ao ajustar layout, espaçamentos ou botões, priorize o alinhamento centralizado dos títulos, uso correto de flexbox/grid e paddings para garantir que a UI pareça polida.
- **Mobile-First:** Garantir que o design colapse de forma fluida para 1 coluna em telas menores e que os paddings e fontes sejam ajustados proporcionalmente.

### 7. Validação de Ambiente e Banco de Dados (Segurança de Execução)
- **MANDATÓRIO:** Antes de interagir com APIs ou realizar operações no banco de dados via Supabase, verifique e garanta que o projeto configurado e ativo no `.env` é de fato `danubiaapravel-Site-Brasil` (URL: `https://hoceltmynggfpdyyvdmb.supabase.co`).
- **Prevenção de Conflitos:** Nunca execute chamadas para o banco de dados caso haja inconsistência de credenciais, para não poluir ou modificar esquemas de outros projetos celulares ativos (ex: Victor's Celulares). Em caso de dúvida, valide explicitamente as variáveis de ambiente atuais.

