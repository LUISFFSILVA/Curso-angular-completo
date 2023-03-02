import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadoBrModel } from '../share/models/estado-br.model';
import { ConsultaCepService } from '../share/services/consulta-cep.service';
import { DropdownService } from '../share/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})

export class DataFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup({
  });
  estados!: Observable<EstadoBrModel[]>
  cargos!: any[];
  tecnologias!: any[]
  newsletterOp!: any[]
  frameworks = ['Angular', 'React', 'Vue', 'Sencha']

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    this.estados = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.tecnologias = this.dropdownService.getTecnologias()
    this.newsletterOp = this.dropdownService.getNewsletter()

    //retirado o subscribe na aula 102
    // this.dropdownService.getEstadosBr().subscribe(dados => { this.estados = dados; console.log(dados) })

    /*
    // Uma forma de fazer o formulario
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),

      endereco: new FormGroup({
        cep: new FormControl(null),
        ...
      })
    })
    */

    //Outra forma de fazer, utilizando o construtor
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      //Outra forma de validar o email, usando pattern
      //email: [null, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]]

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['S'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })
  }

  getControls() {
    return (this.formulario.get('frameworks') as FormArray).controls;
  }

  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values)

    /* Assim se fosse fazer manual, um para cada valor do array
    this.formBuilder.array([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]);
    */
  }

  onSubmit() {
    console.log(this.formulario)

    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: boolean) => v != null)
    })

    console.log(valueSubmit)

    if (this.formulario.valid) {

      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(dados => {
          console.log(dados)
          //resetar o form
          // this.resetar()
        },
          (error: any) => alert('erro'))
    } else {
      console.log('formulario invalido')
      this.verificaValidacoesFormulario(this.formulario)
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      const controle = formGroup.get(campo)
      controle?.markAsDirty()
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormulario(controle)
      }
    })
  }

  resetar() {
    this.formulario.reset()
  }

  verificaValidTouched(campo: string) {
    if (!this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)) {
      return true
    }
    return false
    // return (
    //   !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    // )
  }

  verificaEmailInvalido() {
    var campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP() {
    //console.log((event.target as HTMLInputElement).value)
    //Nova variável "cep" somente com dígitos.
    let cep = this.formulario.get('endereco.cep')?.value

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        ?.subscribe(dados => this.populaDadosForm(dados))
    }

    /* retirado aula 101
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm()

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados))
        // .subscribe(dados => console.log(dados, form))
      }
    }*/
  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        //cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    //this.formulario.get('nome')?.setValue('Luis'); //sempre que procurar o CEP, ele vai preencher o campo nome com 'Luis'. Isto é um exemplo do setValue
    // console.log(formulario)
  }

  resetaDadosForm() {
    this.formulario.patchValue({
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }

  compararTecnologias(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php'])
  }
}




