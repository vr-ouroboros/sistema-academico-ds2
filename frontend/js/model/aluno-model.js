/*
* MODEL DE ALUNOS
*
* O Model é responsável:
*  - pelos dados dos alunos;
*  - pelas validações;
*  - pelas regras do cadastro.
* 
*  Ele não deve utulizar prompt(), alert(), console.log()
* ou manipula elementos HTML.
*/

const AlunoModel ={
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

    cadastrar(dados) {
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
            id: AlunoModel.alunos.length + 1,
            ra: ra,
            nome: nome,
            email: email,
            turma: turma,

            ativo: true
        };
        AlunoModel.alunos.push(aluno);

        return {
            sucesso: true,
            aluno: aluno
        };
    },

    listar() {
        return [...AlunoModel.alunos];
    }
};