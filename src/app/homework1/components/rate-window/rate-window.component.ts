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
  buttonColor: string = 'rgba(255, 255, 255, 0.1)';
  textColor: string = 'rgba(255, 255, 255, 0.5)';
  starColor: string = this.white;
  starLink: string = 'assets/vote-star.svg';
  voteNumber: number = 1;
  fontSize: string = '';
  clicked: boolean = false;

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
  }

  rating(rate: number) {
    this.clicked = true;
    this.starColor = this.blue;
    this.starLink = 'assets/big-star.svg';
    this.buttonColor = '#f5c518';
    this.textColor = '#000';
    this.voteNumber = rate;
    let fontSizeNumber = 22;
    fontSizeNumber += rate / 2;
    this.fontSize = `${fontSizeNumber}px`;
  }

  shouldHighlightStar(voteNumber: number): boolean {
    return voteNumber <= this.selectedRating;
  }
}
