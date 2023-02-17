import { IUserInfo } from 'src/app/services/authentication.service';
export interface AuthState {
  isAuthenticated: boolean,
  token: string
  userInfo: IUserInfo | null
};

export const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  userInfo: JSON.parse('{}')
};
