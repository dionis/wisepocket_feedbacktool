import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAsociarComponent } from './contact-asociar.component';

describe('ContactAsociarComponent', () => {
  let component: ContactAsociarComponent;
  let fixture: ComponentFixture<ContactAsociarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAsociarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAsociarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
