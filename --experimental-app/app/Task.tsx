"use client";

import { ITask } from "@/types/tasks";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";


interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ( {task} ) => {
  const router = useRouter();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleEdit: FormEventHandler<HTMLFormElement>=async (e)=> {
      e.preventDefault();
      await editTodo({
        id: task.id,
        text: taskToEdit,
      });
      setModalOpenEdit(false);
      router.refresh();
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDeleted(false);
    router.refresh();
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="w-full">{task.text}</TableCell>
      <TableCell className="flex gap-5">

        <CiEdit 
          onClick = { () => setModalOpenEdit(true) } 
          cursor="pointer" 
          className="text-blue-500" 
          size={15}
        />

        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleEdit}>
            <h3 className="font-bold text-lg">Edit New Task</h3>
            <div className="modal-action">
              <Input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type Here"
                className="w-full"
              />
              <Button type="submit">Submit</Button>
            </div>         
          </form>
        </Modal> 

        <FaRegTrashCan onClick={() => setModalOpenDeleted(true)} cursor="pointer" className="text-red-500" size={15}/>

        <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
          <h3 className="text-lg">Do you really want to delete this task?</h3>
          <div className="modal-action">
          <Button onClick={() => handleDeleteTask(task.id)} variant="destructive">YES</Button>

          </div>
        </Modal>

      </TableCell>
    </TableRow>
  );
};

export default Task;