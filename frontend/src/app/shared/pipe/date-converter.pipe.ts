import { Pipe, PipeTransform } from '@angular/core';
import { MONTHS_IN_RUSSIAN } from '../../app.constants';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return `${MONTHS_IN_RUSSIAN[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  }
}
