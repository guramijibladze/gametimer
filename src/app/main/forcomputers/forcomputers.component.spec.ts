import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcomputersComponent } from './forcomputers.component';

describe('ForcomputersComponent', () => {
  let component: ForcomputersComponent;
  let fixture: ComponentFixture<ForcomputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForcomputersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForcomputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
