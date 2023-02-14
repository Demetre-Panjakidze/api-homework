import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() movieID: number | string | undefined;

  ngOnInit() {
    console.log(this.movieID);
  }
}
