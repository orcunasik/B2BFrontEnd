import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPipe'
})
export class ProductPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
