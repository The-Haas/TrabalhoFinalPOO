// classe Livro vai representar cada livro da biblioteca
class Livro {

    // atributos privados do livro pra não acessar de fora
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: number;
    private disponivel: boolean;


    //constructor pra quando instanciar um livro, já passar os atributos necessários pra instanciar
    constructor(titulo: string, autor: string, editora: string, anoPublicacao: number, disponivel: boolean = true) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = disponivel;
    }

    // getters pra acessar os atributos privados
    public getTitulo(): string {
        return this.titulo;
    }

    public getAutor(): string {
        return this.autor;
    }

    public isDisponivel(): boolean {
        return this.disponivel;
    }

    // metodo publico pra acessar de fora que vai emprestar o livro se estiver disponível
    public emprestar(): boolean {
        if (this.disponivel) {
            this.disponivel = false;
            console.log(`O livro "${this.titulo}" foi emprestado com sucesso.`);
            return true;
        } else {
            console.log(`O livro "${this.titulo}" já está emprestado.`);
            return false;
        }
    }

    // metodo que devolve o livro
    public devolver(): void {
        if (!this.disponivel) {
            this.disponivel = true;
            console.log(`O livro "${this.titulo}" foi devolvido.`);
        } else {
            console.log(`O livro "${this.titulo}" já estava disponível!`);
        }
    }
}

// classe membro é uma pessoa que pega livros emprestados
class Membro {

    //atributos privados do membro pra não acessar de fora
    private livrosEmprestados: Livro[] = [];
    private nome: string;
    private identificacao: string;

    constructor(nome: string, identificacao: string) {
        this.nome = nome;
        this.identificacao = identificacao;
    }

    public getNome(): string {
        return this.nome;
    }

    public pegarEmprestado(livro: Livro): void {
        if (livro.emprestar()) {
            this.livrosEmprestados.push(livro);
            console.log(`${this.nome} agora possui o livro "${livro.getTitulo()}".`);
        } else {
            console.log(`${this.nome} não conseguiu pegar "${livro.getTitulo()}".`);
        }
    }

    public devolverLivro(livro: Livro): void {
        const index = this.livrosEmprestados.indexOf(livro);

        if (index !== -1) {
            this.livrosEmprestados.splice(index, 1);
            livro.devolver();
            console.log(`${this.nome} devolveu "${livro.getTitulo()}".`);
        } else {
            console.log(`${this.nome} não possui o livro "${livro.getTitulo()}".`);
        }
    }
}

// criando os 4 livros
const livro1 = new Livro("Livro 1", "Autor 1", "Editora 1", 2001);
const livro2 = new Livro("Livro 2", "Autor 2", "Editora 2", 2002);
const livro3 = new Livro("Livro 3", "Autor 3", "Editora 3", 2003);
const livro4 = new Livro("Livro 4", "Autor 4", "Editora 4", 2004);

// criando os 3 membros
const membro1 = new Membro("Igor", "001");
const membro2 = new Membro("Bruno", "002");
const membro3 = new Membro("Felipe", "003");

console.log("Iniciando as operaçoes");

// operações dos métodos criados
membro1.pegarEmprestado(livro1);
membro1.pegarEmprestado(livro2);
membro1.pegarEmprestado(livro2);

membro2.pegarEmprestado(livro2);
membro2.pegarEmprestado(livro3);
membro2.devolverLivro(livro3);

membro3.pegarEmprestado(livro3);
membro3.pegarEmprestado(livro4);

membro1.devolverLivro(livro1);
membro2.pegarEmprestado(livro1);
membro2.devolverLivro(livro4);