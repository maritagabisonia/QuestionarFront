import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedQuestionsComponent } from './added-questions.component';

describe('AddedQuestionsComponent', () => {
  let component: AddedQuestionsComponent;
  let fixture: ComponentFixture<AddedQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
