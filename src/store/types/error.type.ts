import { AuthError } from '../../constants/interface/error.interface';

export type TError = {
  authError: AuthError;
  setAuthError: (error: AuthError) => void;
  // add more Error that use in global state
}
