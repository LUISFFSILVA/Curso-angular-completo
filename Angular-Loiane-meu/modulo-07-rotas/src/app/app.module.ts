import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { AlunosModule } from './alunos/alunos.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { CursosModule } from './cursos/cursos.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './login/auth.service';
// import { CursosComponent } from './cursos/cursos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
// import { AlunosComponent } from './alunos/alunos.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursosService } from './cursos/cursos.service';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // CursosComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    // AlunosComponent,
    // CursoDetalheComponent,
    // CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // CursosModule,
    //AlunosModule,
    AppRoutingModule
  ],
  // providers: [CursosService],
  providers: [AuthService, AuthGuard,
    CursosGuard, AlunosGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
