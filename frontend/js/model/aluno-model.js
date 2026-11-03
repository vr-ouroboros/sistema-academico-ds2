/*
* O Model do frontend representa e valida os dados
* que serão enviados para a API.
* 
* A validação do frontend melhora a experiência
* do usuário, mas não substitui a validação realizada
* pelo backend.
*/

const AlunoModel = {

    normalizarTexto(valor) {
        if (valor == null || valor == undefined) {
            return "";
        }
        return String(valor).trim();
    },

    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },


    validar(dados) {

        const aluno = {
            ra: AlunoModel.normalizarTexto(dados.ra),
            nome: AlunoModel.normalizarTexto(dados.nome),
            email: AlunoModel.normalizarTexto(dados.email).toLocaleLowerCase(),
            curso: AlunoModel.normalizarTexto(dados.curso),
            turma: AlunoModel.normalizarTexto(dados.turma)
        };

        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        if (!AlunoModel.validarEmail(aluno.email)) {
            return {
                sucesso: false,
                mensagem: "O e-mail informado é inválido."
            };
        }

        return {
            sucesso: true,
            dados: aluno
        };
    }
};