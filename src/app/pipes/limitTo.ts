import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitTo'})
export class LimitTo implements PipeTransform {
    transform(value: string, exponent: number): any {
        if(!value) {
            return false;
        }
        if(value.length <= exponent) {
            return value;
        }
        return value.substring(0, exponent) + '...';
    }
}