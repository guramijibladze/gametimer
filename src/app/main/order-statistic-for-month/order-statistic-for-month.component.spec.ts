import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticForMonthComponent } from './order-statistic-for-month.component';

describe('OrderStatisticForMonthComponent', () => {
  let component: OrderStatisticForMonthComponent;
  let fixture: ComponentFixture<OrderStatisticForMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderStatisticForMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderStatisticForMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
