//Create hooks

import { addTodo, deleteTodo, editTodo } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTodos = ()=>{
  const queryClient = useQueryClient();
  return (
    useMutation({
    mutationFn: addTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: ()=>{
      alert("Failed to edit task, please try again.");
    }
  }))
}

export const useEditTodos = () => {
  const queryClient = useQueryClient(); // Get access to the cache
  return (
    useMutation({
      mutationFn: editTodo,
      onSuccess:()=>{
        queryClient.invalidateQueries({ queryKey: [ "todos" ]});
      },
      onError: ()=>{
        alert("Failed to edit task, please try again.");
      }
    })
  )
}

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  return(
    useMutation({
    mutationFn: deleteTodo,
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: [ "todos" ]});
    },
    onError:()=>{
      alert("Failed to delete task, please try again.");
    }
    })
  )
}
