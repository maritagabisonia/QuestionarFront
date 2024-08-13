import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullQuizComponent } from './full-quiz.component';

describe('FullQuizComponent', () => {
  let component: FullQuizComponent;
  let fixture: ComponentFixture<FullQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
