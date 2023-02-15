import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bigNumberPipe' })
export class BigNumberPipe implements PipeTransform {
  transform(value: string): string {
    const stringtoNum = +value.replace(/,/g, '');
    if (stringtoNum >= 1000000) {
      return (stringtoNum / 1000000).toFixed(0) + 'M';
    } else if (stringtoNum >= 1000) {
      return (stringtoNum / 1000).toFixed(0) + 'k';
    } else {
      return stringtoNum.toString();
    }
  }
}
