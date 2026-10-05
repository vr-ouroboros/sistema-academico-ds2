/*
* CONTROLLER DE ALUNOS
*
* O Controller coordena o funcionamento da aplicação.
* 
* Ele é resonsável por:
* - solicitar dados à View;
* - enviar os dados ao Model;
* - receber o resultado do Model;
* - decidir qual método da View será executado;
* - controlar a repetição dos cadastros;
* - coordenar a conversão dos dados para JSON.
* 
* O Controller não deve:
* - validar campos;
* - verificar RA duplicado;
* - armazena alunos;
* - apresentar diretamente mensagens no controle.
*/

const AlunoController = {
    
    iniciar() {
        let continuar = true;

        while (continuar) {
            const dados = AlunoView.lerDados();

            const resultado = AlunoModel.cadastrar(dados);

            if (resultado.sucesso) {

                AlunoView.exibirAluno(resultado.aluno)
            } else {

                AlunoView.exibirErro(resultado.mensagem);
            }

            continuar = AlunoView.perguntarNovoCadastro();
        }

        const alunos = AlunoModel.listar();

        AlunoView.exibirLista(alunos);

        AlunoView.exibirJson(textoJson);

        const dadosRecuperados = JSON.parse(textoJson);

        AlunoView.exibirDadosRecuperados(dadosRecuperados);
    }
};

AlunoController.iniciar();