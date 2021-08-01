import React from 'react'

export const dontSubmitWhenEnter = (
  event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
) => {
  if (event.key == 'Enter') {
    event.preventDefault()
  }
}
