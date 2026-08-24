Feature: API de Produtos
  Como consumidor da API
  Quero consultar produtos
  Para obter suas informações e estrutura correta

  Scenario: Listar produtos com paginação
    Given que a API está disponível
    When envio uma requisição GET para "/api/produtos" com parâmetros page=1 e limit=9
    Then o status code da resposta deve ser 200
    And a resposta deve conter a lista "products"
    And a lista de produtos deve conter até 9 itens
    And cada produto deve ter as propriedades obrigatórias id, name, description, price e image
    And o preço do produto deve ser maior que zero

  Scenario: Consultar detalhes de um produto existente
    Given que a API está disponível
    When envio uma requisição GET para "/api/produtos/1"
    Then o status code da resposta deve ser 200
    And a resposta deve conter as propriedades id, name, description, price e image
    And o id do produto retornado deve ser 1
    And o preço deve ser um valor numérico positivo

  Scenario: Consultar produto inexistente deve retornar 404
    Given que a API está disponível
    When envio uma requisição GET para "/api/produtos/99999"
    Then o status code da resposta deve ser 404
    And a resposta deve conter a mensagem "Produto não encontrado."
