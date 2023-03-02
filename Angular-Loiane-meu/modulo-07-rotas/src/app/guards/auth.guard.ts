import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
    // throw new Error('Method not implemented.');

    console.log('AuthGuard')

    return this.verificarAcesso()
    // if (this.authService.usuarioEstaAutenticado()) {
    //   return true
    // }

    // this.router.navigate(['/login'])

    // return false

  }


  private verificarAcesso() {

    if (this.authService.usuarioEstaAutenticado()) {
      return true
    }

    this.router.navigate(['/login'])

    return false
  }


  canLoad(
    route: Route): boolean | Observable<boolean> | Promise<boolean> {

    console.log('CanLoad: verificando se o usuario pode carregar o codigo do modulo')

    return this.verificarAcesso()
    // if (this.authService.usuarioEstaAutenticado()) {
    //   return true
    // }

    // this.router.navigate(['/login'])

    // return false

  }

}
