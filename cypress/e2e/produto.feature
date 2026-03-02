Feature: Informações do produto e checkout
  Scenario: Informações do produto
    Given visitei o "qa-commerce"
    When adiciono o produto primeiro produto ao carrinho
    And acesso o carrinho
    Then eu posso visualizar informacoes sobre o produto
  
  Scenario: Checkout simples
    Given visitei o "qa-commerce"
    When adiciono o produto primeiro produto ao carrinho
    And acesso o carrinho
    And vou para a pagina de checkout
    And finalizo a compra
    Then eu posso visualizar informacoes sobre o produto