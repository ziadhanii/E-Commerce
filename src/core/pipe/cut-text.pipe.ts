import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true
})
export class CutTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    return text.split(' ').slice(0, limit).join(' ');
  }

}
