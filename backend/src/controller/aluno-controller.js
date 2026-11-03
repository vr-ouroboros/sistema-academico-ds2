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

import AlunoModel from "../model/aluno-model.js";

const AlunoController = {
    listar (req, res) {
        const alunos = AlunoModel.listar();

        return res.status(200).json({
            total: alunos.length,
            dados: alunos
        });
    },

    cadastrar(req, res) {

        const dados = req.body;
        const resultado = AlunoModel.cadastrar(dados);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({
                sucesso: false,
                mensagem: resultado.mensagem
            });
        }

        return res.status(201).json({
            sucesso: true,
            mensagem: "Aluno cadastrado com sucesso.",
            dados: resultado.aluno
        });
    }
};

export default AlunoController;