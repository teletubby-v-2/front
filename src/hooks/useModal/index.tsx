import { useState } from 'react'

export const useModal = () => {
  const [show, setShow] = useState(false)

  const openModal = () => {
    setShow(true)
  }

  const closeModal = () => {
    setShow(false)
  }

  const toggleModal = () => {
    setShow(!show)
  }

  return {
    show,
    openModal,
    closeModal,
    toggleModal,
  }
}
