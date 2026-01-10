"use client";

import { IoAddCircle } from "react-icons/io5";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


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
      <Button onClick={() => setModalOpen(true)} className="w-full">
        Add New Task <IoAddCircle className="+" size={18}/> 
      </Button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <Input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type Here"
              className="w-full"
            />
            <Button type="submit">Submit</Button>
          </div>       
        </form>
      </Modal> 
    </div>
    );
};
export default AddTask;