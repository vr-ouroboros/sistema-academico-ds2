/*
* O AlunoService é responsável pela comunicação
* entre o frontend e a API.
* 
* O Controller não precisa conhecer os detalhes
* do fetch(), dos cabeçalhos ou da conversão do JSON.
* 
*/

const AlunoService = {
    URL_API: "http://localhost:3000/api/alunos",

    async processarResposta(resposta) {
        let resultado;

        try {
            resultado = await resposta.json();
        } catch {
            throw new Error("O servidor retornou uma resposta inválida.");
        }

        if (!resposta.ok) {
            throw new Error(resultado.mensagem || "Não foi possível concluir a operação.");
        }

        return resultado;
    },

    async requisitar(opcoes = {}) {
        let resposta;

        try {
            resposta = await fetch(AlunoService.URL_API, opcoes);
        } catch (erro) {
            throw new Error("Não foi possível conectar ao servidor");
        }

        return AlunoService.processarResposta(resposta);
    },

    async listar() {
        const resultado = await AlunoService.requisitar({
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        return resultado.dados;
    },

    async cadastrar(aluno) {
        return AlunoService.requisitar({
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });
    }
};