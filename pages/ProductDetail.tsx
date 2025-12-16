import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
        if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
        if (product.colors.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return <div className="pt-32 text-center">Produto não encontrado</div>;
  }

  const isSoldOut = product.stock === 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Voltar para Coleção
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar">
                {product.images.map((img, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`shrink-0 w-20 h-24 lg:w-24 lg:h-32 border ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 aspect-[3/4] bg-gray-100 relative overflow-hidden">
                <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        {/* Info */}
        <div className="lg:py-8">
            <div className="mb-8 border-b border-gray-100 pb-8">
                <span className="text-gray-500 text-sm">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-serif mt-2 mb-4">{product.name}</h1>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium">R$ {product.price}</span>
                    <div className="flex items-center gap-1 text-sm">
                        <Star size={14} fill="black" />
                        <Star size={14} fill="black" />
                        <Star size={14} fill="black" />
                        <Star size={14} fill="black" />
                        <Star size={14} fill="black" />
                        <span className="ml-2 text-gray-400">(42 Avaliações)</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                {/* Colors */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest block mb-3">Cor: {selectedColor}</span>
                    <div className="flex gap-3">
                        {product.colors.map(color => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`h-10 px-4 border text-sm transition-all ${
                                    selectedColor === color 
                                    ? 'border-black bg-black text-white' 
                                    : 'border-gray-200 hover:border-black'
                                }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sizes */}
                <div>
                    <div className="flex justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-widest block">Tamanho: {selectedSize}</span>
                        <button className="text-xs underline text-gray-400">Guia de Medidas</button>
                    </div>
                    <div className="flex gap-3">
                        {product.sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                disabled={isSoldOut}
                                className={`w-12 h-12 flex items-center justify-center border text-sm transition-all ${
                                    selectedSize === size 
                                    ? 'border-black bg-black text-white' 
                                    : 'border-gray-200 hover:border-black'
                                } ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
                {isSoldOut ? (
                    <span className="text-red-600 font-bold uppercase tracking-wider text-sm">Esgotado</span>
                ) : product.stock < 5 ? (
                    <span className="text-orange-600 font-medium text-sm">Restam Poucos - Apenas {product.stock} no estoque</span>
                ) : (
                    <span className="text-green-700 font-medium text-sm">Em Estoque</span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
                <button
                    onClick={handleAddToCart}
                    disabled={isSoldOut}
                    className={`w-full py-4 uppercase font-bold tracking-widest transition-all ${
                        isSoldOut 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {isSoldOut ? 'Esgotado' : 'Adicionar à Sacola'}
                </button>
                <p className="text-center text-xs text-gray-500">Frete grátis para compras acima de R$ 300.</p>
            </div>

            {/* Accordions / Details */}
            <div className="mt-12 space-y-6">
                 <div>
                    <h3 className="font-bold mb-2">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50">
                        <Truck size={20} className="mt-1" />
                        <div>
                            <h4 className="font-bold text-sm">Frete Grátis</h4>
                            <p className="text-xs text-gray-500">Entrega nacional em 3-5 dias</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50">
                        <ShieldCheck size={20} className="mt-1" />
                        <div>
                            <h4 className="font-bold text-sm">Compra Segura</h4>
                            <p className="text-xs text-gray-500">Criptografia SSL 256-bit</p>
                        </div>
                    </div>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
