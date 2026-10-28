/*
* VIEW DE ALUNOS - VERSÃO 0.3
*
* A View continua responsável pelo DOM e pelos eventos.
* 
*/

const AlunoView = {
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
        AlunoView.elementos.botaoLimpar = document.getElementById("btn-limpar-dados");
    },
    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const dados = AlunoView.lerDados();
            aoEnviar(dados);
        })
    },
    configurarBotaoLimpar(aoLimpar) {
        AlunoView.elementos.botaoLimpar.addEventListener("click", function() {
            aoLimpar();
        });
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

    confirmarLimpeza() {
        return confirm("Deseja remover todos os alunos cadastrados?");
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