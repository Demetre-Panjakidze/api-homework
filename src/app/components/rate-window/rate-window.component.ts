import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { movieInDetails } from '../../movie.model';

@Component({
  selector: 'app-rate-window',
  templateUrl: './rate-window.component.html',
  styleUrls: ['./rate-window.component.scss'],
})
export class RateWindowComponent implements OnInit, AfterViewInit {
  @Input() movieName: string = '';
  @Input() fullInfo: any;
  @Output() message = new EventEmitter();
  closed: boolean = false;
  buttonColor: string = 'rgba(255, 255, 255, 0.1)';
  textColor: string = 'rgba(255, 255, 255, 0.5)';
  starColor: string =
    'invert(63%) sepia(40%) saturate(0%) hue-rotate(186deg) brightness(99%) contrast(93%)';
  voteNumber: number = 10;
  fontSize: string = '';
  starWidth: number = 85;
  starHeight: number = 81;
  starPosition: number = -47;
  ratingClicked: boolean = false;
  inputValue: string = '';
  voteSubmitted: boolean = false;

  constructor(private api: MovieApiService, private router: Router) {}

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnInit() {}

  rating(rate: number) {
    this.ratingClicked = true;
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

  closeFn() {
    this.closed = true;
    this.message.emit(this.closed);
  }

  voted() {
    this.voteSubmitted = true;

    this.api
      .saveMyList({
        ...this.fullInfo,
        myVote: `${this.voteNumber}`,
        myReview: this.inputValue,
      })
      .subscribe(() => {
        this.router.navigateByUrl('votes');
      });
  }
}
