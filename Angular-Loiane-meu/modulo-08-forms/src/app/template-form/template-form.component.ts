import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../share/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(formulario: any) {
    console.log(formulario)

    // console.log(this.usuario)

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados)
        formulario.form.reset()
      })
  }


  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit() {
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(event: Event, form: any) {
    //console.log((event.target as HTMLInputElement).value)
    //Nova variável "cep" somente com dígitos.
    var cep = (event.target as HTMLInputElement).value.replace(/\D/g, ''); //retirado aula 101

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        ?.subscribe(dados => this.populaDadosForm(dados, form))
    }

    /*
    //Verifica se campo cep possui valor informado.
    //if (cep != "") { //retirado aula 101

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {

      this.resetaDadosForm(form)

      this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => this.populaDadosForm(dados, form))
      // .subscribe(dados => console.log(dados, form))
    }
  }*/ //retirado aula 101
  }

  populaDadosForm(dados: any, formulario: any) {

    //desta forma, precisamos reescrever todos os campos que ja haviam sido preenchidos anteriormente. 
    //Os campos que nao forem preenchidos pelo serviço, serão apagados
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })*/

    //desta forma só popula os campos especificados, não apagando os campos preenchidos anteriormente e,
    //descartando a necessidade de reescrever os valores como no metodo acima.
    formulario.form.patchValue({
      endereco: {
        //cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
    // console.log(formulario)
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        //cep: dados.cep,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

}
