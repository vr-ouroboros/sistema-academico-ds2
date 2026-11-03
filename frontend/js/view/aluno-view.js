/*
* A View é responsável pela interface.
*
* Ela lê o formulário, apresenta mensagens,
* atualiza a tabela e exibe o JSON.
*/

const AlunoView = {
    elementos: {},

    iniciar() {
        AlunoView.elementos.formulario = document.querySelector("#form-aluno");
        AlunoView.elementos.ra = document.querySelector("#ra");
        AlunoView.elementos.nome = document.querySelector("#nome");
        AlunoView.elementos.email = document.querySelector("#email");
        AlunoView.elementos.curso = document.querySelector("#curso");
        AlunoView.elementos.turma = document.querySelector("#turma");
        AlunoView.elementos.mensagem = document.querySelector("#mensagem");
        AlunoView.elementos.corpoTabela = document.querySelector("#corpo-tabela-alunos");
        AlunoView.elementos.saidaJson = document.querySelector("#saida-json");
        AlunoView.elementos.botaoSalvar = document.querySelector("#botao-salvar");
    },
    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener("submit", aoEnviar);
    },

    lerDados() {
        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value
        };
    },

    exibirMensagem(mensagem, tipo) {
        AlunoView.elementos.mensagem.textContent = mensagem;

        AlunoView.elementos.mensagem.className = `mensagem ${tipo}`;
    },

    criarCelula(valor) {
        const celula = document.createElement("td");
        celula.textContent = valor;

        return celula;
    },

    exibirLista(alunos) {
        AlunoView.elementos.corpoTabela.innerHTML = "";

        if (alunos.length === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 7;
            celula.textContent = "Nenhum aluno foi cadastrado.";

            linha.appendChild(celula);
            AlunoView.elementos.corpoTabela.appendChild(linha);

            return;
        }

        alunos.forEach(aluno => {
            const linha = document.createElement("tr");

            linha.appendChild(AlunoView.criarCelula(aluno.id));
            linha.appendChild(AlunoView.criarCelula(aluno.ra));
            linha.appendChild(AlunoView.criarCelula(aluno.nome));
            linha.appendChild(AlunoView.criarCelula(aluno.email));
            linha.appendChild(AlunoView.criarCelula(aluno.curso));
            linha.appendChild(AlunoView.criarCelula(aluno.turma));

            linha.appendChild(AlunoView.criarCelula(aluno.ativo ? "Sim" : "Não"));

            AlunoView.elementos.corpoTabela.appendChild(linha);
        });
    },

    exibirJson(alunos) {
        AlunoView.elementos.saidaJson.textContent = JSON.stringify(alunos, null, 2);
    },

    limparFormulario() {
        AlunoView.elementos.formulario.reset();
        AlunoView.elementos.ra.focus();
    },

    alterarEstadoFormulario(processando) {
        AlunoView.elementos.botaoSalvar.disabled = processando;

        AlunoView.elementos.botaoSalvar.textContent = processando ? "Salvando..." : "Cadastrar aluno";
    }
};