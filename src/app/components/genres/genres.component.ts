import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenresComponent),
      multi: true,
    },
  ],
})
export class GenresComponent implements ControlValueAccessor {
  genres: string[] = [
    'Comedy',
    'Science fiction',
    'Romance',
    'Musical',
    'Drama',
    'Crime',
    'Action',
    'Adventure',
  ];
  private _selectedGenres: string[] = [];

  constructor() {}

  onChange: (genres: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(genres: string[]) {
    this._selectedGenres = genres || [];
    this.onChange(genres);
  }

  registerOnChange(fn: (genres: string[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {}

  select(label: string) {
    this._selectedGenres.push(label);
    this.onChange(this._selectedGenres);
  }

  remove(label: string) {
    this._selectedGenres = this._selectedGenres.filter((x) => x !== label);
    this.onChange(this._selectedGenres);
  }

  choose(label: string) {
    if (this._selectedGenres.includes(label)) {
      this.remove(label);
      return;
    }

    this.select(label);
  }
}
