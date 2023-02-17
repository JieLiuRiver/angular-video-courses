import { TestBed } from '@angular/core/testing';
import { AuthenticationService, TOKEN_STORAGE_KEY, IUserInfo } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return true when call login method', async() => {
  //   const result = await service.login('admin', 'admin')
  //   expect(result).toBe(true);
  // })

  it('should return true when call logout method', async() => {
    const result = await service.logout()
    expect(result).toBe(true);
  })

  it('should remove info from localstorage when call logout method', async() => {
    await service.logout()
    const info = window.localStorage.getItem(TOKEN_STORAGE_KEY)
    expect(!!info).toBe(false);
  })

});
