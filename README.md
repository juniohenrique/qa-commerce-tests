# QA Commerce Tests

Este repositório contém o conjunto de testes automatizados para a aplicação QA Commerce, construído com **Cypress** e **Cucumber**.

---

## 📁 Estrutura de pastas

```
/ (raiz)
├─ cypress/
│  ├─ e2e/
│  │  ├─ produto.feature        # cenários de UI
│  │  ├─ api.feature            # cenários de API
│  ├─ pageObjects/              # objetos de página (opcional)
│  ├─ screenshots/              # capturas geradas durante execução
│  ├─ support/
│  │  ├─ commands.js            # comandos customizados (login, postApi, etc.)
│  │  ├─ index.js               # configuração global de suporte
│  │  └─ step_definitions/      # implementações dos passos
│  │     ├─ produtoSteps.js     # passos para funcionalidades de produto
│  │     └─ apiSteps.js         # passos para testes de API
├─ package.json
├─ cypress.config.js            # configuração do Cypress + Cucumber
├─ README.md                    # este arquivo
├─ improvements/                # sugestões de melhorias nos testes
```

---

## 🏗 Arquitetura dos testes de produto

1. **Feature files** (Gherkin em português) descrevem cenários de alto nível e regras de negócio.
2. **Step definitions** mapeiam cada frase Gherkin para chamadas do Cypress.
3. **Page objects** (quando utilizados) encapsulam seletores e ações comuns.
4. **Custom commands** implementam ações reaproveitáveis, como `cy.login()` e `cy.postApi()`.
5. **Dados dinâmicos** são gerados com [`@faker-js/faker`](https://fakerjs.dev/).

O objetivo é manter uma camada legível (Gherkin), outra de implementação reutilizável e evitar duplicação.

---

## ▶️ Como rodar o projeto

Instale as dependências:

```bash
npm install
```

**Modo interativo** (UI do Cypress):

```bash
npm run cy:open
```

**Modo headless** (para CI ou linha de comando):

```bash
npm run cy:run
```

> O `baseUrl` está configurado para `http://localhost:3000` em `cypress.config.js`, então a aplicação precisa estar em execução nesse endereço ao executar os testes.

---

## 💡 Sugestões de melhorias

Para organizar ideias e futuras melhorias, criamos a pasta `improvements/`.
Cada arquivo dentro dela descreve uma proposta, por exemplo:

```
improvements/
├─ change-quantity-in-cart.md    # alterar a quantidade de itens no carrinho
├─ README.md                     # orientações da pasta
```

### Exemplo de sugestão
- **Mudar a quantidade de itens no carrinho**: implementar um passo que permita ao teste definir `quantity` e verificar subtotais, em vez de só adicionar o produto padrão. Isso abre espaço para cenários de promoção e casos de erro.

Adicione novos arquivos com as suas ideias e/ou abra pull requests com as implementações.

---

## 🛠 Boas práticas

- Evite lógicas complexas nos próprios passos; prefira page objects e comandos.
- Mantenha os testes determinísticos e independentes uns dos outros.
- Documente novas funcionalidades no README e registre sugestões em `improvements/`.

---
