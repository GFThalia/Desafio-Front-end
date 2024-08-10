# Desafio-Front-end: Cadastro Fornecedor/Produto

## Visão Geral

O projeto **Cadastro Fornecedor/Produto** é uma aplicação web que permite a inclusão e gerenciamento de fornecedores e produtos. Os principais recursos incluem a adição e remoção de produtos, gerenciamento de anexos e o preenchimento automático de endereços usando a API ViaCEP. O projeto utiliza HTML5, CSS, Bootstrap, JavaScript (ECMA-6), jQuery 3.5.1 e Font Awesome para ícones.

## Estrutura do Projeto

### index.html

Arquivo principal que contém a estrutura HTML da página.

#### Seções

1. **Dados do Fornecedor**: Formulário para inserir dados do fornecedor.
2. **Produtos**: Seção para adicionar produtos, com campos para descrição, código, unidade de medida, quantidade, valor unitário e valor total. Inclui botões para adicionar e excluir produtos.
3. **Anexos**: Seção para adicionar arquivos anexos, com opções para visualizar e excluir anexos.
4. **Salvar Fornecedor**: Botão para salvar os dados preenchidos e gerar um JSON com os dados do formulário.

### styles.css

Arquivo CSS para estilização personalizada.

#### Regras de Estilo

- `.section-container`: Estilo geral para as seções com borda e padding.
- `.section-header`: Estilo para o cabeçalho das seções.
- `.section-borda`: Estilo para a borda de cada item de produto.
- `.btn-success-custom`: Estilo para botões personalizados.

### script.js

Arquivo JavaScript que contém a lógica para:

1. **Preenchimento Automático de Endereço**:
    - Usa a API ViaCEP para preencher os campos de endereço com base no CEP informado.

2. **Gerenciamento de Produtos**:
    - Adiciona novos produtos à lista.
    - Remove produtos da lista, garantindo que pelo menos um produto permaneça.
    - Calcula o valor total do produto com base na quantidade e valor unitário.

3. **Gerenciamento de Anexos**:
    - Adiciona anexos à lista.
    - Permite visualizar e excluir anexos.

4. **Salvar Fornecedor**:
    - Valida o formulário.
    - Coleta os dados do fornecedor, produtos e anexos e os exibe como JSON no console.
    - Mostra um modal de carregamento durante o processo de salvamento.

## Funcionalidades

### Adicionar Produto

- **Botão**: "Adicionar Produto"
- **Ação**: Adiciona um novo bloco de produto à lista com campos para descrição, código, unidade de medida, quantidade, valor unitário e valor total.

### Excluir Produto

- **Botão**: Ícone de lixeira ao lado de cada produto.
- **Ação**: Remove o produto da lista, com a condição de que deve haver pelo menos um produto presente.

### Adicionar Anexos

- **Botão**: "Incluir Anexos"
- **Ação**: Permite o upload de arquivos. Adiciona o arquivo à lista de anexos com opções para visualizar e excluir.

### Visualizar Anexos

- **Botão**: Ícone de olho ao lado de cada anexo.
- **Ação**: Permite visualizar o anexo, abrindo o arquivo para download.

### Salvar Fornecedor

- **Botão**: "Salvar Fornecedor"
- **Ação**: Valida o formulário e, se todos os campos obrigatórios estiverem preenchidos, gera um JSON com os dados do fornecedor, produtos e anexos e exibe no console. Um modal de carregamento é exibido durante o processo.

## Instruções de Uso

1. Preencha os campos obrigatórios na seção "Dados do Fornecedor".
2. Adicione produtos usando o botão "Adicionar Produto". Preencha os campos para cada produto e calcule o valor total.
3. Adicione anexos usando o botão "Incluir Anexos". Escolha os arquivos a partir do seu sistema.
4. Clique no botão "Salvar Fornecedor" para validar e salvar os dados. Um JSON com os dados será gerado e exibido no console.

## Dependências

- **Bootstrap**: Framework CSS para estilização.
- **jQuery**: Biblioteca JavaScript para manipulação DOM e AJAX.
- **Font Awesome**: Biblioteca de ícones.
 
