Feature: Adicionar produto ao carrinho
  Como usuário do e-commerce
  Quero adicionar produtos ao meu carrinho
  Para poder visualizar os itens selecionados e seus valores

  Scenario: Adicionar primeiro produto da home ao carrinho
    Given que estou na página inicial da loja
    When visualizo a lista de produtos carregada
    And adiciono o primeiro produto da lista ao carrinho
    Then devo ver a mensagem de sucesso de produto adicionado
    And o contador do carrinho deve ser atualizado

  Scenario: Visualizar informações do produto no carrinho
    Given que estou na página inicial da loja
    And o primeiro produto da lista foi adicionado ao carrinho
    When acesso a página do carrinho
    Then o carrinho deve conter pelo menos um item
    And o nome do produto adicionado deve ser exibido
    And o preço do produto deve ser exibido corretamente
    And a quantidade do produto deve ser 1
    And os valores totais devem ser calculados com frete
