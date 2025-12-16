import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Jaqueta Puffer Oversized',
    price: 450,
    category: 'Casacos',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop', // Black Puffer close up
      'https://images.unsplash.com/photo-1545594861-3647d9539471?q=80&w=800&auto=format&fit=crop', // Puffer texture/vibe
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Preto Matte', 'Cinza Asfalto'],
    stock: 5,
    description: 'Essencial para o inverno urbano. Modelagem oversized boxy, acabamento repelente à água e isolamento térmico de alta densidade.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Camiseta Graphic Heavyweight',
    price: 180,
    category: 'Camisetas',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop', // Graphic Tee vibe
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop', // Streetwear fit
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Off-White', 'Preto'],
    stock: 12,
    description: 'Algodão premium 280gsm. Estampa em silk puff nas costas e caimento estruturado. Durabilidade e estilo para o dia a dia.',
  },
  {
    id: '3',
    name: 'Calça Cargo Utilitária Tech',
    price: 280,
    category: 'Calças',
    images: [
      'https://images.unsplash.com/photo-1552160793-eb8870c2e19e?q=80&w=800&auto=format&fit=crop', // Olive Cargo
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', // Techwear detail
    ],
    sizes: ['38', '40', '42', '44'],
    colors: ['Verde Oliva', 'Preto Tático'],
    stock: 3,
    description: 'Funcionalidade encontra o streetwear. Múltiplos bolsos funcionais, fivelas ajustáveis e tecido ripstop resistente a rasgos.',
  },
  {
    id: '4',
    name: 'Shoulder Bag Street',
    price: 150,
    category: 'Acessórios',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop', // Side bag
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop', // Bag detail
    ],
    sizes: ['Único'],
    colors: ['Preto', 'Camo'],
    stock: 8,
    description: 'Praticidade para a correria. Nylon balístico, compartimentos seguros e alça ajustável com branding refletivo.',
  },
  {
    id: '5',
    name: 'Moletom Essential Hoodie',
    price: 320,
    category: 'Casacos',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop', // Grey Hoodie
      'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop', // Hoodie texture
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cinza Mescla', 'Beige'],
    stock: 2,
    description: 'O hoodie definitivo. Capuz duplo estruturado, bolso canguru reforçado e interior flanelado para conforto máximo.',
    isNew: true,
  },
  {
    id: '6',
    name: 'Varsity Jacket Retro',
    price: 590,
    category: 'Casacos',
    images: [
      'https://images.unsplash.com/photo-1617137968427-b574a7433c08?q=80&w=800&auto=format&fit=crop', // Varsity Jacket Green
      'https://images.unsplash.com/photo-1551488852-d81a2d5388a1?q=80&w=800&auto=format&fit=crop', // Varsity Vibe
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Azul Marinho/Branco'],
    stock: 0, // SOLD OUT
    description: 'Clássico reimaginado. Corpo em lã batida, mangas em material sintético premium e patches bordados de alta definição.',
  },
  {
    id: '7',
    name: 'Gorro Beanie Docker',
    price: 89,
    category: 'Acessórios',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop', // Beanie
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Único'],
    colors: ['Mostarda', 'Preto', 'Cinza'],
    stock: 20,
    description: 'Estilo worker. Malha canelada de alta densidade que não perde a forma. Perfeito para compor o visual urbano.',
    isNew: true,
  },
  {
    id: '8',
    name: 'Jeans Wide Leg Destroyed',
    price: 340,
    category: 'Calças',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop', // Ripped Jeans
      'https://images.unsplash.com/photo-1584370848010-d7cc637703e6?q=80&w=800&auto=format&fit=crop' // Denim detail
    ],
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Azul Lavado', 'Preto Desbotado'],
    stock: 8,
    description: 'A modelagem do momento. Corte amplo, cintura alta e detalhes destroyed feitos à mão para autenticidade única.',
  },
  {
    id: '9',
    name: 'Camiseta Basic Boxy Fit',
    price: 120,
    category: 'Camisetas',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', // White Tee
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop' // Black Tee
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Branco', 'Preto', 'Areia'],
    stock: 25,
    description: 'O básico nada básico. Corte quadrado (boxy), gola mais alta e algodão 100% sustentável. A base perfeita para qualquer outfit.',
  },
  {
    id: '10',
    name: 'Jaqueta Denim Vintage',
    price: 480,
    category: 'Casacos',
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d8c92342?q=80&w=800&auto=format&fit=crop', // Denim Jacket Male
      'https://images.unsplash.com/photo-1601333762779-83bf81eaef56?q=80&w=800&auto=format&fit=crop' // Denim Detail
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue Denim'],
    stock: 4,
    description: 'Lavagem vintage inspirada nos anos 90. Tecido robusto que envelhece bem, botões de metal personalizados e costura contrastante.',
    isNew: true,
  },
  {
    id: '11',
    name: 'Boné 5-Panel Nylon',
    price: 110,
    category: 'Acessórios',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop', // 5 Panel Cap
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop' // Cap detail
    ],
    sizes: ['Ajustável'],
    colors: ['Azul Marinho', 'Preto'],
    stock: 15,
    description: 'Leve e respirável. Construção em nylon ripstop, fecho ajustável e design low-profile para um visual despojado.',
  },
  {
    id: '12',
    name: 'Camisa Oversized Flanelada',
    price: 260,
    category: 'Camisetas',
    images: [
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=800&auto=format&fit=crop', // Flannel Shirt
      'https://images.unsplash.com/photo-1559582798-a3f81503c7c2?q=80&w=800&auto=format&fit=crop' // Texture
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Xadrez Vermelho', 'Xadrez Verde'],
    stock: 6,
    description: 'Estilo grunge moderno. Flanela macia de gramatura média, perfeita para sobreposições em dias de meia estação.',
  }
];
