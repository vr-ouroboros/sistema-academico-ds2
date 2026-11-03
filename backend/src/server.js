import app from "./app.js";

const PORTA = Number(process.env.PORTA) || 3000;
const HOST = "0.0.0.0";

app.listen(PORTA, HOST, () => {
    console.log(
        `Servidor Express disponível em` +
        `http://localhost:${PORTA}`
    );
});