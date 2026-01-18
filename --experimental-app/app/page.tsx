"use client";

import { getAllTodos } from "@/api";
import TodoList from "./TodoList";
import AddTask from "./AddTask";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner"


export default function Home(){
 const { data:tasks, isLoading, error} = useQuery({
  queryKey: ["todos"],
  queryFn: getAllTodos
 });

if (isLoading) return (
  <div className="flex items-center gap-4">
      <Spinner />
    </div>
);
if (error) return <div>Error loading tasks</div>;

 return(
   <main className="max-w-4xl mx-auto mt-4">
     <div className="text-center my-5 flex flex-col gap-4">
       <h1 className="text-2xl font-bold">Todo List App</h1>
       <AddTask/>
     </div>
     <TodoList tasks={ tasks || []}/>
   </main>
 );
}
