"use client";

import { IoAddCircle } from "react-icons/io5";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
const AddTask = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<String>("");

  const handleSubmit:  FormEventHandler<HTMLFormElement>=(e)=>{
    e.preventDefault();
    console.log(newTaskValue);
    setNewTaskValue("");
  }

  return(
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Add New Task <IoAddCircle className="+" size={18}/> 
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type = "text"
              placeholder="Type Here"
              className="input input-bordered w-full w-full"
            />
            <button type="submit" className="btn"></button>
          </div>       
        </form>
      </Modal> 
    </div>
    );
};
export default AddTask;