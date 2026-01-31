"use client";

import { ITask } from "@/types/tasks";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
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
import { useDeleteTodos, useEditTodos } from "./hook/mutations";

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
    formState: { errors },
    reset,
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      todoTitle: task.title || "",
      description: task.description || ""
    }
  });

    const resetDialog = (open:boolean) => {
      setDialogOpenEdit(open);
      if (!open){
        reset({
          todoTitle: task.title || "",
          description: task.description || ""
        });
      }
    }

  const editMutation = useEditTodos();

  const onSubmit = (data: EditTaskFormData) => {
    editMutation.mutate(
      {
        id: task.id,
        title: data.todoTitle,
        description: data.description
      },
      {
        onSuccess: () => {
          setDialogOpenEdit(false);
        }
      }
    );
  }

  const deleteMutation = useDeleteTodos();

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
        <Dialog open={dialogOpenEdit} onOpenChange={resetDialog}>
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
              <Button
                onClick={() => deleteMutation.mutate(task.id, {
                  onSuccess: () => {
                    setDialogOpenDelete(false);
                  }
                })}
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
