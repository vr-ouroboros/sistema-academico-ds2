/*
* O Controller recebe as solicitações encaminhadas
* pelas rotas e coordena a execução da aplicação.
* 
* Ele faz a ligação entre:
* 
* - requisição HTTP;
* - Model;
* - resposta JSON.
*/
const AlunoController = {
    listar (req, res) {
        const alunos = AlunoModel.listar();

        enviarJson(res, 200, {
            total: alunos.lenght,
            dados: alunos
        });
    },

    async cadastrar(req, res) {
        try {
            const dados = await lerCorpoJson(req);
            const resultado = AlunoModel.cadastrar(dados);

            if (!resultado.sucesso) {
                enviarJson(res, resultado.status, {
                    sucesso: false,
                    mensagem: resultado.mensagem
                });

                return;
            }

            enviarJson(res, resultado.status, {
                sucesso: true,
                mensagem: "Aluno cadastrado com sucesso.",
                dados: resultado.aluno
            });
        } catch (erro) {
            enviarJson(res, 400, {
                sucesso: false,
                mensagem: "O corpo da requisição contém um JSON inválido."
            });
        }
    }
};

export default AlunoController;