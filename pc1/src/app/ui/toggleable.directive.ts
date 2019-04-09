import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleable]'
})
export class ToggleableDirective {

	constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click', ['$event.target']) onClick() {
  	this.toggleEl();
  }

  toggleEl() {
  	this.renderer.addClass(this.el, "show");
  }
 


}
