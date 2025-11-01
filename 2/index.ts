// classe abstrata
abstract class Funcionario {
    // atributos comuns a todos os funcionarios
    // da pra declarar os atributos direto no constructor
    constructor(
        public nome: string,
        public salario: number,
        public identificacao: string
    ) { }

    // metodo abstrato pois cada tipo de funcionario calcula seu salario de forma diferente
    abstract calcularSalario(): number;

    // metodo comum para exibir informacoes basicas
    exibirInfo(): void {
        console.log(`Funcionario: ${this.nome} | ID: ${this.identificacao}`);
    }
}

// classe gerente
class Gerente extends Funcionario {
    //gerente ganha 20% de bonus sobre salario base
    calcularSalario(): number {
        //chama o metodo pra calcular o salario base e adiciona o bonus
        return this.salario + this.salario * 0.2;
    }
}


// classe dev
class Desenvolvedor extends Funcionario {
    // cada dev tem um nemero de projetos entregues
    //constructor com atributos adicionais
    constructor(
        nome: string,
        salario: number,
        identificacao: string,
        public projetosEntregues: number
    ) {
        super(nome, salario, identificacao);
    }

    // salário é base + 10% de benus por projeto entregue
    calcularSalario(): number {
        // chama o metodo pra calcular o salario base e adiciona o bonus por projeto
        return this.salario + this.salario * 0.1 * this.projetosEntregues;
    }
}

// classe estagiario
class Estagiario extends Funcionario {
    //estagiario recebe um salario fixo
    calcularSalario(): number {
        // retorna apenas o salario base
        return this.salario;
    }
}


//instanciando os objetos
const funcionarios: Funcionario[] = [
    
    new Gerente("Igor", 8000, "G1"),
    new Gerente("Felps", 9500, "G2"),
    new Gerente("Bruno B", 10000, "G3"),
    new Gerente("Chairinski", 8700, "G4"),

    
    new Desenvolvedor("Jovs", 5000, "D1", 3),
    new Desenvolvedor("Léo Stronad", 6000, "D2", 4),
    new Desenvolvedor("Coxilha", 5500, "D3", 2),
    new Desenvolvedor("Jaguaranha", 5800, "D4", 5),

    
    new Estagiario("Mayole", 1800, "E1"),
    new Estagiario("Veneza", 1900, "E2"),
    new Estagiario("Mary anno", 2000, "E3"),
    new Estagiario("Coxilha da Sicoob", 1950, "E4"),
];


console.log("--- Relatorio de Pagamentos ---\n");

// percorrendo a lista de funcionarios e exibindo suas informacoes e salarios
funcionarios.forEach((funcionario) => {
    funcionario.exibirInfo();
    console.log(
        `Salario calculado: R$ ${funcionario.calcularSalario().toFixed(2)}`
    );
    console.log("----------------------------------------");
});
