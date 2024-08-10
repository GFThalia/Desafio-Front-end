$(document).ready(function () {
    let contadorProdutos = 0;
    let anexos = [];

//Fornecedor
    // Função para buscar endereço pelo CEP usando a API ViaCEP
    $('#cep').blur(function () {
        const cep = $(this).val().replace(/\D/g, '');
        if (cep) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (dados) {
                if (!("erro" in dados)) {
                    $('#endereco').val(dados.logradouro);
                    $('#bairro').val(dados.bairro);
                    $('#municipio').val(dados.localidade);
                    $('#estado').val(dados.uf);
                } else {
                    alert('CEP não encontrado.');
                }
            });
        }
    });
    
//Produtos
    // Função para calcular o valor total de um produto
    function calcularValorTotal(event) {
        const produtoItem = $(event.target).closest('.produto-item');
        const quantidade = produtoItem.find('#quantidade').val();
        const valorUnitario = produtoItem.find('#valorUnitario').val();
        const valorTotal = produtoItem.find('#valorTotal');
    
        valorTotal.val(quantidade && valorUnitario ? (quantidade * valorUnitario).toFixed(2) : '');
    }

    // Função para adicionar produto à lista
    $('#adicionarProduto').click(function () {
        let produtoItem = `<div class="produto-item">
            <div class="section-and-button">
                <div class="section-delete-button">
                    <button type="button" class="btn btn-danger btn-sm btnExcluirProduto" title="Excluir produto">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="section-borda">
                    <div id="produto-item">
                        <h4 class="border-title">Produto ${contadorProdutos}</h4>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="produto">Descrição<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="produto" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm">
                                <label for="codigo">Código <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="codigo" required>
                            </div>
                            <div class="col-sm">
                                <label for="unidadeMedida">UND. Medida <span class="text-danger">*</span></label>
                                <select class="form-control" id="unidadeMedida" required>
                                    <option value="" selected disabled>Selecionar</option>
                                    <option value="kg">Kg</option>
                                    <option value="unidade">Unidade</option>
                                    <option value="litros">Litros</option>
                                </select>
                            </div>
                            <div class="col-sm">
                                <label for="quantidade">QTD. em Estoque <span class="text-danger">*</span></label>
                                <input type="number" class="form-control" id="quantidade" required>
                            </div>
                            <div class="col-sm">
                                <label for="valorUnitario">Valor Unitário <span class="text-danger">*</span></label>
                                <input type="number" class="form-control" id="valorUnitario" required>
                            </div>
                            <div class="col-sm">
                                <label for="valorTotal">Valor Total</label>
                                <input type="text" class="form-control" id="valorTotal" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        $('#produtosLista').append(produtoItem);
        atualizarTitulosProdutos();
    });

    // Função para excluir produto
    $(document).on('click', '.btnExcluirProduto', function () {
        if ($('.produto-item').length > 1) {
            $(this).closest('.produto-item').remove();
            atualizarTitulosProdutos();
        } else {
            alert('Deve haver pelo menos um produto.');
        }
    });

    // Atualiza os títulos dos produtos
    function atualizarTitulosProdutos() {
        $('.produto-item').each(function (index) {
            $(this).find('.border-title').text('Produto ' + (index + 1));
        });
        contadorProdutos = $('.produto-item').length;
    }

    // Função para calcular o valor total de um produto em tempo real
    $(document).on('input', '#quantidade, #valorUnitario', calcularValorTotal);


//Anexos
    // Função para adicionar anexos
    $('#incluirAnexos').click(function () {
        const inputAnexo = $('<input type="file" class="d-none" accept=".pdf,.doc,.docx,.jpg,.png,.xls,.xlsx">');
        inputAnexo.trigger('click');

        inputAnexo.change(function () {
            const arquivo = this.files[0];
            if (arquivo) {
                anexos.push(arquivo);
                const anexoItem = `
                <div class="anexo-item">
                    <span>${arquivo.name}</span>
                    <button type="button" class="btn btn-danger btn-sm btnExcluirAnexo" title="Excluir anexo">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-info btn-sm btnVisualizarAnexo" title="Visualizar anexo">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>`;
                $('#anexosLista').append(anexoItem);
            }
        });
    });

    // Função para excluir anexo
    $(document).on('click', '.btnExcluirAnexo', function () {
        const index = $(this).closest('.anexo-item').index();
        anexos.splice(index, 1);
        $(this).closest('.anexo-item').remove();
    });

    // Função para visualizar anexo
    $(document).on('click', '.btnVisualizarAnexo', function () {
        const index = $(this).closest('.anexo-item').index();
        const anexo = anexos[index];
        const url = URL.createObjectURL(anexo);
        const a = document.createElement('a');
        a.href = url;
        a.download = anexo.name;
        a.click();
        URL.revokeObjectURL(url);
    });

//Salvar Fornecedor
    // Função para salvar fornecedor e gerar JSON
    $('#salvarFornecedor').click(function () {
        if ($('#cadastroForm')[0].checkValidity()) {
            $('#loadingModal').modal('show');

            const fornecedor = {
                razaoSocial: $('#razaoSocial').val(),
                cnpj: $('#cnpj').val(),
                nomeFantasia: $('#nomeFantasia').val(),
                inscricaoEstadual: $('#inscricaoEstadual').val(),
                inscricaoMunicipal: $('#inscricaoMunicipal').val(),
                endereco: $('#endereco').val(),
                bairro: $('#bairro').val(),
                municipio: $('#municipio').val(),
                estado: $('#estado').val(),
                nomeContato: $('#nomeContato').val(),
                telefone: $('#telefone').val(),
                email: $('#email').val(),
                produtos: [],
                anexos: []
            };

            $('.produto-item').each(function () {
                fornecedor.produtos.push({
                    descricao: $(this).find('#produto').val(),
                    codigo: $(this).find('#codigo').val(),
                    unidadeMedida: $(this).find('#unidadeMedida').val(),
                    quantidade: $(this).find('#quantidade').val(),
                    valorUnitario: $(this).find('#valorUnitario').val(),
                    valorTotal: $(this).find('#valorTotal').val()
                });
            });

            anexos.forEach(anexo => {
                fornecedor.anexos.push({
                    nome: anexo.name,
                    tipo: anexo.type,
                    tamanho: anexo.size
                });
            });

            console.log(JSON.stringify(fornecedor, null, 4));

            setTimeout(() => {
                $('#loadingModal').modal('hide');
                alert('Dados enviados com sucesso!');
            }, 2000);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
});
