import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare const require: any;
require('granim/dist/granim.js');
declare const Granim: any;

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  @ViewChild('granimCanvas') granimCanvas: ElementRef;

  constructor() { }

  ngOnInit() {
    const granimInstance = new Granim({
      element: this.granimCanvas.nativeElement,
      direction: 'diagonal',
      opacity: [0.1, 0.2],
      states: {
        'default-state': {
          gradients: [
            ['#2196f3', '#673ab7'],
            ['#009688', '#9ccc65']
          ]
        }
      }
    });
  }

}
