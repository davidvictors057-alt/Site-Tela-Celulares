import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing in process.env. Run with node --env-file=.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const remainingProducts = [
  // --- IPHONES (Linha 17) ---
  {
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 9999.00,
    description: 'Titânio de última geração, o revolucionário Chip A19 Pro e o novo sistema de câmera avançada de 3 lentes em acabamento premium. Projetado para o extraordinário.',
    image_url: 'local:iphone-17-pro-max-orange',
    badge: 'Lançamento',
    specs: ['Chip A19 Pro (2nm)', 'Tela Super Retina XDR OLED 120Hz', 'Estrutura em Titânio Aeroespacial Grau 5', 'Câmera Tripla Avançada'],
    colors: [
      { name: 'Titânio Laranja', hex: '#e06b2b', image: 'local:iphone-17-pro-max-orange', secondaryImage: 'local:iphone-17-orange-closeup' },
      { name: 'Titânio Prata', hex: '#a8a9ad', image: 'local:iphone-17-pro-max-white' },
      { name: 'Titânio Azul', hex: '#273244', image: 'local:iphone-17-pro-max-blue' }
    ]
  },
  // --- IPHONES (Linha 16) ---
  {
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 8499.00,
    description: 'A excelência em fotografia com o inovador botão Controle de Câmera e o poderoso Chip A18 Pro. A experiência definitiva para quem busca alta performance e confiabilidade.',
    image_url: 'local:iphone-16-pro-max-black',
    badge: 'Destaque',
    specs: ['Tela Super Retina XDR OLED de 6.9"', 'Chip A18 Pro com GPU de 6 núcleos', 'Controle de Câmera Inteligente', 'Câmera Fusion de 48 MP'],
    colors: [
      { name: 'Titânio Preto', hex: '#232426', image: 'local:iphone-16-pro-max-black' },
      { name: 'Titânio Branco', hex: '#f2f1ed', image: 'local:iphone-16-pro-max-white' }
    ]
  },
  // --- IPHONES (Linha 15) ---
  {
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 6899.00,
    description: 'O pioneiro com estrutura de Titânio Aeroespacial, conexão USB-C ultrarrápida, o poderoso Chip A17 Pro e câmera de alta precisão.',
    image_url: 'local:iphone-15-pro-max-black',
    badge: 'Popular',
    specs: ['Tela Super Retina XDR OLED de 6.7"', 'Chip A17 Pro de alto desempenho', 'Câmera de 48 MP Zoom 5x', 'Estrutura em Titânio Aeroespacial'],
    colors: [
      { name: 'Titânio Preto', hex: '#232426', image: 'local:iphone-15-pro-max-black' },
      { name: 'Titânio Natural', hex: '#8f8a81', image: 'local:iphone-15-pro-max-natural' }
    ]
  },

  // --- TABLETS (Redmi Pad 2) ---
  {
    name: 'Redmi Pad 2',
    brand: 'Xiaomi',
    category: 'smartphones', // ou tablets
    price: 1399.00,
    description: 'O tablet perfeito para estudos, diversão e produtividade. Leve, fluido e com bateria para o dia inteiro.',
    image_url: 'local:redmi-pad-se',
    badge: 'Tablet Exclusivo',
    specs: ['Tela 11.0" 2.5K 90Hz', 'Processador MediaTek Helio G100 Ultra', 'Bateria Monstruosa 9000mAh', 'Quatro alto-falantes Dolby Atmos'],
    colors: [
      { name: 'Cinza Grafite', hex: '#4b5563' },
      { name: 'Verde Menta', hex: '#a7f3d0' },
      { name: 'Roxo Lavanda', hex: '#ddd7fe' }
    ]
  },
  // --- TABLETS (Redmi Pad SE) ---
  {
    name: 'Redmi Pad SE',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 1499.00,
    description: 'Tela gigante de 11 polegadas de 90Hz com o poder do processador Snapdragon. Feito para entreter toda a família com estilo.',
    image_url: 'local:redmi-pad-se-11',
    badge: 'Custo-Benefício',
    specs: ['Tela 11.0" FHD+ 90Hz', 'Qualcomm Snapdragon 680 (6nm)', 'Bateria gigante de 8000mAh', 'Corpo único em metal ultrafino'],
    colors: [
      { name: 'Cinza Grafite', hex: '#374151' },
      { name: 'Verde Aurora', hex: '#6ee7b7' },
      { name: 'Roxo Lavanda', hex: '#c084fc' }
    ]
  },
  // --- TABLETS (Redmi Pad SE 8.7") ---
  {
    name: 'Redmi Pad SE 8.7"',
    brand: 'Xiaomi',
    category: 'smartphones',
    price: 1099.00,
    description: 'Perfeito para uso com uma mão. Tela fluida de 90Hz, design leve de alta durabilidade e som estéreo Dolby Atmos.',
    image_url: 'local:redmi-pad-se-8.7',
    badge: 'Ultra-Portátil',
    specs: ['Tela 8.7" HD+ 90Hz 600 nits', 'MediaTek Helio G85 octa-core', 'Bateria de 6650mAh + Carga 18W', 'Peso leve de apenas 373g'],
    colors: [
      { name: 'Cinza Grafite', hex: '#374151' },
      { name: 'Verde Aurora', hex: '#6ee7b7' },
      { name: 'Azul Celeste', hex: '#93c5fd' }
    ]
  },
  // --- TABLETS (Amazon Fire HD 10) ---
  {
    name: 'Amazon Fire HD 10',
    brand: 'Amazon',
    category: 'smartphones',
    price: 899.00,
    description: 'Tela Full HD de 10.1 polegadas ultra-resistente. Acesse Netflix, Prime Video e Disney+ com o melhor som estéreo.',
    image_url: 'local:fire-hd-10',
    badge: 'Cinema & Lazer',
    specs: ['Tela 10.1" Full HD 1080p', 'Processador Octa-Core 2.0 GHz', 'Bateria durável até 13 horas', 'Integração completa com Alexa'],
    colors: [
      { name: 'Preto Clássico', hex: '#1f2937' },
      { name: 'Azul Denim', hex: '#1e3a8a' },
      { name: 'Lilás', hex: '#c084fc' }
    ]
  },
  // --- TABLETS (Amazon Fire HD 8) ---
  {
    name: 'Amazon Fire HD 8',
    brand: 'Amazon',
    category: 'smartphones',
    price: 699.00,
    description: 'Super durável e compacto. Tela de 8 polegadas nítida com bateria para até 13 horas de e-books e lazer.',
    image_url: 'local:fire-hd-8',
    badge: 'Portátil & Kids',
    specs: ['Tela 8.0" HD resistente', 'Processador Hexa-Core 2.0 GHz', 'Bateria para até 13 horas', 'Vidro reforçado aluminossilicato'],
    colors: [
      { name: 'Preto Clássico', hex: '#1f2937' },
      { name: 'Azul Denim', hex: '#1e3a8a' },
      { name: 'Rosa Rosebud', hex: '#fda4af' }
    ]
  },

  // --- ACESSÓRIOS DE ÁUDIO ---
  {
    name: 'JBL Charge 5 Bluetooth',
    brand: 'JBL',
    category: 'audio',
    price: 899.00,
    description: 'Som pro original JBL com graves profundos. Resistente a água e poeira IP67.',
    image_url: 'local:jbl-charge-5',
    badge: 'Som Premium',
    specs: ['Som pro original JBL com graves', 'Resistente a água e poeira IP67', 'Bateria de até 20h + Powerbank'],
    colors: [
      { name: 'Preto', hex: '#1c1d21' },
      { name: 'Verde', hex: '#2e5a44' },
      { name: 'Azul', hex: '#1e3a8a', outOfStock: true }
    ]
  },
  {
    name: 'JBL Charge 5 Wi-Fi',
    brand: 'JBL',
    category: 'audio',
    price: 999.00,
    description: 'Transmissão de áudio de alta definição via Wi-Fi e Bluetooth com graves robustos.',
    image_url: 'local:jbl-charge-5-wifi',
    badge: 'Wi-Fi + BT',
    specs: ['Wi-Fi e Bluetooth simultâneos', 'Transmissão HD com som original', 'Bateria de até 20 horas'],
    colors: [{ name: 'Preto', hex: '#1c1d21' }]
  },
  {
    name: 'Headphone JBL Tune 720BT',
    brand: 'JBL',
    category: 'audio',
    price: 389.00,
    description: 'Som JBL Pure Bass, bateria de até 76 horas de duração e carga rápida via USB-C.',
    image_url: 'local:jbl-720bt',
    badge: 'Conforto',
    specs: ['Som JBL Pure Bass de alta fidelidade', 'Bateria de até 76 horas de duração', 'Carga rápida (5 min = 3h)'],
    colors: [
      { name: 'Preto', hex: '#1c1d21', image: 'local:jbl-720bt' },
      { name: 'Branco', hex: '#fafaf9', outOfStock: true },
      { name: 'Azul', hex: '#1e3a8a', outOfStock: true }
    ]
  },
  {
    name: 'JBL Wave Beam 2',
    brand: 'JBL',
    category: 'audio',
    price: 309.00,
    description: 'Fones ergonômicos confortáveis e com som assinatura JBL Wave e graves potentes.',
    image_url: 'local:jbl-wave-beam-2',
    badge: 'Dia a Dia',
    specs: ['Graves profundos com driver de 8mm', 'Até 32 horas de bateria total', 'Resistência contra respingos IP54'],
    colors: [
      { name: 'Preto', hex: '#1c1d21' },
      { name: 'Branco', hex: '#fafaf9' }
    ]
  },
  {
    name: 'JBL Quantum 100 M2',
    brand: 'JBL',
    category: 'audio',
    price: 250.00,
    description: 'Headset gamer com microfone removível, conforto premium e som surround imersivo.',
    image_url: 'local:jbl-quantum-100',
    badge: 'Gamer',
    specs: ['Som JBL QuantumSOUND Signature', 'Haste leve e almofadas de memória', 'Microfone direcional removível'],
    colors: [{ name: 'Preto', hex: '#1c1d21' }]
  },
  {
    name: 'Realme Buds Air 7',
    brand: 'Realme',
    category: 'audio',
    price: 399.00,
    description: 'Fones premium com cancelamento ativo de ruído ultra profundo e áudio de alta fidelidade.',
    image_url: 'local:realme-buds-air-7',
    badge: 'Cancelamento Ruído',
    specs: ['Cancelamento de ruído active de 50dB', 'Driver de graves de 12.4mm', 'Até 40 horas de bateria com estojo'],
    colors: [
      { name: 'Preto', hex: '#1c1d21' },
      { name: 'Roxo', hex: '#581c87' },
      { name: 'Verde', hex: '#14532d' },
      { name: 'Dourado', hex: '#d97706' }
    ]
  },
  {
    name: 'Realme Buds T110',
    brand: 'Realme',
    category: 'audio',
    price: 180.00,
    description: 'Até 38 horas de reprodução total, driver dinâmico de 10mm e cancelamento de ruído em chamadas por IA.',
    image_url: 'local:realme-t110',
    badge: 'Custo Benefício',
    specs: ['Driver dinâmico de 10mm para graves', 'Até 38 horas de reprodução total', 'Conexão ultra estável Bluetooth 5.4'],
    colors: [
      { name: 'Preto', hex: '#1c1d21' },
      { name: 'Branco', hex: '#fafaf9' },
      { name: 'Verde', hex: '#14532d', outOfStock: true }
    ]
  },
  {
    name: 'Realme Buds T01',
    brand: 'Realme',
    category: 'audio',
    price: 179.00,
    description: 'Design confortável, driver potente de 13mm e conexões estáveis para o dia a dia.',
    image_url: 'local:realme-buds-t01',
    badge: 'Popular',
    specs: ['Driver de 13mm para som cristalino', 'Até 28 horas de bateria total', 'Resistência a respingos IPX5'],
    colors: [
      { name: 'Preto', hex: '#1c1d21' },
      { name: 'Branco', hex: '#fafaf9' }
    ]
  },
  {
    name: 'Redmi Buds 6 Active',
    brand: 'Redmi',
    category: 'audio',
    price: 239.00,
    description: 'Grave potente com driver de 14.2mm, cancelamento de ruído para chamadas claras e autonomia.',
    image_url: 'local:redmi-buds-6-active',
    badge: 'Novidade',
    specs: ['Driver dinâmico de 14.2mm', 'Até 30 horas de bateria com estojo', 'Cancelamento de ruído por IA'],
    colors: [
      { name: 'Preto', hex: '#1c1d21' },
      { name: 'Azul', hex: '#1e3a8a' },
      { name: 'Dourado', hex: '#b45309' },
      { name: 'Branco', hex: '#fafaf9', outOfStock: true }
    ]
  },
  {
    name: 'Redmi Buds 6 Play',
    brand: 'Redmi',
    category: 'audio',
    price: 129.00,
    description: 'Fone extremamente confortável e ultra leve com excelente duração de bateria e som nítido.',
    image_url: 'local:redmi-buds-6-play',
    badge: 'Super Leve',
    specs: ['Design super leve de 3.6g por fone', 'Até 36 horas de autonomia total', 'Conexão estável Bluetooth 5.4'],
    colors: [
      { name: 'Branco', hex: '#fafaf9' },
      { name: 'Rosa', hex: '#fbcfe8' },
      { name: 'Preto', hex: '#1c1d21', outOfStock: true }
    ]
  },
  {
    name: 'Redmi Buds 6 Lite',
    brand: 'Redmi',
    category: 'audio',
    price: 168.00,
    description: 'Cancelamento ativo de ruído inteligente, graves potentes e carregamento USB-C veloz.',
    image_url: 'local:redmi-buds-6-lite',
    badge: 'ANC Híbrido',
    specs: ['Cancelamento ativo de ruído ANC híbrido', 'Até 40 horas de reprodução total', 'Driver de diafragma banhado a titânio'],
    colors: [
      { name: 'Branco', hex: '#fafaf9', image: 'local:redmi-buds-6-lite-white' },
      { name: 'Preto', hex: '#1c1d21', image: 'local:redmi-buds-6-lite-black' },
      { name: 'Azul', hex: '#1e3a8a', outOfStock: true }
    ]
  },
  {
    name: 'Huawei FreeBuds SE 2',
    brand: 'Huawei',
    category: 'audio',
    price: 299.00,
    description: 'Design semi-in-ear confortável, alta autonomia de bateria e recarga ultra rápida.',
    image_url: 'local:huawei-freebuds-se2',
    badge: 'Premium Lite',
    specs: ['Design semi-in-ear ergonômico leve', 'Até 40 horas de reprodução de música', 'Carregamento rápido (10 min = 3h)'],
    colors: [
      { name: 'Branco', hex: '#fafaf9' },
      { name: 'Azul', hex: '#a5f3fc', outOfStock: true }
    ]
  },
  {
    name: 'Xiaomi Sound Outdoor 30W',
    brand: 'Xiaomi',
    category: 'audio',
    price: 300.00,
    description: 'Caixa de som Bluetooth portátil com potência de 30W, resistência à água IP67 e graves dinâmicos.',
    image_url: 'local:xiaomi-sound-outdoor',
    badge: 'Lançamento',
    specs: ['Som dinâmico com potência de 30W RMS', 'Resistência total a água e poeira IP67', 'Bateria integrada de até 12 horas'],
    colors: [
      { name: 'Preto', hex: '#1c1d21', image: 'local:xiaomi-sound-outdoor' },
      { name: 'Vermelho', hex: '#ef4444' },
      { name: 'Azul', hex: '#1e3a8a' }
    ]
  },

  // --- PROTEÇÃO ---
  {
    name: 'Película Premium 3D (Vidro Temperado)',
    brand: 'Geral',
    category: 'protection',
    price: 25.00,
    description: 'Cobertura total de borda a borda com vidro temperado ultra resistente. Proteção clássica contra quedas e arranhões.',
    image_url: 'local:pelicula-3d'
  },
  {
    name: 'Película Hidrogel Ultra',
    brand: 'Geral',
    category: 'protection',
    price: 35.00,
    description: 'Tecnologia flexível com regeneração automática de riscos superficiais. Excelente sensibilidade e ideal para telas curvas.',
    image_url: 'local:pelicula-hidrogel'
  },
  {
    name: 'Película de Cerâmica Flexível',
    brand: 'Geral',
    category: 'protection',
    price: 30.00,
    description: 'Composto flexível super durável que não trinca e não quebra, oferecendo alta absorção de impacto.',
    image_url: 'local:pelicula-ceramica'
  },
  {
    name: 'Película de Privacidade Antiespiã',
    brand: 'Geral',
    category: 'protection',
    price: 40.00,
    description: 'Filtro especial que impede a visualização da tela sob ângulos laterais. Proteja suas informações pessoais no dia a dia.',
    image_url: 'local:pelicula-privacidade'
  },
  {
    name: 'Película Clear HD Cristal',
    brand: 'Geral',
    category: 'protection',
    price: 20.00,
    description: 'Ultra transparência cristalina que preserva 100% o brilho, contraste e a resolução original da tela do aparelho.',
    image_url: 'local:pelicula-clear'
  },
  {
    name: 'Case TPU Simples',
    brand: 'Geral',
    category: 'protection',
    price: 25.00,
    description: 'Silicone flexível transparente de alta qualidade. Leve, fina e ideal para proteger contra arranhões sem esconder o design do aparelho.',
    image_url: 'local:case-tpu-simples'
  },
  {
    name: 'Case Premium',
    brand: 'Geral',
    category: 'protection',
    price: 59.00,
    description: 'Proteção premium reforçada contra quedas bruscas. Bordas elevadas para a câmera e tela com acabamento nobre de alta durabilidade.',
    image_url: 'local:case-premium'
  },

  // --- TAGS ---
  {
    name: 'Xiaomi Tag',
    brand: 'Xiaomi',
    category: 'tags',
    price: 139.00,
    description: 'Rastreador inteligente compacto da Xiaomi. Encontre chaves, carteiras e bolsas com facilidade.',
    image_url: 'local:xiaomi-tag',
    badge: 'Localizador'
  },
  {
    name: 'Xiaomi Tag (4-Pack)',
    brand: 'Xiaomi',
    category: 'tags',
    price: 439.00,
    description: 'Kit com 4 unidades do rastreador inteligente Xiaomi Tag para manter seus principais pertences protegidos.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779239426549-ze4k0oy.webp',
    badge: 'Kit Econômico'
  },
  {
    name: 'Samsung Galaxy SmartTag2',
    brand: 'Samsung',
    category: 'tags',
    price: 149.00,
    description: 'Localizador inteligente da Samsung com bússola direcional detalhada e bateria ultra durável.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779239183517-xwvc9lg.webp',
    badge: 'Premium',
    colors: [
      { name: 'Preto', hex: '#1c1d21', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779239183517-xwvc9lg.webp' },
      { name: 'Branco', hex: '#fafaf9', image: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779239108956-1fddrhl.webp' }
    ],
    specs: [
      'Localização via rede SmartThings Find',
      'Resistência IP67 contra poeira e água',
      'Bateria de longa duração com até 500 dias de uso'
    ]
  },
  {
    name: 'Kit 4 Samsung Galaxy SmartTag2',
    brand: 'Samsung',
    category: 'tags',
    price: 350.00,
    description: 'Kit de 4 unidades da Galaxy SmartTag2 (contém 2 pretas e 2 brancas) para rastrear todos os seus objetos importantes.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779239151115-l7u02b1.webp',
    badge: 'Kit Destaque'
  },
  {
    name: 'Motorola Moto Tag',
    brand: 'Motorola',
    category: 'tags',
    price: 200.00,
    description: 'Localizador Motorola compatível com a rede Encontre meu Dispositivo (Find My Device) do Google.',
    image_url: 'https://qjksxsekhdjliqlecazy.supabase.co/storage/v1/object/public/products/catalog/1779239523443-felvxyj.webp',
    badge: 'Novidade'
  }
];

async function seed() {
  console.log('Seeding remaining products to Supabase...');
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(remainingProducts)
      .select();

    if (error) {
      throw error;
    }

    console.log(`Success! Inserted ${data.length} remaining products into the database.`);
  } catch (err) {
    console.error('Error seeding remaining products:', err);
  }
}

seed();
