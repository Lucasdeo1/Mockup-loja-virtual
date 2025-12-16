import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products } = useShop();
  const featuredProducts = products.filter(p => p.isNew || p.stock < 5).slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1920&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 text-gray-300"
          >
            Coleção Outono / Inverno 2025
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium tracking-tight mb-8"
          >
            URBAN <br/> STREETWEAR
          </motion.h1>
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
          >
            <Link
                to="/catalog"
                className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
                Ver Coleção
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <p className="text-xl md:text-3xl font-serif leading-relaxed text-gray-800">
            "A rua é nossa passarela. Criamos peças que traduzem a energia do ambiente urbano com conforto e autenticidade."
        </p>
      </section>

      {/* Featured Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Curadoria Exclusiva</h2>
            <Link to="/catalog" className="text-sm border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                Ver Tudo
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featuredProducts.map((product, index) => (
                 <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                 >
                    <ProductCard product={product} />
                 </motion.div>
            ))}
        </div>
      </section>

      {/* Marquee / Brand Values */}
      <div className="py-16 bg-black text-white overflow-hidden whitespace-nowrap">
        <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-16 text-4xl md:text-6xl font-serif opacity-50 uppercase"
        >
            <span>Estilo Urbano</span>
            <span>—</span>
            <span>Alta Qualidade</span>
            <span>—</span>
            <span>Design Atemporal</span>
            <span>—</span>
            <span>Estilo Urbano</span>
            <span>—</span>
            <span>Alta Qualidade</span>
            <span>—</span>
            <span>Design Atemporal</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;