/*
* CONTROLLER DE ALUNOS - VERSÃO 0.3
* 
* O Controller agora utiliza o Service.
* 
* Ele não acessa diretamente:
* - o array;
* - o localStorage;
* - o Model;
*/

const AlunoController = {
    
    iniciar() {

        alunoView.inicializar();

        alunoView.configurarFormulario(function (dados) {
            AlunoController.cadastrar(dados);
        });

        AlunoView.configurarBotaoLimpar(function() {
            AlunoController.limparDados();
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

    limparDados() {
        const alunos = AlunoService.listar();

        if(alunos.lenght === 0) {
            AlunoView.exibirErro("Não existem alunos para remover.");

            return;
        }

        const confirmou = AlunoView.confirmarLimpeza();

        if(!confirmou) {
            return;
        }

        AlunoService.limpar();

        AlunoView.exibirSucesso("Todos os alunos foram removidos.");
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