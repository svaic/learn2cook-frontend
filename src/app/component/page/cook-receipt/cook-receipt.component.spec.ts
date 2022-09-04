import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookReceiptComponent } from './cook-receipt.component';

describe('CookReceiptComponent', () => {
  let component: CookReceiptComponent;
  let fixture: ComponentFixture<CookReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
