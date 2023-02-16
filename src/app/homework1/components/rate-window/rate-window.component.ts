import { Component } from '@angular/core';

@Component({
  selector: 'app-rate-window',
  templateUrl: './rate-window.component.html',
  styleUrls: ['./rate-window.component.scss'],
})
export class RateWindowComponent {
  buttonColor: string = 'rgba(255, 255, 255, 0.1)';
  textColor: string = 'rgba(255, 255, 255, 0.5)';
  starColor: string =
    'invert(63%) sepia(40%) saturate(0%) hue-rotate(186deg) brightness(99%) contrast(93%)';
  voteNumber: number = 10;
  fontSize: string = '';
  starWidth: number = 85;
  starHeight: number = 81;
  starPosition: number = -47;
  clicked: boolean = false;

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
  }

  rating(rate: number) {
    this.clicked = true;
    this.starColor =
      'invert(62%) sepia(24%) saturate(5489%) hue-rotate(190deg) brightness(98%) contrast(91%)';
    this.buttonColor = '#f5c518';
    this.textColor = '#000';
    this.voteNumber = rate;
    let fontSizeNumber = 22;
    this.starWidth = 85;
    this.starHeight = 81;
    this.starPosition = -47;
    fontSizeNumber += rate;
    this.starWidth += (3 * rate) / 2;
    this.starHeight += (3 * rate) / 2;
    this.starPosition -= rate / 2;
    this.fontSize = `${fontSizeNumber}px`;
  }

  shouldHighlightStar(selectedRating: number): boolean {
    return selectedRating <= this.voteNumber;
  }
}
