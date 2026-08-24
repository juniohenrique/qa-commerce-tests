Feature: API de Carrinho
  Como consumidor da API
  Quero adicionar e consultar itens no carrinho
  Para gerenciar os produtos que desejo comprar

  Scenario: Adicionar item ao carrinho via API
    Given que a API está disponível
    And o carrinho do usuário está vazio
    When envio uma requisição POST para "/api/carrinho" com productId=1 e quantity=2
    Then o status code da resposta deve ser 201
    And a resposta deve conter mensagem de sucesso

  Scenario: Consultar itens do carrinho após adicionar produto
    Given que a API está disponível
    And adicionei o produto 1 ao carrinho com quantidade 2 via API
    When envio uma requisição GET para "/api/carrinho/1"
    Then o status code da resposta deve ser 200
    And a resposta deve ser uma lista com pelo menos um item
    And o item deve ter productId, name, price e quantity
    And a quantidade do item deve ser 2
    And o preço do item deve ser maior que zero
