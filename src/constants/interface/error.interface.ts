import firebase from 'firebase/app'

export interface AuthError {
  code?: string;
  credential?: firebase.auth.AuthCredential;
  email?: string;
  message?: string;
  phoneNumber?: string;
  tenantId?: string;
}