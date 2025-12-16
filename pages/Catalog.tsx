import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { FilterState } from '../types';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Catalog = () => {
  const { products } = useShop();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    minPrice: 0,
    maxPrice: 1000,
    sort: 'newest',
  });

  // Extract unique categories dynamically
  const categories: string[] = Array.from(new Set(products.map(p => p.category)));

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Price
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Sort
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (based on ID or isNew flag)
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, filters]);

  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === cat ? null : cat
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      minPrice: 0,
      maxPrice: 1000,
      sort: 'newest',
    });
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 mb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">A Coleção</h1>
          <p className="text-gray-500 max-w-md">Descubra nossas novidades, com materiais premium e silhuetas projetadas para o guarda-roupa moderno e urbano.</p>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <span className="text-sm text-gray-400">{filteredProducts.length} Produtos</span>
          
          <div className="relative group">
             <select 
                value={filters.sort}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({...filters, sort: e.target.value as any})}
                className="appearance-none bg-transparent pl-4 pr-8 py-2 text-sm font-medium border border-gray-200 rounded-none focus:outline-none cursor-pointer"
             >
                <option value="newest">Mais Recentes</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
             </select>
             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button 
            className="md:hidden p-2 border border-gray-200"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0 space-y-10 sticky top-32 h-fit">
          {/* Categories */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-4">Categorias</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`block text-sm transition-colors ${
                    filters.category === cat ? 'text-black font-bold underline decoration-2 underline-offset-4' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-4">Faixa de Preço</h3>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={filters.maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({...filters, maxPrice: Number(e.target.value)})}
              className="w-full accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>R$ 0</span>
              <span>Até: R$ {filters.maxPrice}</span>
            </div>
          </div>

          {filters.category && (
            <button 
                onClick={clearFilters}
                className="text-xs text-gray-400 underline hover:text-black"
            >
                Limpar Filtros
            </button>
          )}
        </aside>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
            {showMobileFilters && (
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    className="fixed inset-0 z-50 bg-white md:hidden flex flex-col"
                >
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="font-serif text-xl">Filtros</h2>
                        <button onClick={() => setShowMobileFilters(false)}><X /></button>
                    </div>
                    <div className="p-6 space-y-8 flex-1 overflow-auto">
                        <div>
                            <h3 className="font-bold mb-4">Categoria</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-4 py-2 text-sm border ${
                                        filters.category === cat ? 'bg-black text-white border-black' : 'border-gray-200'
                                    }`}
                                    >
                                    {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t">
                        <button 
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest"
                        >
                            Ver Resultados
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
             <div className="text-center py-20">
                <p className="text-gray-400">Nenhum produto encontrado com estes filtros.</p>
                <button onClick={clearFilters} className="mt-4 text-black underline">Limpar Filtros</button>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;