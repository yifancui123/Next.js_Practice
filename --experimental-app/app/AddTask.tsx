"use client";

import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useAddTodos } from "./hook/mutations";


const AddTaskSchema = z.object ({
  todoTitle: 
    z.string()
      .min(2, "Todo title must be at least 2 characters")
      .max(50, "Todo title must be less than 50 characters")
      .trim(),
  description: 
    z.string()
      .max(200, "Description must be less than 200 characters")
      .trim()
});


type AddTaskFormData = z.infer<typeof AddTaskSchema>;

const AddTask = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors,isSubmitting },
    reset,
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(AddTaskSchema),
  });

  const addMutation = useAddTodos();
  const onSubmit = (data: AddTaskFormData) => {
    addMutation.mutate(
      {
        id: uuidv4(),
        title: data.todoTitle,
        description: data.description
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          reset();
        }
      }
    );
  }

  return(
    <div>
      <Button onClick={() => setDialogOpen(true)} className="w-full">
        Add New Task <IoAddCircle className="+" size={18}/>
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>
          <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Enter todo title"
              className="w-full"
              {...register("todoTitle")} 
              disabled={addMutation.isPending}
            />
            {
              errors.todoTitle && (
                <p className="text-sm text-red-500">
                  {errors.todoTitle.message}
                </p>
              )
            }

            <Textarea placeholder="Add your description here." {...register("description")} />

            <Button type="submit" disabled={addMutation.isPending}>
                {addMutation.isPending ? "Adding..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddTask;