# ZiK! – E‑commerce de Hardware

## Visão geral

Aplicação web de e‑commerce focada em hardware/notebooks, simulando uma loja real com:

- catálogo de produtos com estoque e promoções dinâmicas,
- carrinho integrado ao estoque,
- autenticação simples com persistência no navegador,
- seleção de método de pagamento com descontos,
- interface responsiva e mobile‑first.

O objetivo é servir como base de estudo/portfólio com foco em **clean code**, **POO** no front e **contexts/hooks** bem definidos.

---

## Tecnologias usadas

- **React** + **TypeScript**
- **React Router DOM** (navegação)
- **Context API + hooks personalizados** (estado global)
- **styled-components** (estilização, mobile‑first)
- **localStorage** (persistência de carrinho, produtos, contas e usuário logado)
- **sonner** (toasts de feedback)
- **lucide-react** (ícones)

---

## Organização das pastas

- src/ App.tsx routes/ index.tsx # Definição das rotas principais

- models/ # Modelos de domínio (POO) CartItem.ts # Item de carrinho com getters e métodos de quantidade Product.ts # Produto com lógica de estoque e promoção Category.ts # Categoria da vitrine User.ts # Usuário autenticado PaymentMethod.ts # Estratégias de pagamento (cartão, pix, boleto)

- contexts/ # Providers de estado global CartContext.ts # Tipagem / API pública do carrinho CartProvider.tsx # Implementação do carrinho + integração com estoque ProductsContext.ts # Tipagem / API pública de produtos/estoque ProductsProvider.tsx # Implementação de produtos + persistência AuthContext.ts # Tipagem / API pública de autenticação AuthProvider.tsx # Implementação de login/cadastro/contas PaymentContext.ts # Tipagem / API pública de pagamento PaymentProvider.tsx # Implementação de seleção de método e cálculo final

- hooks/ # Hooks de acesso aos contexts useCart.ts useProducts.ts useAuth.ts usePayment.ts

- constants/ # Dados mockados/estáticos products.ts # Lista inicial de produtos (instâncias de Product) categories.ts # Lista de categorias exibidas na Home

- types/ index.ts # Tipos planos + tipos Like (ProductLike, CartItemLike)

- components/ Header/ index.tsx # Header fixo com logo, carrinho e ações de usuário styles.ts ProductCard/ index.tsx # Card de produto usado em listas styles.ts LoginRequiredModal/ index.tsx # Modal “login obrigatório” usado no checkout styles.ts ScrollToTop.tsx # Reseta scroll ao trocar de rota Popup.tsx # Popup informativo (ex.: promoções/avisos globais)

- pages/ Home/ index.tsx # Carrossel de destaques + grid de categorias styles.ts Category/ index.tsx # Lista de produtos filtrados por categoria/low-stock/promo styles.ts Product/ index.tsx # Detalhe do produto com seletor de quantidade styles.ts Cart/ index.tsx # Tela de carrinho + métodos de pagamento + checkout styles.ts Auth/ Login/ index.tsx # Tela de login/signup (modo alternável) styles.ts Account/ index.tsx # Gestão de username/senha do usuário logado styles.ts

- styles/ global.css # CSS global, reset e variáveis de tema

---

## Fluxos principais

1. Produtos e Estoque

- Modelo: Product
- Encapsula stock, flags (isInStock, isLowStock), e lógica de promoção (discountPercent, discountedPrice).
- Seed inicial: constants/products.ts
- Cria instâncias de Product com categorias, preços e estoque.
- Provider: ProductsProvider
- Carrega produtos do localStorage (@ZiK:products) ou do seed.
- Exporta via ProductsContext:
- products
- getProductById(id)
- reserveStock(productId, quantity)
- → só confirma se existe estoque suficiente e atualiza o modelo.
- releaseStock(productId, quantity)
- → devolve unidades ao estoque.
- Persiste qualquer alteração de estoque no localStorage.

Uso:

- Home usa products para montar o carrossel de destaques (promoções/baixo estoque).
- Category filtra products por:
-        category === id,
-        low-stock (estoque baixo),
-        promotions (produtos com hasPromotion).
- Product usa getProductById para montar a página de detalhes.

2. Carrinho + Estoque

