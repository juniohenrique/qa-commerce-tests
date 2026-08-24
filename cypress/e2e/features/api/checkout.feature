Feature: API de Checkout
  Como consumidor da API
  Quero criar um pedido e consultar seu status
  Para finalizar a compra e validar o registro

  Scenario: Criar pedido com dados válidos e carrinho preenchido
    Given que a API está disponível
    And adicionei o produto 1 ao carrinho do usuário 1
    When envio uma requisição POST para "/api/checkout" com dados válidos de pedido
    Then o status code da resposta deve ser 201
    And a resposta deve conter o "id" do pedido
    And a resposta deve conter o "orderNumber" do pedido

  Scenario: Consultar pedido criado e validar status
    Given que a API está disponível
    And adicionei o produto 1 ao carrinho do usuário 1
    And criei um pedido com dados válidos
    When envio uma requisição GET para "/api/orders/{orderId}"
    Then o status code da resposta deve ser 200
    And o status do pedido na resposta da API deve ser "Pagamento aprovado"
    And o total do pedido deve ser maior que o frete

  Scenario: Tentar criar checkout sem campos obrigatórios retorna 400
    Given que a API está disponível
    When envio uma requisição POST para "/api/checkout" com body vazio
    Then o status code da resposta deve ser 400
    And a resposta deve indicar erro de validação
