import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
  standalone: true
})
export class LongPressDirective {
  @Output() press = new EventEmitter();
  
  private longPressTimeout: any;
  private readonly duration = 500; // milliseconds

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onPressStart(event: any) {
    this.longPressTimeout = setTimeout(() => {
      this.press.emit(event);
    }, this.duration);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  onPressEnd() {
    clearTimeout(this.longPressTimeout);
  }
}