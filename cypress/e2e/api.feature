Feature: API de checkout
  Scenario: criar um pedido via API
    Given que o serviço de checkout esteja disponível
    When eu envio uma requisição POST para "/api/checkout" com os dados válidos
    Then deveria receber status 201


  Scenario: adicionar item no carrinho via API
    Given que o serviço de checkout esteja disponível
    When eu envio uma requisição POST para "/api/carrinho" com os dados do carrinho
    Then deveria receber status 201

