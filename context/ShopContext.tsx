import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ShopContextType } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load products from local storage to persist stock changes or fallback to initial
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('luxe_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('luxe_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('luxe_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      // Check current stock availability
      const currentProduct = products.find((p) => p.id === product.id);
      if (!currentProduct || currentProduct.stock <= 0) return prev;

      if (existing) {
        // Prevent adding more than available stock
        if (existing.quantity >= currentProduct.stock) return prev;
        
        return prev.map((item) =>
          item.cartId === existing.cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartId: `${product.id}-${size}-${color}-${Date.now()}`,
          selectedSize: size,
          selectedColor: color,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId) {
          const product = products.find((p) => p.id === item.id);
          const maxStock = product ? product.stock : 0;
          const newQuantity = item.quantity + delta;
          
          if (newQuantity < 1) return item;
          if (newQuantity > maxStock) return item;

          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const checkout = () => {
    // Deduct stock
    const newProducts = products.map((product) => {
      const cartItemsForProduct = cart.filter((item) => item.id === product.id);
      const totalSold = cartItemsForProduct.reduce((acc, item) => acc + item.quantity, 0);
      return { ...product, stock: Math.max(0, product.stock - totalSold) };
    });

    setProducts(newProducts);
    setCart([]);
    // Alert removed to allow Page to handle UX
  };

  const resetStock = () => {
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    localStorage.removeItem('luxe_products');
    localStorage.removeItem('luxe_cart');
    window.location.reload();
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
        resetStock,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
