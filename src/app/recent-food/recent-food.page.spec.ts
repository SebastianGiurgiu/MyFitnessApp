import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentFoodPage } from './recent-food.page';

describe('RecentFoodPage', () => {
  let component: RecentFoodPage;
  let fixture: ComponentFixture<RecentFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
