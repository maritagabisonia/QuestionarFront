import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionJsonFormComponent } from './question-json-form.component';

describe('QuestionJsonFormComponent', () => {
  let component: QuestionJsonFormComponent;
  let fixture: ComponentFixture<QuestionJsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionJsonFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionJsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
