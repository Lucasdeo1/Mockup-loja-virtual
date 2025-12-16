import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center pt-24">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <CheckCircle size={80} className="text-green-500 mb-6" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-5xl font-serif font-medium mb-4">Pedido Confirmado!</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Obrigado pela sua compra. Enviamos um e-mail de confirmação com os detalhes do seu pedido 
            <span className="font-bold text-black block mt-2">#{orderNumber}</span>
        </p>

        <div className="space-y-4">
            <Link 
                to="/"
                className="inline-block bg-black text-white px-8 py-4 uppercase font-bold tracking-widest text-xs hover:bg-gray-800 transition-all"
            >
                Voltar para Loja
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
