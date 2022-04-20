import { Directive, ElementRef, OnInit,Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPolarityBackground]'
})
export class PolarityBackgroundDirective implements OnInit {
  @Input('value') 
  opinion:any;
  constructor(private element:ElementRef, private renderer: Renderer2) {
    
    console.log(this.opinion);
    console.log(this.element);

   }
  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor='#03a9f4';
    // switch (this.appPolarityBackground.polaridad) {
    //   case 'positive':
    //       this.element.nativeElement.style.backgroundColor='#03a9f4';
    //       //this.renderer.setStyle(this.element,'background-color','#03a9f4');
    //       break;
    //   case 'positiva':
    //     this.renderer.setStyle(this.element,'background-color','#03a9f4');
    //       break;
    //   case 'neutral':
    //     this.renderer.setStyle(this.element,'background-color','grey');
    //       break;
    //   case 'negativa':
    //     this.renderer.setStyle(this.element,'background-color','red');
    //       break;
    //   case 'negativa':
    //     this.renderer.setStyle(this.element,'background-color','red');
    //       break;
    //   default:
    //       break;
    // }
    
    //console.log(this.appPolarityBackground);
  }

}
