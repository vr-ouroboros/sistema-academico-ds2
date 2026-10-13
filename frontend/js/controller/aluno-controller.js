/*
* CONTROLLER DE ALUNOS - VERSÃO COM DOM
* 
* O Controller:
* - inicia a aplicação;
* - conecta o formulário à operação de cadastro;
* - envia os dados ao Model;
* - analisa o resultado;
* - solicita a atualização da View;
* - coordenar a conversão dos dados para JSON.
*/

const AlunoController = {
    
    iniciar() {

        alunoView.inicializar();

        alunoView.configurarFormulario(function (dados) {
            AlunoController.cadastrar(dados);
        });

        AlunoController.atualizarVisualizacao()
    },

    cadastrar(dados) {
        const resultado = AlunoModel.cadastrar(dados);

        if(!resultado.sucesso) {
            AlunoView.exibirErro(resultado.mensagem);
            return;
        }

        AlunoView.exibirSucesso(`Aluno ${resultado.aluno.nome} cadastrado com sucesso.`);

        AlunoView.limparFormulario();
        AlunoController.atualizarVisualizacao();
    },

    atualizarVisualizacao() {
        const alunos = AlunoModel.listar();
        alunoView.exibirLista(alunos);
        const textoJson = JSON.stringify(alunos, null, 2);

        AlunoView.exibirJson(textoJson);
    }
};

AlunoController.iniciar();