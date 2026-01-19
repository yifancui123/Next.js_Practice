import { getAllTodos } from "@/api";
import { useQuery } from "@tanstack/react-query";

// Reader hook
export const useTodos = ()=>{
  const {data, isLoading, error} = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos
});
  return{
    data,
    isLoading,
    error
  }
} 

