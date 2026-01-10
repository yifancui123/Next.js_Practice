import React from 'react'

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ( {modalOpen, setModalOpen, children} ) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${modalOpen ? "flex" : "hidden"} items-center justify-center`}
      role="dialog"
    >
      <div className="fixed inset-0 bg-black/50" onClick={()=>setModalOpen(false)} />
      <div className="relative bg-background rounded-lg p-6 max-w-md w-full mx-4 shadow-lg z-50">
        {children}
      </div>
    </div>

  )
}

export default Modal