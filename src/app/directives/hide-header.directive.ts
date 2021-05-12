import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';


@Directive({
  selector: '[appHideHeader]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input('appHideHeader') header: any;
  headerHeight: number;

  constructor(private renderer: Renderer2, private domCrtl: DomController) { 
    
  }

  ngOnInit(){
    this.header = this.header.el;

    this.domCrtl.read(() =>{
      this.headerHeight = 208;
    })
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(event){
    const scrollTop = event.detail.scrollTop;
    let newPosition = scrollTop;

    let newOpacity = 1 - (newPosition / this.headerHeight);

    this.domCrtl.write(()=>{
      this.renderer.setStyle(this.header, 'transition', '200ms');
      this.renderer.setStyle(this.header, 'top', `-${newPosition}px`);
      this.renderer.setStyle(this.header, 'opacity', newOpacity);
    })
  }

}
