import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  cursos: string[] = []
  // cursosService: CursosService //Quando faz com injeção de dependencia, não precisa declarar aqui

  constructor(private cursosService: CursosService) {
    // this.cursosService = new CursosService() //Com injeção de dependencia, não precisa instanciar
    this.cursosService = cursosService
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos()

    // this.cursosService.emitirCursoCriado.subscribe((curso) => console.log(curso)  //Podemos emitir o evento

    CursosService.criouNovoCurso.subscribe((curso) => this.cursos.push(curso)  //Podemos se inscrever para ser notificado quando houver mudança 
    )
  }

}
