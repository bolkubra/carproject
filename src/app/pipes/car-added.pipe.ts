import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carAdded'
})
export class CarAddedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
