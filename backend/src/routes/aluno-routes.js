import AlunoController from "../controller/aluno-controller";

import {
    enviarJson,
    enviarSemConteudo
} from "../utils/http.js";

export async function tratarRotas(req, res) {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    const caminho = url.pathname;
    const metodo = req.method;

    if (metodo === "OPTIONS") {
        enviarSemConteudo(res);
        return true;
    }

    if (metodo === "GET" && caminho === "/api/alunos") {
        AlunoController.listar(req, res);
        return true;
    }

    if (metodo === "POST" && caminho === "/api/alunos") {
        await AlunoController.cadastrar(req, res);
        return true;
    }

    return false;
}