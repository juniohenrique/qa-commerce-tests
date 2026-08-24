Feature: Validação de campos obrigatórios no checkout
  Como usuário do e-commerce
  Quero ser avisado sobre campos inválidos
  Para poder corrigir meus dados antes de finalizar a compra

  Scenario Outline: Tentar finalizar checkout sem campo obrigatório e ver erro
    Given que estou na página inicial da loja
    And adicionei um produto ao carrinho
    And estou na página de checkout
    When preencho o checkout deixando o campo "<campo>" vazio
    And seleciono um método de pagamento
    And aceito os termos e condições
    And submeto o formulário de checkout
    Then devo ver a mensagem de erro "<mensagem>" associada ao campo "<campo>"

    Examples:
      | campo        | mensagem                     |
      | first-name   | Este campo é obrigatório.    |
      | last-name    | Este campo é obrigatório.    |
      | address      | Este campo é obrigatório.    |
      | number       | Este campo é obrigatório.    |
      | cep          | Este campo é obrigatório.    |
      | email        | Este campo é obrigatório.    |

  Scenario: Tentar finalizar checkout com email inválido
    Given que estou na página inicial da loja
    And adicionei um produto ao carrinho
    And estou na página de checkout
    When preencho o checkout com email "email-invalido"
    And seleciono um método de pagamento
    And aceito os termos e condições
    And submeto o formulário de checkout
    Then devo ver a mensagem de erro "Por favor, insira um email válido." no campo "email"

  Scenario: Tentar finalizar checkout com CEP com menos de 8 caracteres
    Given que estou na página inicial da loja
    And adicionei um produto ao carrinho
    And estou na página de checkout
    When preencho o checkout com CEP "12345"
    And seleciono um método de pagamento
    And aceito os termos e condições
    And submeto o formulário de checkout
    Then devo ver a mensagem de erro "O CEP deve ter 8 caracteres." no campo "cep"

  Scenario: Tentar finalizar checkout sem aceitar termos
    Given que estou na página inicial da loja
    And adicionei um produto ao carrinho
    And estou na página de checkout
    When preencho todos os dados do cliente válidos
    And seleciono um método de pagamento
    And submeto o formulário de checkout
    Then devo ver a mensagem de erro "Este campo é obrigatório." associada ao campo "terms"

  Scenario: Tentar finalizar checkout sem selecionar método de pagamento
    Given que estou na página inicial da loja
    And adicionei um produto ao carrinho
    And estou na página de checkout
    When preencho todos os dados do cliente válidos
    And aceito os termos e condições
    And submeto o formulário de checkout
    Then devo ver o alerta global sobre campos obrigatórios
