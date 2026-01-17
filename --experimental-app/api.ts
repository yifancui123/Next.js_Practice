import { ITask } from "./types/tasks";

const baseUrl = "http://127.0.0.1:3001";


//async -> return a promise
//ask a backend API for all todo tasks

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {cache:"no-store"});
    
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.status} ${res.statusText}`);
    }
  
    const todos = await res.json();
    return todos;
  } catch (error) {
    console.error("Error fetching todos: ", error);
    throw error;
  }
}

export const addTodo = async (todo: ITask): Promise<ITask> =>{
  try{
    const res = await fetch(`${baseUrl}/tasks`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(todo)
    });

    //Check if the responsewas successful
    if(!res.ok){
      throw new Error(`Failed to add todo: ${res.status} ${res.statusText}`);
    }

    const newTodo= await res.json();
    return newTodo;
  } catch (error){
    console.error("Error adding todo: ", error);
    throw error;
  }
}

export const editTodo = async (todo: ITask): Promise<ITask> =>{
  try{
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(todo)
    })

    if(!res.ok){
      throw new Error(`Failed to edit todo: ${res.status} ${res.statusText}`);  // Add statusText
    }

    const updateTodo= await res.json();
    return updateTodo;
  }catch(error){
    console.error("Error editing todo: ", error);
    throw error;
  }
}

export const deleteTodo = async (id:string): Promise<void> =>{
  
  try{
    const res = await fetch(`${baseUrl}/tasks/${id}`,{
      method: "DELETE",
    })
    if(!res.ok){
      throw new Error(`Failed to delete todo: ${res.status} ${res.statusText}`);
    }
  }catch(error){
    console.error("Error deleting todo: ", error);
    throw error;
  }
}

export const addDescription = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(todo)
  })

  const newDes = await res.json();
  return newDes;
};