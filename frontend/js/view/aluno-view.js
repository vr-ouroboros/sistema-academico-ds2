/*
* VIEW DE ALUNOS
*
* A View é responsável pela interação com o usuário.
* 
* Nesta primeira versão, ela utiliza:
* - prompt() para receber informações;
* - confirm() para fazer uma pergunta;
* - console.log() para apresentar mensagens;
* - console.table() para apresentar objetos e arrays;
* - console.error() para apresentar erros.
* 
* A View não deve:
* - validar o e-mail;
* - verificar RA duplicado;
* - cadastrar o aluno;
* - armazenar os dados;
* - aplicar regras de negócio.
* 
* Essas responsabilidades pertencem ao Model.
*/

const AunoView = {

    lerDados() {
        return {
            ra: prompt("Digite o RA do aluno:"),
            nome: prompt("Digite o nome do aluno:"),
            email: prompt("Digite o e-mail do aluno:"),
            curso: prompt("Digite o curso:"),
            turma: prompt("Digite a turma:")
        };
    },

    exibirAluno(aluno) {

        console.log("Aluno cadastrado com sucesso.");
        console.table(aluno);
    },

    exibirErro(mensagem) {
        console.error("Erro:", mensagem)
    },

    perguntarNovoCadastro() {
        return confirm("Deseja cadastrar outro aluno?");
    },

    exibirLista(alunos) {
        console.log(
            "Quantidade de alunos cadastrados:", alunos.lenght
        );

        if (alunos.lenght === 0) {
            console.log("Nenhum aluno foi cadastrado.");

            return;
        }

        console.table(alunos);
    },

    exibirJson(textoJson) {
        console.log("Alunos em formato JSON:");

        console.log(textoJson);
    },

    exibirDadosRecuperados(dados) {
        console.log("Dados reconstruidos com JSON.parse():");
        console.table(dados);
    }
};