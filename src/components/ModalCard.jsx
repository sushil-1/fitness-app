import { Modal } from '@mui/material'
import React from 'react'

const ModalCard = ({
    open = false,
    onClose = () => {},
    children,
    ...props
}) => {
  return (
    <Modal
        open={open}
        onClose={onClose}
    >
        {children}
    </Modal>
  )
}

export default ModalCard