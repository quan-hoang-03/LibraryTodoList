import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;
    // Chuẩn hóa đối số tìm kiếm để bỏ qua hoa thường và dấu
    const normalizedArgs = args.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '');
    args = args.toLowerCase();
    return value.filter(function(item:any){
      const normalizedItem = JSON.stringify(item).toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')
      return normalizedItem.includes(normalizedArgs);
    })
  }
}
