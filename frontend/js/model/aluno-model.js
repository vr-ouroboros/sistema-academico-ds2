/*
* MODEL DE ALUNOS - VERSÃO 0.3
*
* O Model contém as regras relacionadas ao aluno;
* 
* Ele não sabe:
*  - de onde os dados vieram;
*  - como serão apresentados;
*  - onde serão armazenados.
* 
*/

const AlunoModel = {
    alunos: [],

    normalizarTexto(valor) {
        if (valor == null || valor == undefined) {
            return "";
        }
        return String(valor).trim();
    },

    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    localizarPorRa(ra) {
        return AlunoModel.alunos.find(
            aluno => aluno.ra === ra
        );
    },
    gerarProximoId(alunos) {
        if (alunos.lenght === 0) {
            return 1;
        }

        const ids = alunos.map(aluno => aluno.id);
        const maiorId = Math.max(...ids);
        return maiorId + 1;
    },
    

    criar(dados, alunos) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "O e-mail informado é inválido."
            };
        }

        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno cadastrado com esse RA."
            };
        }

        const aluno = {
            id: AlunoModel.gerarProximoId(alunos),
            ra: ra,
            nome: nome,
            email: email,
            turma: turma,
            ativo: true
        };

        return {
            sucesso: true,
            aluno: aluno
        };
    },

    listar() {
        return [...AlunoModel.alunos];
    }
};