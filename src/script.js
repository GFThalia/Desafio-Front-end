$(document).ready(function () {
    let contadorProdutos = 1;

    // Preenche o endereço automaticamente usando a API via CEP
    $('#cep').on('blur', function () {
        const cep = $(this).val().replace(/\D/g, '');

        if (cep.length === 8) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/?callback=?`, function (data) {
                if (!data.erro) {
                    $('#endereco').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#municipio').val(data.localidade);
                    $('#estado').val(data.uf);
                } else {
                    alert('CEP não encontrado.');
                }
            });
        } else {
            alert('CEP inválido.');
        }
    });

    
    // Função para calcular o valor total
    function calcularValorTotal(event) {
        const produtoItem = $(event.target).closest('.produto-item');
        const quantidade = produtoItem.find('#quantidade').val();
        const valorUnitario = produtoItem.find('#valorUnitario').val();
        const valorTotal = produtoItem.find('#valorTotal');
    
        valorTotal.val(quantidade && valorUnitario ? (quantidade * valorUnitario).toFixed(2) : '');
    }
    


    // Adiciona produto à lista
    $('#adicionarProduto').click(function () {

        const produto = $('#produto').val();
        const codigo = $('#codigo').val();
        const unidadeMedida = $('#unidadeMedida').val();
        const quantidade = $('#quantidade').val();
        const valorTotal = $('#valorTotal').val();

        if (produto && codigo && unidadeMedida && quantidade && valorTotal) {
           // contadorProdutos++;
            
            let produtoItem = `<div class="produto-item">

            
                <div class="section-and-button">
                        
                    <!-- Botão de excluir -->
                    <div class="section-delete-button">
                    <button type="button" class="btn btn-danger btn-sm" id="btnExcluirProduto" title="Excluir produto">
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
            
        } else {
            alert('Preencha todos os campos do produto.');
        }
    });

    // Reseta os campos do produto
    function resetarCamposProduto() {
        $('#produto').val('');
        $('#codigo').val('');
        $('#unidadeMedida').val('');
        $('#quantidade').val('');
        $('#valorUnitario').val('');
        $('#valorTotal').val('');
    }

    // Excluir produto
    $('#produtosLista').on('click', '.btn-danger', function () {
        if ($('.produto-item').length > 1) {
           $(this).closest('.produto-item').remove();
        } else {
            alert('Você não pode remover todos os produtos!');
        }
    }

    // Incluir anexos
    $('#incluirAnexos').click(function () {
        const anexoItem = `<div class="anexo-item">
            <div class="anexos">
                <div class="section-visualizar-button">
                    <!-- Botão de visualizar -->
                    <button class="btn btn-primary btn-sm" id="btnVisualizarProduto" title="Visualizar produto">
                    <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="section-delete-button">
                <!-- Botão de excluir -->
                    <button class="btn btn-danger btn-sm" id="btnExcluirProduto" title="Excluir produto">
                    <i class="fas fa-trash"></i>
                </button>
                </div>
            </div>
            <div class="anexos">
            <span>Documento ${$('#anexosLista .anexo-item').length + 1}</span>
            <div class="anexos">
            </div>`;
        $('#anexosLista').append(anexoItem);
    });

    // Evento de clique para o botão de visualizar
    $('#anexosLista').on('click', '.btn-visualizar', function () {
        const url = $(this).data('url');
        if (url) {
            const a = document.createElement('a');
            a.href = url;
            a.download = ''; // O nome do arquivo pode ser especificado aqui
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('URL do arquivo não especificada.');
        }
});

    // Excluir anexo
    $('#anexosLista').on('click', '.btn-danger', function () {
        $(this).closest('.anexo-item').remove();
    });
    

    // Salvar fornecedor
    $('#salvarFornecedor').click(function () {
        const produtosCount = $('#produtosLista .produto-item').length;
        const anexosCount = $('#anexosLista .anexo-item').length;

        if (produtosCount === 0) {
            alert('É necessário incluir pelo menos um produto.');
            return;
        }

        if (anexosCount === 0) {
            alert('É necessário incluir pelo menos um documento.');
            return;
        }

        $('#loadingModal').modal('show');
        setTimeout(function () {
            $('#loadingModal').modal('hide');
            gerarJson();
        }, 2000);
    });

    // Gera JSON dos dados preenchidos
    function gerarJson() {
        const fornecedor = {
            razaoSocial: $('#razaoSocial').val(),
            cnpj: $('#cnpj').val(),
            nomeFantasia: $('#nomeFantasia').val(),
            inscricaoEstadual: $('#inscricaoEstadual').val(),
            cep: $('#cep').val(),
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

        $('#produtosLista .produto-item').each(function () {
            const produto = $(this).text().split(' - ');
            fornecedor.produtos.push({
                descricao: produto[0],
                codigo: produto[1],
                unidadeMedida: produto[2],
                quantidade: parseFloat(produto[3].split(': ')[1]),
                valorTotal: parseFloat(produto[4].replace('R$ ', ''))
            });
        });

        $('#anexosLista .anexo-item').each(function () {
            fornecedor.anexos.push($(this).text().trim());
        });

        console.log(JSON.stringify(fornecedor, null, 2));

        // Opcional: Download do JSON
        const blob = new Blob([JSON.stringify(fornecedor, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "fornecedor.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

