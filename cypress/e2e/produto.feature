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
    Then eu posso visualizar informacoes sobre o pedido

  Scenario Outline: Campos invalidos no checkout
    Given visitei o "qa-commerce"
    When adiciono o produto primeiro produto ao carrinho
    And acesso o carrinho
    And vou para a pagina de checkout
    And preencho os campos do checkout com "<firstName>", "<lastName>", "<email>", "<streetAddress>", "<number>" e "<cep>"
    Then eu vejo a mensagem de erro "<errorMessage>"

    Examples:
      | firstName | lastName | email                | streetAddress | number | cep      | errorMessage                       |
      | John      | Doe      | invalid-email        | Rua do Teste  | 123    | 12345678 | Por favor, insira um email válido. |
      | John      | Doe      | john.doe@example.com | Rua do Teste  | 123    | 123458   | O CEP deve ter 8 caracteres.       |
      |           | Doe      | john.doe@example.com | Rua do Teste  | 123    | 12345678 | Este campo é obrigatório.          |
      | John      |          | john.doe@example.com | Rua do Teste  | 123    | 12345678 | Este campo é obrigatório.          |
      | John      | Doe      |                      | Rua do Teste  | 123    | 12345678 | Este campo é obrigatório.          |
      | John      | Doe      | john.doe@example.com |               | 123    | 12345678 | Este campo é obrigatório.          |
      | John      | Doe      | john.doe@example.com | Rua do Teste  |        | 12345678 | Este campo é obrigatório.          |
      | John      | Doe      | john.doe@example.com | Rua do Teste  | 123    |          | Este campo é obrigatório.          |


