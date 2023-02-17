import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogoffComponent } from './user-logoff.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserLogoffComponent', () => {
  let component: UserLogoffComponent;
  let fixture: ComponentFixture<UserLogoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogoffComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLogoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
