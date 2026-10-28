/*
* SERVICE DE ALUNOS
*
* O Service coordenada a utilização do Model
* e a persistência dos dados.
* 
* Nesta versão, a persistência utiliza localStorage.
* 
* Em uma versão futura, este arquivo utilizará fetch()
* para se comunicar com a API.
*/

const AlunoService = {
    CHAVE_STORAGE: "sistema-academico-ds2:alunos",

    listar() {
        const textoJson = localStorage.getItem(AlunoService.CHAVE_STORAGE);

        if (textoJson === null) {
            return [];
        }

        try {
            const dados = JSON.parse(textoJson);

            if (!Array.isArray(dados)) {
                return [];
            }

            return dados;
        } catch (erro) {
            localStorage.removeItem(AlunoService.CHAVE_STORAGE);

            return [];
        }
    },

    salvar(alunos) {
        const textoJson = JSON.stringify(alunos);

        localStorage.setItem(AlunoService.CHAVE_STORAGE, textoJson);
    },

    cadastrar(dados) {
        const alunos = AlunoService.listar();

        const resultado = AlunoModel.criar(dados, alunos);

        if(!resultado.sucesso) {
            return resultado;
        }

        alunos.push(resultado.aluno);

        AlunoService.salvar(alunos);

        return resultado;
    },

    limpar() {
        localStorage.removeItem(AlunoService.CHAVE_STORAGE);
    }
};