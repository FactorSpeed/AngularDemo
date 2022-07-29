import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'custom_currency' })
export class CurrencyPipe implements PipeTransform {
  transform(value: number, country: string, format: string): string {
    let formatter = new Intl.NumberFormat(country, {
      style: 'currency',
      currency: format,
    });
    return formatter.format(value);
  }
}
