import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Livro Qualquer',
    rating: 4.5321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://www.saraiva.com.br'
  }

  livros: string[] = []
  filtro: string = '';

  addCurso(valor: string) {
    this.livros.push(valor)
  }

  obterCursos() {
    if (this.livros.length == 0 || this.filtro == undefined || this.filtro.trim() == '') {
      return this.livros
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true
      }
      return false
    })
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('valor assíncrono'), 2000)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
