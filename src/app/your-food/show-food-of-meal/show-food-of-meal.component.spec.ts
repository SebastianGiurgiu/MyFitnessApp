import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowFoodOfMealComponent } from './show-food-of-meal.component';

describe('ShowFoodOfMealComponent', () => {
  let component: ShowFoodOfMealComponent;
  let fixture: ComponentFixture<ShowFoodOfMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFoodOfMealComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowFoodOfMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
