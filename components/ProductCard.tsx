import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isSoldOut = product.stock === 0;

  return (
    <Link to={`/product/${product.id}`} className="group block cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && !isSoldOut && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                Novidade
            </span>
            )}
            {product.stock > 0 && product.stock <= 3 && (
                 <span className="bg-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                 Apenas {product.stock} restantes
             </span>
            )}
        </div>

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 z-20 bg-white/60 flex items-center justify-center backdrop-grayscale">
            <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
              Esgotado
            </span>
          </div>
        )}

        {/* Images */}
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
        />
        <motion.img
          src={product.images[1] || product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
        />
        
        {/* Quick Add (Desktop only visual) */}
        {!isSoldOut && (
            <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur text-black py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest">Ver Detalhes</span>
            </div>
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        </div>
        <span className="text-sm font-medium text-gray-900">R$ {product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
