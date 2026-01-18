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
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditTaskSchema = z.object({
  todoTitle: z
    .string()
    .min(2, "Todo title must be at least 2 characters")
    .max(50, "Todo title must be less than 50 characters")
    .trim(),
  description: z
    .string()
    .max(200, "Description must be less than 50 characters")
    .trim()
});

type EditTaskFormData = z.infer<typeof EditTaskSchema>;


interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ( {task} ) => {
  const [dialogOpenEdit, setDialogOpenEdit] = useState<boolean>(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState<boolean>(false);
  //Add Loading State for Delete Button



  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      todoTitle: task.title || "",
      description: task.description || ""
    }
  });

  // Reset form with current task title when dialog opens
  useEffect(() => {
    if (dialogOpenEdit) {
      reset({ 
        todoTitle: task.title || "", 
        description: task.description || ""  
      });
    }
  }, [dialogOpenEdit, task.title, task.description, reset]);

  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: [ "todos" ]});
      setDialogOpenEdit(false);
    },
    onError: ()=>{
      alert("Failed to edit task, please try again.");
    }
  });

  const onSubmit = (data: EditTaskFormData) => 
      editMutation.mutate({
        id: task.id,
        title: data.todoTitle,
        description: data.description
      });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: [ "todos" ]});
      setDialogOpenDelete(false);
    },
    onError:()=>{
      alert("Failed to delete task, please try again.");
    }
  })
  

  return (
    <TableRow>
      <TableCell className="w-1/2 align-middle">{task.title}</TableCell>
      <TableCell className="w-1/2 align-middle">{task.description}</TableCell>
      <TableCell className="align-middle whitespace-nowrap">
        <div className="flex items-center gap-2">
          <CiEdit
            onClick={() => setDialogOpenEdit(true)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            size={18}
          />

          <FaRegTrashCan
            onClick={() => setDialogOpenDelete(true)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            size={18}
          />
        </div>
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
                disabled={editMutation.isPending}
              />
              {errors.todoTitle && (
                <p className="text-sm text-red-500">
                  {errors.todoTitle.message}
                </p>
              )}

              <Textarea placeholder="Edit your description here." {...register("description")} />

              <Button type="submit" disabled={editMutation.isPending}>
                {editMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

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
              <Button onClick={() => deleteMutation.mutate(task.id)} 
                variant="destructive" 
                disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </TableCell>
    </TableRow>
  );
};

export default Task;