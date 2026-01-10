"use client";

import { IoAddCircle } from "react-icons/io5";
import { FormEventHandler, useState } from "react";
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

const AddTask = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setDialogOpen(false);
    router.refresh();
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type Here"
              className="w-full"
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddTask;