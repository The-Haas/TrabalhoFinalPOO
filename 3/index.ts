// classe da conta
class ContaBancaria {
    // atributos privados pq são dados sensiceis
    private saldo: number;
    private historico: string[];

    // construtor da classe
    constructor(
        private titular: string,
        private numeroConta: string,
        saldoInicial: number
    ) {
        this.saldo = saldoInicial;
        this.historico = [];
    }

    // gettervai permite ler o saldo
    public getSaldo(): number {
        return this.saldo;
    }

    // metodo de depoisito
    public depositar(valor: number): void {
        if (valor <= 0) {
            console.log("Valor inválido para depósito.");
            return;
        }
        this.saldo += valor;
        this.historico.push(`Depósito: R$ ${valor.toFixed(2)}`);
    }

    // metodo de saque
    public sacar(valor: number): boolean {
        if (valor <= 0) {
            console.log("Valor inválido para saque.");
            return false;
        }
        if (valor > this.saldo) {
            console.log("Saldo insuficiente!");
            return false;
        }
        this.saldo -= valor;
        this.historico.push(`Saque/Pagamento: R$ ${valor.toFixed(2)}`);
        return true;
    }

    // pra registrar movimentações no histórico
    public registrarMovimentacao(descricao: string): void {
        this.historico.push(descricao);
    }

    // exibe o histerico da conta
    public exibirHistorico(): void {
        console.log(`\nHistórico da conta ${this.numeroConta} (${this.titular}):`);
        this.historico.forEach((item) => console.log(" - " + item));
        console.log(`Saldo atual: R$ ${this.saldo.toFixed(2)}\n`);
    }
}

// interface meio de pagamento
interface MeioPagamento {
    processarPagamento(valor: number, conta: ContaBancaria): void;
}



// Classe cartao de credito
class CartaoCredito implements MeioPagamento {
    // encapsulando dados sensiveis
    private numeroCartao: string;
    private limite: number;
    private fatura: number = 0;

    // construtor da classe
    constructor(numeroCartao: string, limite: number) {
        this.numeroCartao = numeroCartao;
        this.limite = limite;
    }

    // pagamento e processado mas nao retira do saldo da conta
    public processarPagamento(valor: number, conta: ContaBancaria): void {
        if (valor > this.limite - this.fatura) {
            console.log("Limite do cartao insuficiente!");
            return;
        }
        this.fatura += valor;
        conta.registrarMovimentacao(
            `Pagamento via Cartao de Credito (${this.numeroCartao.slice(-4)}): R$ ${valor.toFixed(2)}`
        );
        console.log(`Pagamento no crédito de R$ ${valor.toFixed(2)} aprovado.`);
    }
}

// 2. Cartao debito
class CartaoDebito implements MeioPagamento {
    private numeroCartao: string;

    // construtor da classe 
    constructor(numeroCartao: string) {
        this.numeroCartao = numeroCartao;
    }

    // debito o valor é retirado diretamente da conta
    public processarPagamento(valor: number, conta: ContaBancaria): void {
        if (conta.sacar(valor)) {
            conta.registrarMovimentacao(
                `Pagamento via Cartão de Débito (${this.numeroCartao.slice(-4)}): R$ ${valor.toFixed(2)}`
            );
            console.log(`Pagamento no debito de R$ ${valor.toFixed(2)} aceito.`);
        } else {
            console.log("Pagamento no debito recusado (saldo insuficiente).");
        }
    }
}

//boleto
class BoletoBancario implements MeioPagamento {
    private codigoBarras: string;

    // construtor da classe
    constructor(codigoBarras: string) {
        this.codigoBarras = codigoBarras;
    }

    // boleto e pago com de saque da conta
    public processarPagamento(valor: number, conta: ContaBancaria): void {
        if (conta.sacar(valor)) {
            conta.registrarMovimentacao(
                `Pagamento de boleto (${this.codigoBarras.slice(-6)}): R$ ${valor.toFixed(2)}`
            );
            console.log(`Boleto de R$ ${valor.toFixed(2)} pago.`);
        } else {
            console.log("Falha ao pagar boleto pois o saldo é insuficiente.");
        }
    }
}

//PIX
class Pix implements MeioPagamento {
    private chavePix: string;


    // construtor da classe
    constructor(chavePix: string) {
        this.chavePix = chavePix;
    }

    // pix transfere na hora da conta
    public processarPagamento(valor: number, conta: ContaBancaria): void {
        if (conta.sacar(valor)) {
            conta.registrarMovimentacao(
                `Transferência PIX para ${this.chavePix}: R$ ${valor.toFixed(2)}`
            );
            console.log(`PIX de R$ ${valor.toFixed(2)} enviado para ${this.chavePix}.`);
        } else {
            console.log("Falha ao enviar PIX pois o saldo é insuficiente.");
        }
    }
}


// criando as 4 contas
const conta1 = new ContaBancaria("Igor Haas", "001", 5000);
const conta2 = new ContaBancaria("Bruno Bareta", "002", 1500);
const conta3 = new ContaBancaria("Felps Damo", "003", 800);
const conta4 = new ContaBancaria("Marry Anno", "004", 12000);

// criando os meios de pagamento
const credito = new CartaoCredito("1111-2222-3333-4444", 3000);
const debito = new CartaoDebito("5555-6666-7777-8888");
const boleto = new BoletoBancario("34191.79001.01043.510047.910201.000000");
const pix = new Pix("igorhaas@igor.com");

// processando pagamentos
console.log("\n--- Processando pagamentos ---\n");

credito.processarPagamento(1200, conta1); // usa o limite de credito
debito.processarPagamento(400, conta1);  // debita da conta
boleto.processarPagamento(500, conta2);  // debita da conta
pix.processarPagamento(700, conta3);     // PIX transfere
debito.processarPagamento(13000, conta4); // falha por saldo insuficiente
credito.processarPagamento(2000, conta1); // segundo pagamento no crédito

// exibe histórico final
console.log("\n--- histórico das Contas ---");
conta1.exibirHistorico();
conta2.exibirHistorico();
conta3.exibirHistorico();
conta4.exibirHistorico();