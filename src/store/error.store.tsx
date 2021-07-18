import create from 'zustand'
import { AuthError } from '../constants/interface/error.interface'
import { TError } from './types/error.type'

export const ErrorStore = create<TError>((set) => ({
  authError: {},
  setAuthError: (authError: AuthError) => {
    set({ authError})
  }
  // add more Error that use in global state
}))