- Modelo: CartItem
- Representa um item no carrinho com total, withQuantity, increment, decrement.
- Provider: CartProvider
- Estado: items: CartItem[] (carregado de @ZiK:cart).
- Integração com estoque (via useProducts):
- addToCart(cartItem):
- chama reserveStock(product.id, 1),
- se não houver estoque, retorna false,
- senão, adiciona/incrementa no carrinho.
- updateQuantity(productId, quantity):
- calcula o diff,
- se aumentou quantidade → tenta reserveStock pro diff,
- se diminuiu → chama releaseStock com a diferença,
- se quantity < 1 → remove o item.
- removeFromCart(productId):
- chama releaseStock com item.quantity,
- remove item da lista.
- clearCart():
- chama releaseStock para todos os itens,
- esvazia o carrinho.
- getTotal():
- soma item.total de todos os itens (subtotal).

Uso:

- ProductCard e Product:
-        Criam CartItem e chamam addToCart.
-        Tratam retorno false como falta de estoque (toast/alert).
- Página Cart:
-        Usa items, updateQuantity, removeFromCart, clearCart, getTotal.
-        Faz o controle dos botões + / − conforme estoque atual do produto.

3. Pagamento

- Modelo base: PaymentMethod (abstrato)
- Implementa id, name, description, e método abstrato calculateTotal(baseAmount).
- Estratégias concretas:
- CreditCardPayment → sem desconto.
- PixPayment → 5% de desconto.
- BoletoPayment → 2% de desconto.
- Provider: PaymentProvider
- Estado: selectedMethodId: "credit-card" | "pix" | "boleto" | null.
- methods: array memoizado com as três estratégias.
- API (PaymentContext):
- methods
- selectedMethodId
- selectMethod(id)
- getFinalTotal(baseAmount)

Integração com o carrinho (página Cart):

- Calcula baseTotal com getTotal() do CartContext.
- Mostra cada método com o total pré-calculado:
-        method.calculateTotal(baseTotal).
- Define finalTotal como:
-        getFinalTotal(baseTotal) se houver método selecionado,
-        ou baseTotal caso contrário.
- Botão Purchase:
-        desabilitado enquanto !selectedMethodId.
-        ao clicar:
-            exige usuário logado (ver fluxo de auth),
-            mostra toast com finalTotal,
-            limpa carrinho e volta para home.

4. Autenticação e Conta

- Modelo: User
- Guarda username e email?.
- Provider: AuthProvider
- Guarda:
- user: User | null (usuário atual).
- accounts: { username; email; password }[] (em @ZiK:accounts).
- Métodos:
- login(identifier, password):
- identifier pode ser username ou email,
- verifica conta existente,
- compara senha,
- lança erros específicos (USER_NOT_FOUND, INVALID_PASSWORD) para UI tratar.
- register(username, email, password):
- valida se username/email já existem,
- adiciona nova conta e faz login automático,
- lança USER_ALREADY_EXISTS / EMAIL_ALREADY_EXISTS em conflito.
- logout():
- limpa user e remove do localStorage.
- updateUsername(newUsername):
- exige usuário logado,
- verifica se não existe outro username igual,
- atualiza accounts e user.
- updatePassword(currentPassword, newPassword):
- exige usuário logado,
- confere senha atual,
- atualiza senha na conta.

Uso:

- Página Auth/Login: alterna entre “Login” e “Sign Up” no mesmo form.
-        valida senha forte (mínimo 8, 1 maiúscula, 1 caractere especial).
-        após login/cadastro:
-        se veio com state.from === "/cart" e reason === "checkout" → volta para /cart,
-        senão, redireciona para /.
- Página Account:
-        exibe username/email atuais,
-        formulário para alterar username,
-        formulário para alterar senha com confirmação + validação de força.

5. Fluxo de Checkout com Login obrigatório

- Usuário abre /cart e seleciona um método de pagamento.
- Clica em Purchase:
- se não estiver logado:
- abre LoginRequiredModal (overlay que escurece o fundo),
- oferece:
- botão “Go to login” → vai para /auth com state: { from: "/cart", reason: "checkout" },
- botão “Close” → fecha modal.
- estiver logado, mas sem método de pagamento:
- mostra toast pedindo para selecionar um método - se estiver logado e com método:
- calcula finalTotal via PaymentContext,
- mostra toast com valor pago,
- limpa carrinho (clearCart),
- redireciona para /.
