import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cart, setIsCartOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-white text-primary shadow-sm py-4' : 'bg-transparent text-primary py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter z-50">
            LUXE<span className="text-gray-400 font-light">MODE</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <Link to="/" className="hover:text-gray-500 transition-colors">INÍCIO</Link>
            <Link to="/catalog" className="hover:text-gray-500 transition-colors">COLEÇÃO</Link>
            <Link to="/catalog" className="hover:text-gray-500 transition-colors">NOVIDADES</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Search size={20} className="hidden sm:block cursor-pointer hover:text-gray-500" />
            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-2xl font-serif">
              <Link to="/" className="border-b pb-4 border-gray-100">Início</Link>
              <Link to="/catalog" className="border-b pb-4 border-gray-100">Coleção Completa</Link>
              <Link to="/catalog" className="border-b pb-4 border-gray-100">Novidades</Link>
              <Link to="/catalog" className="border-b pb-4 border-gray-100">Sobre</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
