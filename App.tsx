import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Admin helper component to reset demo data
const AdminControls = () => {
    const { resetStock } = useShop();
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <button 
                onClick={resetStock}
                className="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded border border-red-200 hover:bg-red-100"
            >
                Resetar Dados Demo
            </button>
        </div>
    )
}

function AppContent() {
  return (
    <div className="min-h-screen bg-white text-primary font-sans selection:bg-black selection:text-white">
      <ScrollToTop />
      <Navbar />
      <CartSidebar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Routes>
      </main>

      <footer className="bg-primary text-white py-16 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h4 className="text-xl font-serif font-bold mb-6">LUXEMODE</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Redefinindo o streetwear moderno através de práticas sustentáveis e design atemporal.
                </p>
            </div>
            <div>
                <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Loja</h5>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white">Novidades</a></li>
                    <li><a href="#" className="hover:text-white">Mais Vendidos</a></li>
                    <li><a href="#" className="hover:text-white">Acessórios</a></li>
                    <li><a href="#" className="hover:text-white">Promoções</a></li>
                </ul>
            </div>
            <div>
                <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Suporte</h5>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white">Contato</a></li>
                    <li><a href="#" className="hover:text-white">Envios e Devoluções</a></li>
                    <li><a href="#" className="hover:text-white">Guia de Medidas</a></li>
                    <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
            </div>
            <div>
                <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h5>
                <p className="text-gray-400 text-sm mb-4">Inscreva-se para receber atualizações, acesso a ofertas exclusivas e muito mais.</p>
                <div className="flex border-b border-gray-700 pb-2">
                    <input type="email" placeholder="Digite seu e-mail" className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm" />
                    <button className="text-xs uppercase font-bold tracking-widest hover:text-gray-300">Entrar</button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center md:text-left text-xs text-gray-600">
            © 2025 LuxeMode Template. Todos os direitos reservados.
        </div>
      </footer>
      <AdminControls />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ShopProvider>
  );
}
