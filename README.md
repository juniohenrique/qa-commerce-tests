# QA Commerce Tests

Projeto de testes automatizados para a aplicação **QA Commerce**, desenvolvido com **Cypress** + **Cucumber (BDD)**, cobrindo testes de interface Web (UI) e testes de API.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 18.x ou superior (recomendado 20.x LTS)
- **npm** versão 8.x ou superior (gerenciado de pacotes do Node.js)
- **Git** para clonar os repositórios
- Navegador moderno (Chrome, Edge ou Firefox) para execução interativa dos testes

> **Aplicação QA Commerce**: Os testes dependem da aplicação alvo estar rodando. O repositório da aplicação está em `juniohenrique/qa-commerce` (instruções abaixo).

---

## Instalação

### 1. Clonar o repositório de testes

```bash
git clone <url-do-seu-fork>
cd qa-commerce-tests
```

### 2. Instalar dependências do projeto de testes

```bash
npm install
```

### 3. (Opcional) Preparar a aplicação QA Commerce

Caso a aplicação **QA Commerce** não esteja rodando, clone-a em outra pasta:

```bash
cd ..
git clone https://github.com/juniohenrique/qa-commerce.git
cd qa-commerce
npm install
```

---

## Inicialização

### Iniciar a aplicação QA Commerce

Dentro da pasta da aplicação `qa-commerce`:

```bash
npm start
```

A aplicação irá inicializar e abrir automaticamente em:

- **Aplicação Web**: http://localhost:3000
- **Documentação Swagger / API**: http://localhost:3000/api-docs

> Caso a inicialização do banco seja necessária, execute `npm run db` antes do `npm start`.

---

## Execução dos Testes

Todos os comandos são executados dentro da pasta **qa-commerce-tests**, e requerem que a aplicação esteja rodando em `http://localhost:3000`.

### Modo interativo (UI do Cypress)

Ideal para desenvolvimento e depuração:

```bash
npm run cy:open
```

### Modo headless (CI / linha de comando)

Executa todos os testes (Web + API):

```bash
npm run cy:run
```

Ou simplesmente:

```bash
npm test
```

### Executar somente testes Web (UI)

```bash
npm run test:web
```

### Executar somente testes de API

```bash
npm run test:api
```

---

## Estrutura do projeto

```
qa-commerce-tests/
├─ .github/
│  └─ workflows/                     # CI/CD com GitHub Actions
│     ├─ cypress-tests-web.yml       # Pipeline para testes Web
│     └─ cypress-tests-api.yml       # Pipeline para testes de API
├─ cypress/
│  ├─ e2e/
│  │  └─ features/                   # Arquivos .feature em Gherkin
│  │     ├─ web/
│  │     │  ├─ carrinho.feature      # Fluxo de adicionar produto ao carrinho
│  │     │  ├─ checkout.feature      # Fluxo de checkout simples (happy path)
│  │     │  └─ validacao-checkout.feature  # Validações de campos obrigatórios
│  │     └─ api/
│  │        ├─ produtos.feature      # GET /api/produtos e GET /api/produtos/:id
│  │        ├─ carrinho.feature      # POST /api/carrinho e GET /api/carrinho/:userId
│  │        └─ checkout.feature      # POST /api/checkout e GET /api/orders/:id
│  ├─ pages/                         # Page Objects Model (POM)
│  │  ├─ HomePage.js                 # Ações e elementos da página inicial
│  │  ├─ ProductPage.js              # Página de detalhes do produto
│  │  ├─ CartPage.js                 # Página do carrinho
│  │  ├─ CheckoutPage.js             # Página de checkout
│  │  └─ OrderStatusPage.js          # Página de status do pedido
│  ├─ services/                      # Camada de serviços (API Client)
│  │  ├─ ProductService.js           # Comunicação com endpoints de produtos
│  │  ├─ CartService.js              # Comunicação com endpoints de carrinho
│  │  ├─ CheckoutService.js          # Comunicação com endpoints de checkout / pedidos
│  │  └─ UserService.js              # Comunicação com endpoints de usuários
│  ├─ support/
│  │  ├─ commands.js                 # Cypress Custom Commands reutilizáveis
│  │  ├─ index.js                    # Configuração global (beforeEach, imports, etc.)
│  │  ├─ constants/
│  │  │  └─ index.js                 # Constantes: frete, mensagens de erro, métodos de pagamento
│  │  ├─ helpers/
│  │  │  └─ payloadBuilder.js        # Helpers para construir payloads de API
│  │  └─ step_definitions/           # Implementação dos steps Gherkin
│  │     ├─ web/
│  │     │  ├─ common.steps.js       # Steps compartilhados entre Web
│  │     │  ├─ cart.steps.js         # Steps de carrinho
│  │     │  ├─ checkout.steps.js     # Steps de checkout
│  │     │  └─ validation.steps.js   # Steps de validação de campos
│  │     └─ api/
│  │        └─ api.steps.js          # Steps para testes de API (GET, POST, validações)
├─ .gitignore
├─ cypress.config.js                 # Configuração principal do Cypress + Cucumber
├─ package.json
└─ README.md
```

---

## Estratégia de automação

