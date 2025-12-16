export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Casacos' | 'Camisetas' | 'Calças' | 'Acessórios';
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  sort: 'newest' | 'price-asc' | 'price-desc';
}

export type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  checkout: () => void;
  resetStock: () => void;
};
