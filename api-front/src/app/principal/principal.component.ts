import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

    // Objeto do tipo Cliente
    cliente = new Cliente();

    // Variável para visibilidade dos botões
    btnCadastro:boolean = true;

    // Variável para visibilidade da tabela
    tabela:boolean = true;

    // JSON de clientes
    clientes:Cliente[] = [];

    // Construtor
    constructor(private servico:ClienteService){}

    // Método de seleção
    selecionar():void{
      this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
    }

    // Método de cadastro
    cadastrar():void{
      this.servico.cadastrar(this.cliente)
      .subscribe(retorno => { 

        // Cadastrar o cliente no vetor
        this.clientes.push(retorno); 

        // Limpar formulário
        this.cliente = new Cliente();

        // Mensagem
        alert('Cliente cadastrado com sucesso!');
      });
    }

    // Método para selecionar um cliente específico
    selecionarCliente(posicao:number):void{

      // Selecionar cliente no vetor
      this.cliente = this.clientes[posicao];

      // Visibilidade dos botões
      this.btnCadastro = false;

      // Visibilidade da tabela
      this.tabela = false;

    }

    // Método para editar clientes
    editar():void{

      this.servico.editar(this.cliente)
      .subscribe(retorno => {

        // Obter posiçao do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == retorno.codigo;
        });

        // Alterar os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        // Limpar formulário
        this.cliente = new Cliente();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        alert('Cliente alterado com sucesso!');

      });

    }

    // Método para remover clientes
    remover():void{

      this.servico.remover(this.cliente.codigo)
      .subscribe(retorno => {

        // Obter posiçao do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == this.cliente.codigo;
        });

        // Remover cliente do vetor
        this.clientes.splice(posicao, 1);

        // Limpar formulário
        this.cliente = new Cliente();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        alert('Cliente removido com sucesso!');

      });

    }

    // Método para cancelar
    cancelar():void{

      // Limpar formulário
      this.cliente = new Cliente();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

    }

    // Método de inicialização
    ngOnInit(){
      this.selecionar();
    }

}
