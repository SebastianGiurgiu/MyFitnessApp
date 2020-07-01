import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onFruitPage() {
    //this.router.navigate(['home/food', 'fruits']);
    this.router.navigate(['/', 'home', 'food', 'type-food', 'fruit']);
  }

  onVeggiePage() {
    this.router.navigate(['/', 'home', 'food', 'type-food', 'veggie']);
  }

  onMeatPage() {
    this.router.navigate(['/', 'home', 'food', 'type-food', 'meat']);
  }

  onCerealPage() {
    this.router.navigate(['/', 'home', 'food', 'type-food', 'cereal']);
  }

  onGasketPage() {
    this.router.navigate(['/', 'home', 'food', 'type-food', 'gasket']);
  }

}
