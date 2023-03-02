import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/form-candeactivate';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {

  aluno: any = {}
  inscricao: Subscription | undefined
  private formsMudou: boolean = false

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ) { }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params["id"]

        this.aluno = this.alunosService.getAluno(id)

        if (this.aluno == null) {
          this.aluno = {}
        }
      }
    )
  }

  onInput() {
    this.formsMudou = true
    console.log("mudou")
  }

  podeMudarRota() {

    if (this.formsMudou) {
      confirm('Tem certeza que deseja sair da pagina?')
    }

    return true

  }

  podeDesativar(): boolean {
    return this.podeMudarRota();
  }

  ngOnDestroy() {
    this.inscricao?.unsubscribe()
  }

}
