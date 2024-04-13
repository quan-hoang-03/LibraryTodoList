import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customWhere'
})
export class CustomWherePipe implements PipeTransform {

  transform(data: any[], filter: any): any[] {
    if (!data || !filter) {
      return data;
    }

    return data.filter(item => {
      let match = true;
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          match = false;
          break;
        }
      }
      return match;
    });
  }

}
