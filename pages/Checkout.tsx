import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Lock, MessageCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, checkout } = useShop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    zip: '',
    address: '',
    complement: '',
    city: '',
    state: '',
    paymentMethod: 'PIX'
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal + shipping;

  // SEU NÚMERO DE WHATSAPP AQUI (Formato Internacional: 55 + DDD + Numero)
  const MERCHANT_PHONE = "5511999999999"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Format the message for WhatsApp
    let message = `*NOVO PEDIDO - LUXEMODE*\n\n`;
    message += `*Cliente:* ${formData.firstName} ${formData.lastName}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `--------------------------------\n`;
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name}\n`;
        message += `  (Tam: ${item.selectedSize} | Cor: ${item.selectedColor})\n`;
        message += `  Valor: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `--------------------------------\n`;
    message += `*Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    message += `*Frete:* ${shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}\n`;
    message += `*TOTAL:* R$ ${total.toFixed(2)}\n\n`;
    
    message += `*Endereço de Entrega:*\n`;
    message += `${formData.address}, ${formData.complement ? formData.complement + ', ' : ''}\n`;
    message += `${formData.city} - ${formData.state}\n`;
    message += `CEP: ${formData.zip}\n\n`;
    
    message += `*Forma de Pagamento:* ${formData.paymentMethod}`;

    // 2. Create WhatsApp Link
    const whatsappUrl = `https://wa.me/${MERCHANT_PHONE}?text=${encodeURIComponent(message)}`;

    // 3. Process Logic
    setTimeout(() => {
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Clear cart locally
      checkout(); 
      setLoading(false);
      navigate('/success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-serif mb-4">Seu carrinho está vazio</h1>
            <button 
                onClick={() => navigate('/catalog')}
                className="text-black underline underline-offset-4"
            >
                Voltar para loja
            </button>
        </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-serif mb-12 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column - Form */}
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <div>
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Dados de Contato</h2>
                <div className="space-y-4">
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="E-mail" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    <div className="grid grid-cols-2 gap-4">
                        <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="Nome" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                        <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Sobrenome" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>
                </div>
            </div>

            {/* Shipping */}
            <div>
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Endereço de Entrega</h2>
                <div className="space-y-4">
                    <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="CEP" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Endereço" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    <input name="complement" value={formData.complement} onChange={handleInputChange} type="text" placeholder="Complemento (opcional)" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    <div className="grid grid-cols-2 gap-4">
                        <input required name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="Cidade" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                        <input required name="state" value={formData.state} onChange={handleInputChange} type="text" placeholder="Estado" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>
                </div>
            </div>

            {/* Payment Selection */}
            <div>
                <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Pagamento</h2>
                <div className="space-y-3">
                    <label className={`border p-4 flex items-center justify-between cursor-pointer transition-colors ${formData.paymentMethod === 'PIX' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">PIX</span>
                            <span className="text-xs text-green-600 font-medium px-2 py-0.5 bg-green-100 rounded">5% OFF</span>
                        </div>
                        <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="PIX" 
                            checked={formData.paymentMethod === 'PIX'}
                            onChange={handleInputChange}
                            className="accent-black" 
                        />
                    </label>

                    <label className={`border p-4 flex items-center justify-between cursor-pointer transition-colors ${formData.paymentMethod === 'Cartão' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">Cartão de Crédito</span>
                        </div>
                        <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="Cartão" 
                            checked={formData.paymentMethod === 'Cartão'}
                            onChange={handleInputChange}
                            className="accent-black" 
                        />
                    </label>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
                <Lock size={12} />
                <span>Ao finalizar, você será redirecionado para o WhatsApp para confirmar o pedido.</span>
            </div>
          </form>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-gray-50 p-8 h-fit sticky top-32">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-6">Resumo do Pedido</h2>
            <div className="space-y-4 mb-6">
                {cart.map(item => (
                    <div key={item.cartId} className="flex justify-between items-start text-sm">
                        <div className="flex gap-3">
                            <div className="w-12 h-16 bg-gray-200">
                                <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-500 text-xs">{item.selectedSize} / {item.selectedColor}</p>
                                <p className="text-gray-500 text-xs">Qtd: {item.quantity}</p>
                            </div>
                        </div>
                        <span>R$ {item.price * item.quantity}</span>
                    </div>
                ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">R$ {total.toFixed(2)}</span>
            </div>

            <button 
                type="submit" 
                form="checkout-form"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 mt-8 uppercase font-bold tracking-widest hover:bg-green-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Finalizar no WhatsApp</span>
                        <MessageCircle size={18} />
                    </>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
