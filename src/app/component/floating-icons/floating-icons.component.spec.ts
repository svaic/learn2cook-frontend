import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingIconsComponent } from './floating-icons.component';

describe('FridgeFilterComponent', () => {
  let component: FloatingIconsComponent;
  let fixture: ComponentFixture<FloatingIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
