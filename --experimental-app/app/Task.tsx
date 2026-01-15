"use client";

import { ITask } from "@/types/tasks";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const EditTaskSchema = z.object({
  todoTitle: z
    .string()
    .min(2, "Todo title must be at least 2 characters")
    .max(50, "Todo title must be less than 50 characters")
    .trim()
});

type EditTaskFormData = z.infer<typeof EditTaskSchema>;


interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ( {task} ) => {
  const router = useRouter();
  const [dialogOpenEdit, setDialogOpenEdit] = useState<boolean>(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  //Add Loading State for Delete Button
  const [isDeleting, setIsDeleting] = useState(false);


  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      todoTitle: task.title || ""
    }
  });

  // Reset form with current task title when dialog opens
  useEffect(() => {
    if (dialogOpenEdit) {
      reset({ todoTitle: task.title || "" });
    }
  }, [dialogOpenEdit, task.title, reset]);

  const onSubmit = async (data: EditTaskFormData) => {
    try{
      await editTodo({
        id: task.id,
        title: data.todoTitle,
      });
      setDialogOpenEdit(false);
      router.refresh();
    }catch(error){
      alert("Failed to edit task, please try again.");
    }
  }

  const handleDeleteTask = async (id: string) => {
    setIsDeleting(true);
    try{
      await deleteTodo(id);
      setDialogOpenDelete(false);
      router.refresh();
    }catch(error){
      alert("Failed to delete task, please try again.");
    } finally {
    setIsDeleting(false);
    }
  }
  

  return (
    <TableRow>
      <TableCell className="w-full">{task.title}</TableCell>
      <TableCell className="flex gap-5">

        <CiEdit
          onClick={() => setDialogOpenEdit(true)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          size={18}
        />

        <Dialog open={dialogOpenEdit} onOpenChange={setDialogOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Type Here"
                className="w-full"
                {...register("todoTitle")}
                disabled={isSubmitting}
              />
              {errors.todoTitle && (
                <p className="text-sm text-red-500">
                  {errors.todoTitle.message}
                </p>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <FaRegTrashCan
          onClick={() => setDialogOpenDelete(true)}
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
              <Button onClick={() => setDialogOpenDelete(false)} 
                variant="outline">
                Cancel
              </Button>
              <Button onClick={() => handleDeleteTask(task.id)} 
                variant="destructive" 
                disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </TableCell>
    </TableRow>
  );
};

export default Task;