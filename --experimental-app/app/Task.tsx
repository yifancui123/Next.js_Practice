"use client";

import { ITask } from "@/types/tasks";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ( {task} ) => {
  const router = useRouter();
  const [dialogOpenEdit, setDialogOpenEdit] = useState<boolean>(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setDialogOpenEdit(false);
    router.refresh();
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setDialogOpenDelete(false);
    router.refresh();
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="w-full">{task.text}</TableCell>
      <TableCell className="flex gap-5">

        <CiEdit
          onClick={() => setDialogOpenEdit(true)}
          cursor="pointer"
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          size={18}
        />

        <Dialog open={dialogOpenEdit} onOpenChange={setDialogOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <Input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type Here"
                className="w-full"
              />
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>

        <FaRegTrashCan
          onClick={() => setDialogOpenDelete(true)}
          cursor="pointer"
          className="text-red-500 hover:text-red-700 cursor-pointer"
          size={18}
        />

        <Dialog open={dialogOpenDelete} onOpenChange={setDialogOpenDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Task</DialogTitle>
              <DialogDescription>
                Do you really want to delete this task? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDialogOpenDelete(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => handleDeleteTask(task.id)} variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </TableCell>
    </TableRow>
  );
};

export default Task;