import { PipeTransform, Pipe } from '@angular/core';
import { Food } from '../food-service.service';



@Pipe({
    name: 'foodFilter'
})
export class FoodsFilterPipe implements PipeTransform {
    transform(foods: Food[], searchTerm: string): Food[] {
        if (!foods || !searchTerm) {
            return foods;
        }
        return foods.filter(food =>
            food.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

