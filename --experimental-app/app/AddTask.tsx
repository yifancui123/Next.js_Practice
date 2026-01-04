"use client";

import { IoAddCircle } from "react-icons/io5";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmit:  FormEventHandler<HTMLFormElement>=async (e)=>{
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
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
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">Submit</button>
          </div>       
        </form>
      </Modal> 
    </div>
    );
};
export default AddTask;