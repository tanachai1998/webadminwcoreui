import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: number) {


    return value ? list.filter(item => item.year.year === value) : list;
  }

}
