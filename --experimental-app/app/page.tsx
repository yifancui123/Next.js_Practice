import { getAllTodos } from "@/api";
import TodoList from "./TodoList";
import AddTask from "./AddTask";


export default async function Home(){
 const tasks = await getAllTodos();
 console.log(tasks);


 return(
   <main className="max-w-4xl mx-auto mt-4">
     <div className="text-center my-5 flex flex-col gap-4">
       <h1 className="text-2xl font-bold">Todo List App</h1>
       <AddTask/>
     </div>
     <TodoList/>
   </main>
 );
}
