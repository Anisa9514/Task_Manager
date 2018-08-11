import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials'
})
/**
 * Splits the string using ' ' as delimiter, isolates the first letter of each word,
 * and returns the capitalized initials
 */
export class NameInitialsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    let valArr = value.split(' ');
    valArr = valArr.map(
      (elem) => {return elem[0];}
    );
    return valArr.join('').toUpperCase();
  }

}
