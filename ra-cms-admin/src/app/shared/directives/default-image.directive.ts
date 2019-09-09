import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDefaultImage]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[src]': 'src'}
})
export class DefaultImageDirective {

  @Input() src: string;
  @Input('appDefaultImage') default: string;

  constructor() { }

  @HostListener('error')
  setDefaultUrl() {
    this.src = this.default;
  }
}
