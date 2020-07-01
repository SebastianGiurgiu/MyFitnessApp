import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodHistoryPage } from './food-history.page';

describe('FoodHistoryPage', () => {
  let component: FoodHistoryPage;
  let fixture: ComponentFixture<FoodHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
