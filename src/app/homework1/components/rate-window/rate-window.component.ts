import { Component } from '@angular/core';

@Component({
  selector: 'app-rate-window',
  templateUrl: './rate-window.component.html',
  styleUrls: ['./rate-window.component.scss'],
})
export class RateWindowComponent {
  white: string =
    'invert(63%) sepia(40%) saturate(0%) hue-rotate(186deg) brightness(99%) contrast(93%)';
  blue: string =
    'invert(62%) sepia(24%) saturate(5489%) hue-rotate(190deg) brightness(98%) contrast(91%)';
  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
  }

  rating(rate: number) {
    console.log(rate);
  }
}
