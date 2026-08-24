Feature: Checkout Simples
  Como usuário com produtos no carrinho
  Quero finalizar a compra preenchendo meus dados
  Para receber a confirmação do pedido com pagamento aprovado

  Scenario: Finalizar compra com pagamento via Pix
    Given que estou na página inicial da loja
    And adicionei um produto ao carrinho
    And estou na página de checkout
    When preencho todos os dados do cliente válidos
    And seleciono o método de pagamento "Pix"
    And aceito os termos e condições
    And submeto o formulário de checkout
    Then devo ser redirecionado para a página de status do pedido
    And o status do pedido deve ser "Pagamento aprovado"
    And o valor total do pedido deve ser maior que zero
