import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleReceipt} from './single-receipt.component';

describe('CookReceiptComponent', () => {
  let component: SingleReceipt;
  let fixture: ComponentFixture<SingleReceipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleReceipt]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleReceipt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
