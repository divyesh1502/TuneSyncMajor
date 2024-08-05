import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countCommas' })
export class CountCommasPipe implements PipeTransform {
  transform(value: string): number {
    if (!value) return 0;
    if(value.split(',').length == 0){
        return 1;
    }else{
        return value.split(',').length;
    }
  }
}
