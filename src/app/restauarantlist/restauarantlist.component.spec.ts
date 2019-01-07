import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauarantlistComponent } from './restauarantlist.component';

describe('RestauarantlistComponent', () => {
  let component: RestauarantlistComponent;
  let fixture: ComponentFixture<RestauarantlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauarantlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauarantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
