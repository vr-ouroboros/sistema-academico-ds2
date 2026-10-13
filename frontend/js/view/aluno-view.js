/*
* VIEW DE ALUNOS - VERSÃO COM DOM
*
* A View é responsável por:
* - localizar elementos HTML;
* - ler os campos do formulário;
* - observar o evento submit;
* - apresentar mensagens;
* - montar a tabela;
* - apresentar o JSON
*/

const AunoView = {
    elementos: {},

    inicializar() {
        AlunoView.elementos.formulario = document.getElementById("form-aluno");
        AlunoView.elementos.ra = document.getElementById("ra");
        AlunoView.elementos.nome = document.getElementById("nome");
        AlunoView.elementos.email = document.getElementById("email");
        AlunoView.elementos.curso = document.getElementById("curso");
        AlunoView.elementos.turma = document.getElementById("turma");
        AlunoView.elementos.mensagem = document.getElementById("mensagem");
        AlunoView.elementos.corpoTabela = document.getElementById("corpo-tabela-alunos");
        AlunoView.elementos.totalAlunos = document.getElementById("total-alunos");
        AlunoView.elementos.saidaJson = document.getElementById("saida-json");
    },
    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const dados = AlunoView.lerDados();
            aoEnviar(dados);
        })
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

    exibirSucesso(mensagem) {
        AlunoView.elementos.mensagem.textContent = mensagem;
        AlunoView.elementos.mensagem.className = "mensagem-sucesso";
    },

    exibirErro(mensagem) {
        AlunoView.elementos.mensagem.textContent = mensagem;
        AlunoView.elementos.mensagem.className = "mensagem-erro";
    },

    limparFormulario() {
        AlunoView.elementos.formulario.reset();
        AlunoView.elementos.ra.focus();
    },

    exibirLista(alunos) {
        const corpoTabela = AlunoView.elementos.corpoTabela;
        corpoTabela.textContent = "";
        AlunoView.elementos.totalAlunos.textContent = `Total: ${alunos.lenght}`;

        if (alunos.lenght === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 7;
            celula.textContent = "Nenhum aluno foi cadastrado.";

            linha.appendChild(celula);
            corpoTabela.appendChild(linha);

            return;
        }

        alunos.forEach(function (aluno) {
            const linha = document.createElement("tr");

            const valores = [
                aluno.id,
                aluno.ra,
                aluno.nome,
                aluno.email,
                aluno.curso,
                aluno.turma,
                aluno.ativo ? "Ativo" : "Inativo"
            ];

            valores.forEach(function (valor) {
                const celula = document.createElement("td");

                celula.textContent = valor;
                linha.appendChild(celula);
            });
            corpoTabela.appendChild(linha);
        });
    },

    exibirJson(textoJson) {
        AlunoView.elementos.saidaJson.textContent = textoJson;
    },
};