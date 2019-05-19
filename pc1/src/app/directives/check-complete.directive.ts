import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCheckComplete]'
})
export class CheckCompleteDirective {

  constructor(el: ElementRef) { }
}
