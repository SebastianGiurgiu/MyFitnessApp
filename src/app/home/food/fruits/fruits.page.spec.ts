import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FruitsPage } from './fruits.page';

describe('FruitsPage', () => {
  let component: FruitsPage;
  let fixture: ComponentFixture<FruitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FruitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
