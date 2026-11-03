/*
* Este objeto contém os cabeçalhos relacionados ao CORS.
*
* Esses cabeçalhos permitem que um frontend executado
* em outro endereço faça requisições para o backend.
* 
* Exemplo:
* 
* Frontend: http://127.0.0.1:5500
* Backend: http://localhost:3000
*/
const cabecalhoCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

export function enviarJson(res, status, dados) {
    const textoJson = JSON.stringify(dados, null, 2);
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        ...cabecalhoCors
    });
    res.end(textoJson);
}

export function lerCorpoJson(req) {
    return new Promise((resolve, reject) => {
        let corpo = "";
        req.on("data", parte => {
            corpo += parte;
        });

        req.on("end", () => {
            if (corpo.trim() === "") {
                resolve({});
                return;
            }

            try {
                const dados = JSON.parse(corpo);
                resolve(dados);
            } catch (erro) {
                reject(erro);
            }
        });
        
        req.on("error", erro => {
            reject(erro);
        });
    });
}