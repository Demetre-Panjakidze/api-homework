import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  @Input() set maxRating(value: number) {
    this._stars = Array(value);
  }

  private _stars: unknown[] = Array(5);
  private _hoveredIndex: number = -1;
  currentRating: number = 3;
  constructor() {}

  onChange: (rating: number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(rating: number) {
    this.currentRating = rating;
    this.onChange(rating);
  }

  registerOnChange(fn: (rating: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {}

  get stars() {
    return this._stars;
  }

  enter(index: number) {
    this._hoveredIndex = index + 1;
  }

  leave() {
    this._hoveredIndex = -1;
  }

  select(index: number) {
    this.currentRating = index + 1;
    this.onChange(this.currentRating);
    this.leave();
  }

  getStarClass(index: number) {
    if (index < this._hoveredIndex) {
      return {
        active: true,
        hovered: true,
      };
    }

    if (index < this.currentRating && this._hoveredIndex === -1) {
      return {
        active: true,
      };
    }
    return {};
  }

  isHovered(index: number) {
    return this._hoveredIndex - 1 === index;
  }
}