### 1. Cucumber / BDD
- Todos os cenários são escritos em **Gherkin** (português declarativo), dentro de arquivos `.feature`.
- Nenhum teste utiliza `describe()`, `it()`, `context()` ou `specify()`. Toda a estrutura de casos é exclusivamente via **Feature / Scenario / Given / When / Then / And**.
- As descrições dos cenários focam no **comportamento do usuário** e **regras de negócio**, não em detalhes técnicos de seletores ou comandos.

### 2. Page Objects Model (POM)
- Cada página da aplicação possui um **Page Object** correspondente.
- Todos os seletores (`cy.get`, `cy.contains`) e ações de alto nível (`adicionarAoCarrinho()`, `preencherCheckout()`, etc.) ficam encapsulados nas páginas.
- As step definitions **não contêm seletores CSS** diretamente; elas delegam a implementação para as páginas, garantindo maior manutenibilidade.

### 3. Service Layer para API
- Endpoints HTTP não são invocados diretamente com `cy.request(...)` nas step definitions.
- Existe uma camada de **Services** (`ProductService`, `CartService`, `CheckoutService`) responsável por toda a comunicação com a API, com métodos semânticos como `listProducts()`, `createOrder()`, etc.
- Payloads de requisição são montados através de helpers em `payloadBuilder.js`, evitando duplicação.

### 4. Independência e isolamento dos testes
- Antes de cada cenário (`beforeEach`), o carrinho do usuário padrão é limpo via API (`cy.clearCart()`), cookies e localStorage são resetados.
- Nenhum cenário depende de estado deixado por outro teste.
- Dados de teste (cliente, endereço, etc.) são gerados dinamicamente com `@faker-js/faker`.

### 5. Sincronização e espera
- Não há `cy.wait(5000)` ou esperas fixas arbitrárias.
- A sincronização é feita através de **assertions** em elementos/condições observáveis e validações de resposta, garantindo que os testes esperem apenas o tempo necessário.

### 6. Validações de API (além de status code)
- Todos os cenários de API validam **status code** **E** **regras de negócio / estrutura da resposta**:
  - Campos obrigatórios presentes no JSON;
  - Valor de preço maior que zero;
  - Quantidade correta de itens;
  - Status do pedido após criação;
  - Mensagens de erro coerentes com validações do backend.

---

## Cobertura de testes

### Testes Web / UI
| Feature / Cenário | Descrição |
| --- | --- |
| Adicionar Produto ao Carrinho | Adicionar primeiro produto, exibir alerta, atualizar contador; depois validar nome, preço, quantidade e totais no carrinho. |
| Checkout Simples | Preencher dados, selecionar Pix, aceitar termos, submeter; redirecionar para status do pedido com "Pagamento aprovado" e total > 0. |
| Validação de Campos Obrigatórios | Campos vazios, email inválido, CEP com comprimento inválido, termos não aceitos, método de pagamento não selecionado → validações exibidas corretamente. |

### Testes de API
| Feature / Cenário | Método HTTP | Endpoint | Validações |
| --- | --- | --- | --- |
| Listar produtos com paginação | GET | `/api/produtos` | 200 + array products ≤ 9 itens + propriedades obrigatórias + preço > 0 |
| Consultar produto existente | GET | `/api/produtos/1` | 200 + id=1 + campos obrigatórios + preço numérico positivo |
| Consultar produto inexistente | GET | `/api/produtos/99999` | 404 + mensagem "Produto não encontrado." |
| Adicionar item ao carrinho | POST | `/api/carrinho` | 201 + mensagem de sucesso |
| Consultar carrinho | GET | `/api/carrinho/:userId` | 200 + lista não vazia + productId/name/price/quantity + quantidade correta |
| Criar pedido | POST | `/api/checkout` | 201 + id do pedido + orderNumber |
| Consultar pedido criado | GET | `/api/orders/:id` | 200 + status "Pagamento aprovado" + total > frete |
| Checkout sem campos | POST | `/api/checkout` body vazio | 400 + erro de validação |

---

## Boas práticas adotadas

- **Nenhum `describe/it`** na base de testes; somente Cucumber/BDD.
- **Nenhum `cy.wait(ms)`** com valor fixo para "esperar carregar".
- **Nenhum código comentado** desnecessário; apenas comentários explicando decisões não óbvias.
- **Nenhum segredo / credencial hardcoded** versionado.
- **Nenhum código morto / arquivo não referenciado / scaffold padrão do Cypress**.
- Imports organizados; sem imports não utilizados.
- Step definitions **pequenas e legíveis**, delegando lógica para Pages e Services.
- Features escritas em linguagem declarativa, orientada ao comportamento de negócio.
- Cenários independentes com limpeza de estado antes de cada execução.

---

## Dicas para execução

- Verifique se a porta `3000` não está bloqueada por outro processo.
- Caso os testes falhem por "elemento não encontrado", confirme que o banco de dados da aplicação foi inicializado corretamente com os produtos padrão.
- A configuração `baseUrl` está definida em [cypress.config.js](file:///home/junio/code/qa-commerce-tests/cypress.config.js). Se necessário, sobrescreva via linha de comando: `npx cypress run --config baseUrl=http://localhost:3000`.

---

## Referências úteis

- [Documentação do Cypress](https://docs.cypress.io/)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [@faker-js/faker](https://fakerjs.dev/)
- [Swagger UI da aplicação](http://localhost:3000/api-docs) (apenas com a aplicação rodando)
