import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing in process.env. Run with node --env-file=.env');
  process.exit(1);
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const defaultProducts = [
  {
    name: 'Redmi 15',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 1247.00,
    description: 'Smartphone Xiaomi Redmi 15 com tela IPS LCD 6.88" 120Hz, processador Helio G81-Ultra, 8GB RAM e bateria de 5160mAh.',
    image_url: 'local:redmi-15',
    badge: 'Custo-Benefício',
    specs: ['Tela IPS LCD 6.88" 120Hz', 'Processador Helio G81-Ultra & 8GB RAM', 'Bateria Monstruosa 5160mAh'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Realme Note 60',
    brand: 'Realme',
    category: 'smartphones',
    price: 799.00,
    description: 'Smartphone Realme Note 60 resistente a quedas e respingos com tela de 6.74" 90Hz e bateria de 5000mAh.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779126853152-t47lfyg.webp',
    badge: 'Mais Vendido',
    specs: ['Tela de 6.74" 90Hz', 'Resistente a Quedas e Respingos', 'Bateria de 5000mAh'],
    colors: [
      { name: 'Azul Metálico', hex: '#2563eb', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779126876467-k5gvd2u.webp' },
      { name: 'Preto Carbono', hex: '#1e293b', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779126853152-t47lfyg.webp' }
    ]
  },
  {
    name: 'Redmi 15C',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 760.00,
    description: 'Smartphone Xiaomi Redmi 15C com tela de 6.74" 90Hz, processador Helio G85, 4GB RAM e bateria de 5000mAh.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779128089952-3pdsdva.webp',
    badge: 'Custo-Benefício',
    specs: ['Tela IPS LCD 6.74" 90Hz', 'Processador Helio G85 & 4GB RAM', 'Bateria de 5000mAh'],
    colors: [{ name: 'Preto Carbono', hex: '#1c1d21' }]
  },
  {
    name: 'Realme C71',
    brand: 'Realme',
    category: 'smartphones',
    price: 1299.00,
    description: 'Smartphone Realme C71 com resistência militar ArmorShell, bateria de 6300mAh com carga 45W e 256GB armazenamento / 8GB RAM.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779129720565-f8xc2d4.webp',
    badge: 'Lançamento',
    specs: ['Armazenamento de 256GB / 8GB RAM', 'Bateria de 6300mAh com Carga 45W', 'Resistência Militar ArmorShell'],
    colors: [
      {
        name: 'Verde',
        hex: '#2b5a44',
        price: 'R$ 1.299,00',
        specs: ['Armazenamento de 256GB / 8GB RAM', 'Bateria de 6300mAh com Carga 45W', 'Resistência Militar ArmorShell'],
        image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779129720565-f8xc2d4.webp'
      },
      {
        name: 'Branco',
        hex: '#ffffff',
        price: 'R$ 1.049,00',
        specs: ['Armazenamento de 128GB / 4GB RAM', 'Bateria de 6300mAh com Carga 45W', 'Resistência Militar ArmorShell'],
        image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779129674841-9dh3yuw.webp'
      }
    ]
  },
  {
    name: 'Realme 14 5G',
    brand: 'Realme',
    category: 'smartphones',
    price: 2297.00,
    description: 'Smartphone Realme 14 5G com 512GB armazenamento, 12GB RAM e processador Dimensity Avançado.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779238070836-1687z2z.webp',
    badge: 'Super Rápido',
    specs: ['512GB Armazenamento / 12GB RAM', 'Conexão 5G de Alta Velocidade', 'Processador Dimensity Avançado'],
    colors: [{ name: 'Cinza Espacial', hex: '#4f5d75' }]
  },
  {
    name: 'Realme C85',
    brand: 'Realme',
    category: 'smartphones',
    price: 1643.00,
    description: 'Smartphone Realme C85 com bateria Titan de 7000mAh e carga 45W SUPERVOOC.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779126824597-7771olk.webp',
    badge: 'Super Autonomia',
    specs: ['256GB Armazenamento / 8GB RAM', 'Bateria Titan de 7000mAh', 'Carga 45W SUPERVOOC'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Realme Note 70',
    brand: 'Realme',
    category: 'smartphones',
    price: 999.00,
    description: 'Smartphone Realme Note 70 com bateria de 6300mAh, processador Unisoc T7250 e câmera com IA.',
    image_url: 'local:realme-note70',
    badge: 'Super Bateria',
    specs: ['Bateria Monstruosa 6300mAh', 'Processador Unisoc T7250', 'Câmera com Inteligência Artificial'],
    colors: [
      { name: 'Preto', hex: '#1e293b', image: 'local:realme-note70-black' },
      { name: 'Dourado', hex: '#eab308', image: 'local:realme-note70-gold' }
    ]
  },
  {
    name: 'Realme Note 60x',
    brand: 'Realme',
    category: 'smartphones',
    price: 749.00,
    description: 'Smartphone Realme Note 60x com câmera de 8MP f/2.0, processador Unisoc T612 e bateria de 5000mAh.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779127130822-7rborg8.webp',
    badge: 'Econômico',
    specs: ['Câmera de 8MP f/2.0', 'Processador Unisoc T612', 'Bateria de 5000mAh'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Poco X7 Pro',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 2299.00,
    description: 'Smartphone Xiaomi Poco X7 Pro com processador Dimensity 8300-Ultra, 512GB de armazenamento e 12GB de RAM.',
    image_url: 'local:poco-x7-pro',
    badge: 'Gamer Pro',
    specs: ['512GB Armazenamento / 12GB RAM', 'Processador Dimensity 8300-Ultra', 'Bateria 5000mAh + Carga 67W'],
    colors: [{ name: 'Cinza Titânio', hex: '#7e7f84' }]
  },
  {
    name: 'Poco X8 Pro',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 2635.00,
    description: 'Smartphone Xiaomi Poco X8 Pro com processador Dimensity 8500-Ultra e bateria Silicon-Carbon de 6500mAh.',
    image_url: 'local:poco-x8-pro',
    badge: 'Performance Extrema',
    specs: ['512GB Armazenamento / 12GB RAM', 'Processador Dimensity 8500-Ultra', 'Bateria Silicon-Carbon 6500mAh'],
    colors: [{ name: 'Cinza Titânio', hex: '#7e7f84' }]
  },
  {
    name: 'Redmi A5',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 693.00,
    description: 'Smartphone Xiaomi Redmi A5 com tela gigante de 6.88" 120Hz e bateria de 5160mAh.',
    image_url: 'local:redmi-a5',
    badge: 'Super Econômico',
    specs: ['128GB Armazenamento / 4GB RAM', 'Tela Gigante de 6.88" 120Hz', 'Bateria 5160mAh + 18W'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Itel A70',
    brand: 'Itel',
    category: 'smartphones',
    price: 600.00,
    description: 'Smartphone Itel A70 com 256GB de armazenamento e reconhecimento facial/digital.',
    image_url: 'local:itel-a70',
    badge: 'Entrada Premium',
    specs: ['256GB Armazenamento / 4GB RAM', 'Bateria de 5000mAh', 'Reconhecimento Facial e Digital'],
    colors: [
      { name: 'Verde', hex: '#2b5a44', image: 'local:itel-a70-green' },
      { name: 'Dourado', hex: '#d4af37', image: 'local:itel-a70-gold' }
    ]
  },
  {
    name: 'Multi Up 4G',
    brand: 'Multi',
    category: 'smartphones',
    price: 199.00,
    description: 'Celular Multi Up 4G básico, compacto e ideal para o dia a dia.',
    image_url: 'local:multi-up-4g',
    badge: 'Básico 4G',
    specs: ['Conectividade 4G', 'Compacto e Portátil', 'Ideal para o dia a dia'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'IPRO V20S',
    brand: 'IPRO',
    category: 'vintage',
    price: 225.00,
    description: 'Celular clássico Flip IPRO V20S com conexão 4G LTE e teclado iluminado.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779323957076-a2cjvoo.webp',
    badge: 'Flip Clássico',
    specs: ['Formato Flip Clássico', 'Conexão 4G LTE', 'Teclado Físico Iluminado'],
    colors: [{ name: 'Preto Carbono', hex: '#111827' }]
  },
  {
    name: 'Multi Up Play 3G',
    brand: 'Multi',
    category: 'vintage',
    price: 155.00,
    description: 'Celular de barrinha Multi Up Play com rádio FM e lanterna.',
    image_url: 'local:multi-up-play',
    badge: 'Básico Barrinha',
    specs: ['Modelo de Barrinha', 'Conexão 3G', 'Rádio FM e Lanterna'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Nokia 110 4G',
    brand: 'Nokia',
    category: 'vintage',
    price: 250.00,
    description: 'Celular clássico Nokia 110 4G com bateria de longa duração e rádio FM.',
    image_url: 'local:nokia-110-4g',
    badge: 'Nokia Resistência',
    specs: ['Conectividade 4G LTE', 'Bateria Nokia de Longa Duração', 'Rádio FM & Lanterna'],
    colors: [
      { name: 'Preto', hex: '#111827', image: 'local:nokia-110-4g-black' },
      { name: 'Azul', hex: '#1e40af', image: 'local:nokia-110-4g-blue' }
    ]
  },
  {
    name: 'Positivo P51',
    brand: 'Positivo',
    category: 'vintage',
    price: 229.00,
    description: 'Celular flip clássico Positivo P51 com botão SOS de emergência e conexão 4G LTE.',
    image_url: 'local:positivo-p51',
    badge: 'Flip Clássico',
    specs: ['Formato Flip Clássico', 'Teclado Físico Retroiluminado', 'Conexão 4G LTE com Dual Chip', 'Botão de Emergência SOS'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Cat B30',
    brand: 'CAT',
    category: 'vintage',
    price: 220.00,
    description: 'Celular ultra resistente a impactos Cat B30 com conexão 4G LTE.',
    image_url: 'local:cat-b30',
    badge: 'Ultra Resistente',
    specs: ['Corpo Ultra Resistente a Impactos', 'Conectividade 4G LTE', 'Lanterna Integrada e Rádio FM', 'Bateria de Longa Duração (2500mAh)'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Amazfit Bip 5',
    brand: 'Amazfit',
    category: 'wearables',
    price: 549.00,
    description: 'Smartwatch Amazfit Bip 5 com tela de 1.91", GPS integrado e suporte a chamadas.',
    image_url: 'local:amazfit-bip5',
    badge: 'Destaque',
    specs: ['Tela TFT de 1.91"', 'GPS Integrado e Chamadas', '120+ Modos de Treino', 'Bateria até 10 dias'],
    colors: [
      { name: 'Preto', hex: '#111111' },
      { name: 'Branco Creme', hex: '#fafaf9' },
      { name: 'Rosa Pastel', hex: '#fbcfe8' }
    ]
  },
  {
    name: 'Amazfit Bip 5 Unity',
    brand: 'Amazfit',
    category: 'wearables',
    price: 499.00,
    description: 'Smartwatch Amazfit Bip 5 Unity com corpo em aço inoxidável e 120+ modos de treino.',
    image_url: 'local:amazfit-bip5-unity',
    specs: ['Tela TFT de 1.91"', 'Corpo em Aço Inoxidável', '120+ Modos de Treino', 'Bateria até 11 dias'],
    colors: [
      { name: 'Preto Carvão', hex: '#111111' },
      { name: 'Cinza', hex: '#8b95a5' },
      { name: 'Rosa', hex: '#fbcfe8', outOfStock: true }
    ]
  },
  {
    name: 'Redmi Watch 5',
    brand: 'Xiaomi',
    category: 'wearables',
    price: 699.00,
    description: 'Smartwatch Xiaomi Redmi Watch 5 com tela AMOLED de 2.07", GPS integrado e bateria até 24 dias.',
    image_url: 'local:redmi-watch5',
    badge: 'Lançamento',
    specs: ['Tela AMOLED de 2.07"', 'GPS Integrado & Chamadas', '150+ Modos de Treino', 'Bateria até 24 dias'],
    colors: [
      { name: 'Preto Obsidiana', hex: '#090a0f' },
      { name: 'Cinza Prateado', hex: '#cbd5e1' },
      { name: 'Roxo Lavanda', hex: '#d8b4fe' }
    ]
  },
  {
    name: 'Redmi Watch 5 Active',
    brand: 'Xiaomi',
    category: 'wearables',
    price: 349.00,
    description: 'Smartwatch Xiaomi Redmi Watch 5 Active com chamadas bluetooth e tela LCD de 2.0".',
    image_url: 'local:redmi-watch5-active',
    specs: ['Tela de 2.0" LCD', 'Chamadas Bluetooth', '140+ Modos de Treino', 'Bateria até 18 dias'],
    colors: [
      { name: 'Preto Meia-noite', hex: '#090a0f' },
      { name: 'Prata Fosco', hex: '#cbd5e1' },
      { name: 'Azul Oceano', hex: '#1e3a8a', outOfStock: true },
      { name: 'Rosa', hex: '#fda4af', outOfStock: true },
      { name: 'Verde Oliva', hex: '#3f6212', outOfStock: true }
    ]
  },
  {
    name: 'Redmi Watch 5 Lite',
    brand: 'Xiaomi',
    category: 'wearables',
    price: 449.00,
    description: 'Smartwatch Xiaomi Redmi Watch 5 Lite com tela AMOLED de 1.96", GPS e chamadas.',
    image_url: 'local:redmi-watch5-lite',
    specs: ['Tela AMOLED de 1.96"', 'GPS Integrado & Chamadas', '150+ Modos de Treino', 'Bateria até 18 dias'],
    colors: [
      { name: 'Preto', hex: '#090a0f' },
      { name: 'Dourado Marfim', hex: '#e6dfd3' },
      { name: 'Rosa Candy', hex: '#fda4af', outOfStock: true },
      { name: 'Verde Menta', hex: '#a7f3d0', outOfStock: true },
      { name: 'Amarelo Limão', hex: '#fef08a', outOfStock: true }
    ]
  },
  {
    name: 'Redmi Watch 4',
    brand: 'Xiaomi',
    category: 'wearables',
    price: 599.00,
    description: 'Smartwatch Xiaomi Redmi Watch 4 com tela AMOLED de 1.97" e bateria até 20 dias.',
    image_url: 'local:redmi-watch4',
    specs: ['Tela AMOLED de 1.97"', 'GPS Integrado & Chamadas', '150+ Modos de Treino', 'Bateria até 20 dias'],
    colors: [
      { name: 'Preto Obsidiana', hex: '#1e293b' },
      { name: 'Cinza Prateado', hex: '#cbd5e1' },
      { name: 'Ciano Escuro', hex: '#0e7490', outOfStock: true },
      { name: 'Verde Menta', hex: '#a7f3d0', outOfStock: true },
      { name: 'Roxo Pastel', hex: '#e9d5ff', outOfStock: true }
    ]
  },
  {
    name: 'Xiaomi Smart Band 9 Active',
    brand: 'Xiaomi',
    category: 'wearables',
    price: 229.00,
    description: 'Smartband Xiaomi Band 9 Active super fina de 9.99mm com bateria de até 18 dias.',
    image_url: 'local:xiaomi-band9-active',
    badge: 'Custo-Benefício',
    specs: ['Tela TFT de 1.47"', 'Espessura Fina 9.99mm', '50+ Modos Esportivos', 'Bateria até 18 dias'],
    colors: [
      { name: 'Preto', hex: '#000000' },
      { name: 'Branco Bege', hex: '#f5f5dc', outOfStock: true },
      { name: 'Rosa', hex: '#fda4af' },
      { name: 'Roxo', hex: '#c084fc', outOfStock: true },
      { name: 'Verde', hex: '#4ade80', outOfStock: true }
    ]
  },
  {
    name: 'Realme Watch S2',
    brand: 'Realme',
    category: 'wearables',
    price: 649.00,
    description: 'Smartwatch Realme Watch S2 com corpo em aço inoxidável e assistente de voz IA.',
    image_url: 'local:realme-watch-s2',
    specs: ['Tela AMOLED de 1.43"', 'Corpo em Aço Inoxidável', 'Bateria até 20 dias', 'Assistente de Voz IA'],
    colors: [
      { name: 'Preto Oceano', hex: '#111111' },
      { name: 'Cinza Metálico', hex: '#8a8b8c' },
      { name: 'Cinza Meia-noite', hex: '#3b434c', outOfStock: true }
    ]
  },
  {
    name: 'Samsung Galaxy Fit3',
    brand: 'Samsung',
    category: 'wearables',
    price: 329.00,
    description: 'Smartband Samsung Galaxy Fit3 com detecção de queda e SOS.',
    image_url: 'local:galaxy-fit3',
    specs: ['Tela AMOLED de 1.6"', 'Corpo em Alumínio', 'Detecção de Queda & SOS', 'Bateria até 13 dias'],
    colors: [
      { name: 'Grafite', hex: '#27272a' },
      { name: 'Prata', hex: '#cbd5e1' },
      { name: 'Rosé', hex: '#fbcfe8' }
    ]
  },
  {
    name: 'Huawei Watch Fit SE',
    brand: 'Huawei',
    category: 'wearables',
    price: 429.00,
    description: 'Smartwatch Huawei Watch Fit SE com GPS integrado e monitor de sono TruSleep.',
    image_url: 'local:huawei-fit-se',
    specs: ['Tela AMOLED de 1.64"', 'GPS Integrado', 'Monitor de Sono TruSleep', 'Bateria até 9 dias'],
    colors: [
      { name: 'Preto Estelar', hex: '#111111', outOfStock: true },
      { name: 'Rosa Nebulosa', hex: '#fda4af' },
      { name: 'Verde Floresta', hex: '#2e5a44', outOfStock: true }
    ]
  },
  {
    name: 'Huawei Band 8',
    brand: 'Huawei',
    category: 'wearables',
    price: 249.00,
    description: 'Smartband Huawei Band 8 ultrafina com 100+ modos de treino.',
    image_url: 'local:huawei-band8',
    specs: ['Tela AMOLED de 1.47"', 'Espessura Fina 8.99mm', '100+ Modos de Treino', 'Bateria até 14 dias'],
    colors: [
      { name: 'Preto', hex: '#111111' },
      { name: 'Rosa Sakura', hex: '#fda4af', outOfStock: true },
      { name: 'Verde Esmeralda', hex: '#14532d', outOfStock: true },
      { name: 'Laranja Vibrante', hex: '#ea580c', outOfStock: true }
    ]
  },
  {
    name: 'Blackview Z20 Kids',
    brand: 'Blackview',
    category: 'wearables',
    price: 399.00,
    description: 'Smartwatch infantil Blackview Z20 Kids com chamada de vídeo 4G e botão SOS.',
    image_url: 'local:blackview-z20-kids',
    badge: 'Infantil',
    specs: ['Tela IPS de 1.83"', 'Chamada e Vídeo 4G', 'GPS+Wi-Fi e Botão SOS', 'Bateria de 800mAh'],
    colors: [
      { name: 'Azul Oceano', hex: '#3b82f6' },
      { name: 'Rosa', hex: '#fda4af' }
    ]
  },
  {
    name: 'Echo Show 8',
    brand: 'Amazon',
    category: 'smarthome',
    price: 900.00,
    description: 'Smart display Alexa Echo Show 8 com tela HD de 8" e câmera de 13MP.',
    image_url: 'local:echo-show-8-black',
    badge: 'Som Premium',
    specs: ['Tela HD de 8" sensível ao toque', 'Câmera de 13MP com enquadramento automático', 'Som estéreo de alta fidelidade para música', 'Privacidade total com botão físico e tampa de câmera'],
    colors: [
      { name: 'Preto', hex: '#111827', image: 'local:echo-show-8-black' },
      { name: 'Branco', hex: '#fafaf9', image: 'local:echo-show-8-white' }
    ]
  },
  {
    name: 'Echo Show 5',
    brand: 'Amazon',
    category: 'smarthome',
    price: 600.00,
    description: 'Smart display Alexa Echo Show 5 com tela de 5.5" e câmera de 2MP.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779237422162-35bej72.webp',
    badge: 'Mais Vendido',
    specs: ['Tela de 5.5" para alarmes e fotos', 'Câmera integrada de 2MP para chamadas rápidas', 'Alto-falante compacto com som nítido', 'Botão físico para desligar microfone e câmera'],
    colors: [
      { name: 'Preto', hex: '#111827', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779237422162-35bej72.webp' },
      { name: 'Branco', hex: '#fafaf9', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779237329437-2qtjm9d.webp' },
      { name: 'Kids', hex: '#4ade80', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779237751132-uk0fy7a.webp' }
    ]
  },
  {
    name: 'Echo Dot 5',
    brand: 'Amazon',
    category: 'smarthome',
    price: 500.00,
    description: 'Smart speaker Alexa Echo Dot 5 com graves potentes e sensor de temperatura.',
    image_url: 'local:echo-dot-5-black',
    badge: 'Custo-Benefício',
    specs: ['Smart speaker com graves potentes', 'Sensor de temperatura e movimento integrado', 'Controle dispositivos de casa inteligente por voz', 'Botão dedicado para desligar microfone'],
    colors: [
      { name: 'Preto', hex: '#111827', image: 'local:echo-dot-5-black' },
      { name: 'Branco', hex: '#fafaf9', image: 'local:echo-dot-5-white' },
      { name: 'Azul', hex: '#3b82f6', image: 'local:echo-dot-5-blue' }
    ]
  },
  {
    name: 'Echo Pop',
    brand: 'Amazon',
    category: 'smarthome',
    price: 300.00,
    description: 'Smart speaker compacto Alexa Echo Pop com som de gama completa.',
    image_url: 'local:echo-pop-black',
    badge: 'Popular',
    specs: ['Design compacto semiesférico', 'Som de gama completa e vocais claros', 'Controle Alexa por comandos de voz', 'Barra de luz LED indicadora na parte superior'],
    colors: [
      { name: 'Preto', hex: '#111827', image: 'local:echo-pop-black' },
      { name: 'Branco', hex: '#fafaf9', image: 'local:echo-pop-white' }
    ]
  },
  {
    name: 'Echo Spot (2024)',
    brand: 'Amazon',
    category: 'smarthome',
    price: 500.00,
    description: 'Despertador inteligente Alexa Echo Spot com display de 2.83".',
    image_url: 'local:echo-spot-black',
    badge: 'Lançamento',
    specs: ['Despertador inteligente com display de 2.83"', 'Som vibrante com graves aprimorados', 'Sem câmera integrada para máxima privacidade', 'Controle dispositivos de casa inteligente por voz'],
    colors: [
      { name: 'Preto', hex: '#111827', image: 'local:echo-spot-black' },
      { name: 'Branco', hex: '#fafaf9', image: 'local:echo-spot-white' },
      { name: 'Azul', hex: '#3b82f6', image: 'local:echo-spot-black' }
    ]
  },
  {
    name: 'Echo Auto (2ª Geração)',
    brand: 'Amazon',
    category: 'smarthome',
    price: 399.00,
    description: 'Adicione a Alexa ao seu carro com o Echo Auto de 2ª geração.',
    image_url: 'local:echo-auto-black',
    specs: ['Adicione a Alexa ao seu carro', '5 microfones integrados para ouvir acima do ruído', 'Design slim e suporte magnético', 'Transmita música e faça ligações por voz'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Google Home Mini',
    brand: 'Google',
    category: 'smarthome',
    price: 400.00,
    description: 'Smart speaker Google Home Mini com Google Assistente integrado.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779236519802-gp0pf5y.webp',
    badge: 'Google Assistant',
    specs: ['Assistente inteligente com Google Assistente', 'Som 360 graus nítido e potente', 'Controle sua casa inteligente por voz', 'Design compacto revestido em tecido premium'],
    colors: [
      { name: 'Cinza', hex: '#d1d5db', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779236519802-gp0pf5y.webp' },
      { name: 'Preto', hex: '#111827', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779236487664-w5z7cfz.webp' }
    ]
  },
  {
    name: 'TP-Link Deco M5 AC1300',
    brand: 'TP-Link',
    category: 'routers',
    price: 500.00,
    description: 'Sistema Wi-Fi Mesh TP-Link Deco M5 AC1300 dual-band para cobertura residencial completa.',
    image_url: 'local:deco-m5',
    badge: 'Sistema Mesh',
    specs: ['Tecnologia Mesh AC1300 Dual-Band', 'Cobertura uniforme e eliminação de pontos cegos', 'Fácil configuração pelo app Deco', 'Controle parental e antivírus integrado'],
    colors: [{ name: 'Branco', hex: '#fafaf9' }]
  },
  {
    name: 'TP-Link Archer MR200 AC750',
    brand: 'TP-Link',
    category: 'routers',
    price: 399.00,
    description: 'Roteador 4G LTE Wi-Fi TP-Link Archer MR200 AC750 com slots para chip SIM.',
    image_url: 'local:tp-link-mr200',
    badge: 'Roteador 4G',
    specs: ['Roteador 4G LTE Wi-Fi AC750', 'Compartilhe internet 4G com até 64 dispositivos', 'Sem necessidade de configuração: insira o chip e use', 'Duas antenas LTE destacáveis de alta eficiência'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Huawei WiFi Mesh 3 AX3000',
    brand: 'Huawei',
    category: 'routers',
    price: 900.00,
    description: 'Sistema Wi-Fi 6 Plus Mesh Huawei WiFi Mesh 3 AX3000 comHarmonyOS Mesh+.',
    image_url: 'local:huawei-mesh-3',
    badge: 'Wi-Fi 6 Plus',
    specs: ['Tecnologia Mesh Wi-Fi 6 Plus AX3000', 'Velocidades de transmissão de até 3000 Mbps', 'HarmonyOS Mesh+ para roaming contínuo', 'Suporta conexão de até 250+ dispositivos'],
    colors: [{ name: 'Branco', hex: '#fafaf9' }]
  },
  {
    name: 'Huawei WiFi Mesh AC2200',
    brand: 'Huawei',
    category: 'routers',
    price: 900.00,
    description: 'Sistema de roteador mesh tri-band Huawei WiFi Mesh AC2200.',
    image_url: 'local:huawei-mesh-ws5800',
    badge: 'Kit Tri-Band',
    specs: ['Tecnologia Mesh Tri-Band AC2200 (WS5800)', 'Banda dedicada de 5 GHz para backhaul', 'Kit com 2 unidades para ampla cobertura', 'Seis amplificadores de sinal independentes'],
    colors: [{ name: 'Branco', hex: '#fafaf9' }]
  },
  {
    name: 'Huawei WiFi AX3S AX3000',
    brand: 'Huawei',
    category: 'routers',
    price: 200.00,
    description: 'Roteador Wi-Fi 6 de alta velocidade Huawei WiFi AX3S AX3000 com HarmonyOS Mesh+.',
    image_url: 'local:huawei-ax3s',
    badge: 'Wi-Fi 6',
    specs: ['Roteador Wi-Fi 6 AX3000 de alta velocidade', 'HarmonyOS Mesh+ para fácil expansão de rede', 'Controle parental e segurança avançada', '4 antenas externas de alto ganho'],
    colors: [{ name: 'Preto', hex: '#111827' }]
  },
  {
    name: 'Huawei WiFi AX2S AX1500',
    brand: 'Huawei',
    category: 'routers',
    price: 300.00,
    description: 'Roteador Wi-Fi 6 de entrada Huawei WiFi AX2S AX1500.',
    image_url: 'local:huawei-ax2',
    badge: 'Custo-Benefício',
    specs: ['Roteador Wi-Fi 6 AX1500 de entrada', 'HarmonyOS Mesh+ para conexão simplificada', 'Controle parental completo pelo app', '4 portas Gigabit auto-adaptativas'],
    colors: [
      { name: 'Branco', hex: '#fafaf9', image: 'local:huawei-ax2' },
      { name: 'Preto', hex: '#111827', image: 'local:huawei-ax2s' }
    ]
  },
  {
    name: 'Huawei WiFi AX2 AX1500',
    brand: 'Huawei',
    category: 'routers',
    price: 400.00,
    description: 'Roteador Wi-Fi 6 Plus de entrada Huawei WiFi AX2 AX1500 com HarmonyOS Mesh+.',
    image_url: 'local:huawei-ax2',
    specs: ['Roteador Wi-Fi 6 Plus de entrada', 'Velocidades sem fio de até 1500 Mbps', 'HarmonyOS Mesh+ e segurança aprimorada', 'Configuração inteligente de rede'],
    colors: [{ name: 'Branco', hex: '#fafaf9' }]
  },
  {
    name: 'Huawei WiFi BE3 BE3600',
    brand: 'Huawei',
    category: 'routers',
    price: 500.00,
    description: 'Roteador Wi-Fi 7 ultra veloz Huawei WiFi BE3 BE3600 com porta de 2.5 Gbps.',
    image_url: 'local:huawei-be3',
    badge: 'Wi-Fi 7 Destaque',
    specs: ['Roteador de última geração Wi-Fi 7 BE3600', 'Porta WAN/LAN de alta velocidade de 2.5 Gbps', 'Largura de banda de 160 MHz e velocidade de 3570 Mbps', 'Multi-Link Operation (MLO) para conexões ultra-estáveis'],
    colors: [
      { name: 'Branco', hex: '#fafaf9', image: 'local:huawei-be3-white' },
      { name: 'Preto', hex: '#111827', image: 'local:huawei-be3-black' }
    ]
  }
];

async function seed() {
  console.log('Seeding products to Supabase...');
  try {
    // 1. Limpar produtos existentes (opcional, mas bom para garantir integridade se o banco estiver vazio)
    const { error: deleteError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) {
      console.warn('Warning: Could not clear products table:', deleteError.message);
    }

    // 2. Inserir os produtos
    const { data, error } = await supabase
      .from('products')
      .insert(defaultProducts)
      .select();

    if (error) {
      throw error;
    }

    console.log(`Success! Inserted ${data.length} products into the database.`);
  } catch (err) {
    console.error('Error seeding products:', err);
  }
}

seed();
