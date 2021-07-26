import create from 'zustand'
import { TModalAccount } from './types/modalAccount.type'

export const modalAccountStore = create<TModalAccount>((set, get) => ({
  isModalVisible: false,
  isHaveAccount: false,
  openModal: () => {
    set({ isModalVisible: true })
  },
  closeModal: () => {
    set({ isModalVisible: false })
  },
  toggleModal: () => {
    set({ isModalVisible: !get().isModalVisible })
  },
  toggleHaveAccount: () => {
    set({ isHaveAccount: !get().isHaveAccount })
  },
}))
