import create from 'zustand'
import { AuthError } from '../constants/interface/error.interface'
import { TError } from './types/error.type'

export const errorStore = create<TError>(set => ({
  authError: {},
  setAuthError: (authError: AuthError) => {
    set({ authError })
  },
}))
