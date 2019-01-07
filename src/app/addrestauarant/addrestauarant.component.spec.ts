import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrestauarantComponent } from './addrestauarant.component';

describe('AddrestauarantComponent', () => {
  let component: AddrestauarantComponent;
  let fixture: ComponentFixture<AddrestauarantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrestauarantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrestauarantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
