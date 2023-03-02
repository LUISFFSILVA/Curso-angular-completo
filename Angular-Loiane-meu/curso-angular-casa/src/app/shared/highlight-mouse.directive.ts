import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  /***************************************************************** */
  //Este metodo sem utilizar @HostBinding
  // @HostListener('mouseenter') onMouseOver() {
  //   this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow')
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'white')
  // }
  /********************************************************************** */

  // //metodo com @HostBinding
  // @HostListener('mouseenter') onMouseOver() {
  //   this.backgroundColor = 'yellow'
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.backgroundColor = 'white'
  // }

  // @HostBinding('style.backgroundColor')
  // backgroundColor!: string;


  /************************************************************************************ */
  //metodo GET SET

  @HostListener('mouseenter') onMouseOver() {
    this.backgroundColor = 'yellow'
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'white'
  }

  @HostBinding('style.backgroundColor') get setColor() {
    //poderia adicionar mais codigo utilizando este metodo
    return this.backgroundColor
  }

  private backgroundColor!: string

  /***************************************************************************************** */

  constructor(
    //só utiliza sem @HostBinding
    // private _elementRef: ElementRef,
    // private _renderer: Renderer2
  ) { }

}
