import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Platform } from "ionic-angular";
/**
 * Generated class for the OverslideDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[overslide]' // Attribute selector
})
export class OverslideDirective {
  @Input('overslide') overslide: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(public platform: Platform) {
    console.log('Hello OverslideDirective Directive');
  }
  @HostListener('keyup', ['$event']) onKeyup(event) {
    const element = event.target as HTMLInputElement;
    const limit = this.overslide;
    if (this.platform.is('android')) {
      const value = element.value.substr(0, limit);
      if (value.length <= limit) {
        element.value = value;
      } else {
        element.value = value.substr(0, limit - 1);
      }
      this.ngModelChange.emit(element.value);
    }
  }
  @HostListener('focus', ['$event']) onFocus(event) {
    const element = event.target as HTMLInputElement;
    if (!this.platform.is('android')) {
      element.setAttribute('maxlength', this.overslide)
    }
  }
}
