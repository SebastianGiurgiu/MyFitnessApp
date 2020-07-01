import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YourFoodPage } from './your-food.page';

describe('YourFoodPage', () => {
  let component: YourFoodPage;
  let fixture: ComponentFixture<YourFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YourFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
