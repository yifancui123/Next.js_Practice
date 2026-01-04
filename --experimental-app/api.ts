import { ITask } from "./types/tasks";

const baseUrl = "http://127.0.0.1:3001";


//async -> return a promise
//ask a backend API for all todo tasks

export const getAllTodos = async (): Promise<ITask[]> => {
 const res = await fetch(`${baseUrl}/tasks`, {cache:"no-store"});
 const todos = await res.json();
 return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> =>{
  const res = await fetch(`${baseUrl}/tasks`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(todo)
  })

  const newTodo= await res.json();
  return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> =>{
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(todo)
  })

  const updateTodo= await res.json();
  return updateTodo;
}

export const deleteTodo = async (id:string): Promise<void> =>{
  const res = await fetch(`${baseUrl}/tasks/${id}`,{
    method: "DELETE",
  })
}
