"use client";

import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
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


const AddTaskSchema = z.object ({
    todoTitle: z
      .string()
      .min(2, "Todo title must be at least 2 characters")
      .max(50, "Todo title must be less than 50 characters")
      .trim();
  });

type AddTaskFormData = z.infer<typeof AddTaskSchema>;

const AddTask = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(AddTaskSchema),
  });

  const onSubmit = async (data: AddTaskFormData) => {
    try{
      await addTodo({
        id: uuidv4(),
        title: data.todoTitle,
      });
      reset();
      setDialogOpen(false);
      router.refresh();
    }catch(error){
      alert("Failed to add task, please try again.");
    }
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
            />
            {
              errors.todoTitle && (
                <p className="text-sm text-red-500">
                  {errors.todoTitle.message}
                </p>
              )
            }
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddTask;