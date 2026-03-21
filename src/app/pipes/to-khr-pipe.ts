import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKHR',
  standalone: true,
})
export class ToKHRPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    const numericValue = typeof value === 'number' ? value : parseFloat(value ?? '0');
    if (Number.isNaN(numericValue)) return '';

    const result = Math.ceil((numericValue * 4100) / 100) * 100;
    return `${result.toLocaleString()}៛`;
  }

}
