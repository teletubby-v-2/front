export type TModalAccount = {
  isModalVisible: boolean
  isHaveAccount: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
  toggleHaveAccount: () => void
  toLogin: () => void
  toRegister: () => void
}
