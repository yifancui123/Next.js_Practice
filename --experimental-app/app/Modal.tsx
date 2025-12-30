import React from 'react'

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: () => void;
}

const Modal: React.FC<ModalProps> = ( {modalOpen, setModalOpen} ) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">This modal works with a hidden checkbox!</p>
      </div>
      <label className="modal-backdrop" onClick={()=>setModalOpen(false)}>Close</label>
    </div>

  )
}

export default Modal