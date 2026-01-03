import React from 'react'

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ( {modalOpen, setModalOpen, children} ) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
      <div className="modal-box">
        {children}
      </div>
      <label className="modal-backdrop" onClick={()=>setModalOpen(false)}>Close</label>
    </div>

  )
}

export default Modal