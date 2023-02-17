import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from '../logo/logo.component';
import { SpaceComponent } from '../space/space.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLogoffComponent } from '../user-logoff/user-logoff.component';

import { AppHeaderComponent } from './header.component';

describe('AppAppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        AppHeaderComponent,
        LogoComponent,
        SpaceComponent,
        UserLoginComponent,
        UserLogoffComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
