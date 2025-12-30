"use client";

import { IoAddCircle } from "react-icons/io5";
import Modal from "./Modal";
import { useState } from "react";
const AddTask = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return(
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Add New Task <IoAddCircle className="+" size={18}/> 
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
    );
};
export default AddTask;