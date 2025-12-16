import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold">Sua Sacola ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="hover:text-gray-500">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <span className="text-4xl">🛍️</span>
                  <p>Sua sacola está vazia.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-black underline underline-offset-4 text-sm font-medium"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-100 overflow-hidden relative">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm pr-4">{item.name}</h3>
                            <button 
                                onClick={() => removeFromCart(item.cartId)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                        <p className="text-sm mt-2">R$ {item.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-4">
                        <button 
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-lg font-medium">R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-6 text-center">Frete e impostos calculados no checkout.</p>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-black text-white py-4 uppercase text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
