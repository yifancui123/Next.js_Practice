import { ITask } from "./types/tasks";

const baseUrl = "http://127.0.0.1:3001";


//async -> return a promise
//ask a backend API for all todo tasks

export const getAllTodos = async (): Promise<ITask[]> => {
 const res = await fetch(`${baseUrl}/tasks`);
 const todos = await res.json();
 return todos;
}
