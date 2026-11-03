import http from "node:http";
import { tratarRotas } from "./routes/aluno-routes.js";
import { enviarJson } from "./utils/http.js";

const PORTA = Number(process.env.PORTA) || 3000;
const HOST = "0.0.0.0";

const servidor = http.createServer(async (req, res) => {
    try {
        const rotaEncontrada = await tratarRotas(req, res);

        if (!rotaEncontrada) {
            enviarJson(res, 404, {
                sucesso: false,
                mensagem: "Rota não encontrada."
            });
        }
    } catch (erro) {
        console.error("Erro interno do servidor.", erro);
        enviarJson(req, 500, {
            sucesso: false,
            mensagem: "Erro interno do servidor."
        });
    }
});

servidor.listen(PORTA, HOST, () => {
    console.log(`Servidor disponível em http://localhost:${PORTA}`);
});