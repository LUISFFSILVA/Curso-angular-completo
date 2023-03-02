import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {
    //console.log((event.target as HTMLInputElement).value)
    //Nova variável "cep" somente com dígitos.

    //let cep = this.formulario.get('endereco.cep')?.value  //passando o parametro na funçao, nao preciso mais desta linha. aula 101

    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        return this.http.get(`//viacep.com.br/ws/${cep}/json`)
        //this.resetaDadosForm() //retirado aula101

        /* this.http.get(`//viacep.com.br/ws/${cep}/json`)
           .subscribe(dados => this.populaDadosForm(dados))
         // .subscribe(dados => console.log(dados, form))*/  //retirado aula 101
      }
    }

    return of({})

  }
}
