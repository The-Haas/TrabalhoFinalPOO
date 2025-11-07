// classe Livro
class Livro {
  //da pra declarar os atributos direto no construtor assim não precisa declarar separado antes do constructor
  constructor(
    private _id: number,
    private _titulo: string,
    private _autor: string,
    private _ano: number,
    private _categoria: string,
    private _quantidade: number,
    private _preco: number
  ) {}

  private _disponiveis: number = this._quantidade;

  // geters pra encapsulamento pra deixar tudo dentro da classe
  get id() { return this._id; }
  get titulo() { return this._titulo; }
  get autor() { return this._autor; }
  get categoria() { return this._categoria; }
  get disponiveis() { return this._disponiveis; }
  get preco() { return this._preco; }

  // atualiza a quantidade de livros disponiveis
  emprestar(): boolean {
    if (this._disponiveis > 0) {
      this._disponiveis--;
      return true;
    }
    return false;
  }

  devolver(): void {
    this._disponiveis++;
  }
}

// classe usuario
class Usuario {
  //declarando os atributos dentro do constructor
  constructor(
    private _id: number,
    private _nome: string,
    private _cpf: string,
    private _tipo: "estudante" | "professor" | "comum",
    private _telefone: string
  ) {}

  private _ativo: boolean = true;
  private _multas: number = 0;

  get id() { return this._id; }
  get nome() { return this._nome; }
  get tipo() { return this._tipo; }
  get ativo() { return this._ativo; }
  get multas() { return this._multas; }

  adicionarMulta(valor: number) { this._multas += valor; }
  desativar() { this._ativo = false; }
}

// classe de emprestimo
class Emprestimo {
  private devolvido: boolean = false;
  private multa: number = 0;

  constructor(
    public readonly id: number,
    public readonly usuario: Usuario,
    public readonly livro: Livro,
    public readonly dias: number,
    public readonly tipo: "normal" | "renovacao" | "expresso",
    public readonly taxaMultaDiaria: number
  ) {
    this.dataEmprestimo = new Date();
    this.dataDevolucao = new Date();
    this.dataDevolucao.setDate(this.dataDevolucao.getDate() + dias);
  }

  private dataEmprestimo: Date;
  private dataDevolucao: Date;

  // calcula multa se tiver atraso
  calcularMulta(): number {
    const hoje = new Date();
    if (hoje > this.dataDevolucao) {
      const diasAtraso = Math.floor(
        (hoje.getTime() - this.dataDevolucao.getTime()) / (1000 * 3600 * 24)
      );
      this.multa = diasAtraso * this.taxaMultaDiaria;
      this.usuario.adicionarMulta(this.multa);
    }
    return this.multa;
  }

  finalizarDevolucao() {
    this.devolvido = true;
    this.livro.devolver();
  }

  exibirComprovante() {
    console.log("\nCOMPROVANTE DE EMPRÉSTIMO");
    console.log(`Usuário: ${this.usuario.nome}`);
    console.log(`Livro: ${this.livro.titulo}`);
    console.log(`Data devolução: ${this.dataDevolucao.toLocaleDateString()}`);
    console.log(`Tipo: ${this.tipo}`);
  }
}

// classe biblioteca
class Biblioteca {
  private livros: Livro[] = [];
  private usuarios: Usuario[] = [];
  private emprestimos: Emprestimo[] = [];

  // meetodo para adicionar livros
  adicionarLivro(livro: Livro) {
    this.livros.push(livro);
  }
  // metodo para cadastrar usuarios
  cadastrarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  //get dos livros por id
  buscarLivroPorId(id: number): Livro | undefined {
    return this.livros.find(l => l.id === id);
  }

  //get dos usuarios por id
  buscarUsuarioPorId(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  // metodo para realizar emprestimo
  realizarEmprestimo(
    usuarioId: number,
    livroId: number,
    dias: number,
    tipo: "normal" | "renovacao" | "expresso"
  ) {
    const usuario = this.buscarUsuarioPorId(usuarioId);
    const livro = this.buscarLivroPorId(livroId);

    if (!usuario || !livro) {
      console.log("Usuario ou livro não encontrado!");
      return;
    }

    if (!usuario.ativo) {
      console.log("Usuario inativo!");
      return;
    }

    if (usuario.multas > 0) {
      console.log(`Usuario possui multa pendente de R$${usuario.multas.toFixed(2)}`);
      return;
    }

    if (!livro.emprestar()) {
      console.log("Livro indisponivel para empréstimo!");
      return;
    }

    let taxa = tipo === "expresso" ? 5 : tipo === "renovacao" ? 1 : 0.5;
    const emprestimo = new Emprestimo(
      this.emprestimos.length + 1,
      usuario,
      livro,
      dias,
      tipo,
      taxa
    );
    this.emprestimos.push(emprestimo);
    emprestimo.exibirComprovante();
  }
  // metodo para realizar devolucao do livro
  realizarDevolucao(id: number) {
    const emprestimo = this.emprestimos.find(e => e.id === id);
    if (!emprestimo) return console.log("Emprestimo não encontrado!");

    const multa = emprestimo.calcularMulta();
    emprestimo.finalizarDevolucao();

    console.log(`\nDEVOLUÇÃO REALIZADA COM SUCESSO`);
    console.log(`Multa: R$${multa.toFixed(2)}\n`);
  }
  // metodo para gerar relatorio
  gerarRelatorio() {
    console.log("\nRELATÓRIO DA BIBLIOTECA");
    console.log(`Livros cadastrados: ${this.livros.length}`);
    console.log(`Usuários cadastrados: ${this.usuarios.length}`);
    console.log(`Empréstimos realizados: ${this.emprestimos.length}`);
  }
}

// simulando
const biblioteca = new Biblioteca();

// Adiciona livros
biblioteca.adicionarLivro(new Livro(1, "Clean Code", "Robert Martin", 2008, "Tecnologia", 3, 89.9));
biblioteca.adicionarLivro(new Livro(2, "1984", "George Orwell", 1949, "Ficção", 2, 45));

// Cadastra usuários
biblioteca.cadastrarUsuario(new Usuario(1, "Ana Silva", "12345678901", "estudante", "48999999999"));
biblioteca.cadastrarUsuario(new Usuario(2, "Carlos Santos", "98765432100", "professor", "48988888888"));

// Testes
biblioteca.realizarEmprestimo(1, 1, 10, "normal");
biblioteca.realizarEmprestimo(2, 2, 5, "expresso");

biblioteca.realizarDevolucao(1);
biblioteca.gerarRelatorio();

/*
aplicado abstração: Criado classes Livro, Usuário, Emprestimo, Biblioteca
aplicado encapsulamento: Os atributos sensiveis são privados e acessados por getters.
aplicado coesão pois cada classe tem sua função clara.

se o código original não fosse refatorado, seria difícil de dar manutenção testar e entender e o risco de bugs e erros seria maior.
*/
