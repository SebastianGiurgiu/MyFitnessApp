import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/home/food/food-service.service';

@Component({
  selector: 'app-show-food-details',
  templateUrl: './show-food-details.component.html',
  styleUrls: ['./show-food-details.component.scss'],
})
export class ShowFoodDetailsComponent implements OnInit {

  @Input()
  selectedFood: Food;


  constructor() { }

  ngOnInit() {}

}
