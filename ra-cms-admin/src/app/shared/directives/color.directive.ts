import {Directive, ElementRef, Input, OnInit} from '@angular/core';

const DEFAULT_COLOR = 'blue';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnInit {

  @Input()
  appColor: string;
  @Input()
  isText: boolean;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    this.appColor = this.appColor || DEFAULT_COLOR;
    this.appColor = this.isText ? `${this.appColor}-text` : this.appColor;
    this.element.nativeElement.className = `${this.element.nativeElement.className} ${this.appColor}`;
  }

}
