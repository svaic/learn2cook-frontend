import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SmallReceiptCardComponent} from './small-receipt-card.component';

describe('ReceiptComponent', () => {
  let component: SmallReceiptCardComponent;
  let fixture: ComponentFixture<SmallReceiptCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallReceiptCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SmallReceiptCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
