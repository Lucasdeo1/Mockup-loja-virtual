# LuxeMode - Template E-Commerce Premium (LOJA FAKE)

Este projeto é um **template frontend de alta fidelidade** para uma loja de roupas estilo *Streetwear/Premium*. Ele foi desenvolvido para simular uma experiência de compra completa, desde a navegação no catálogo até o checkout.

Atualmente, ele funciona como um **MVP (Produto Viável Mínimo)** utilizando a metodologia de "WhatsApp Commerce", permitindo receber pedidos reais sem a necessidade de configurar servidores ou bancos de dados complexos inicialmente.

## 🚀 Funcionalidades Principais

*   **Design Premium & Responsivo:** Interface minimalista focada em imagens de alta qualidade, funcionando perfeitamente em Desktop e Mobile.
*   **Gestão de Estado (Frontend):** Carrinho de compras, controle de estoque e filtros de produtos funcionam em tempo real usando React Context.
*   **Persistência de Dados:** O carrinho e as alterações de estoque ficam salvos no navegador do cliente (`localStorage`), então os dados não somem ao atualizar a página.
*   **Catálogo Dinâmico:**
    *   Filtros por Categoria e Preço.
    *   Ordenação (Mais recentes, Menor/Maior Preço).
    *   Sistema de "Esgotado" e "Baixo Estoque" automático.
*   **Checkout via WhatsApp:** Ao finalizar a compra, o sistema gera uma mensagem formatada com todos os detalhes do pedido e cliente, abrindo diretamente uma conversa com o vendedor.

## 🛠️ Tecnologias Utilizadas

*   **React 19:** Biblioteca principal de interface.
*   **TypeScript:** Para segurança e tipagem do código.
*   **Tailwind CSS:** Para estilização rápida e responsiva.
*   **Framer Motion:** Para animações suaves (transições de página, abertura de menus).
*   **Lucide React:** Ícones leves e modernos.

## 📦 Como Usar e Configurar

### 1. Instalação
Para rodar este projeto localmente:

```bash
npm install
npm run dev
```

### 2. Configurando para Venda Real
Para começar a receber pedidos no seu celular, você precisa alterar o número de telefone no código:

1.  Abra o arquivo `pages/Checkout.tsx`.
2.  Procure pela constante `MERCHANT_PHONE`.
3.  Altere para o seu número (com código do país e DDD).
    *   Exemplo: `"5511999999999"` (Brasil, SP).

### 3. Gerenciando Produtos
Os produtos são carregados a partir de um arquivo estático. Para mudar fotos, preços ou nomes:

1.  Abra o arquivo `constants.ts`.
2.  Edite o array `INITIAL_PRODUCTS`.
3.  **Importante:** Se você já abriu o site, clique no botão vermelho **"Resetar Dados Demo"** no canto inferior esquerdo do site para que as alterações surtam efeito (pois o site prioriza os dados salvos na memória do navegador).

## 🛒 Fluxo de Compra (Simulação)

1.  **Navegação:** O cliente escolhe produtos, tamanhos e cores.
2.  **Carrinho:** Adiciona itens à sacola. O estoque local diminui virtualmente.
3.  **Checkout:** Preenche nome, endereço e escolhe pagamento (PIX/Cartão).
4.  **Finalização:**
    *   O botão "Finalizar no WhatsApp" compila os dados.
    *   O WhatsApp abre com o pedido pronto.
    *   O cliente é redirecionado para a página de Sucesso.
    *   O carrinho é limpo automaticamente.

## 🔮 Próximos Passos (Evolução)

Se você quiser transformar este template em uma loja com pagamento automático no futuro, um desenvolvedor precisará:

1.  Criar um **Backend** (Node.js, Python, etc.) ou usar **Firebase/Supabase**.
2.  Substituir o envio do WhatsApp por uma integração com **Stripe**, **Mercado Pago** ou **Pagar.me**.
3.  Criar um Painel Administrativo para cadastrar produtos sem mexer no código.

---

**Nota:** As imagens atuais são carregadas via URL (Unsplash). Para um site em produção, recomenda-se hospedar as imagens dos seus produtos reais em um serviço de CDN ou na pasta `public/`.

