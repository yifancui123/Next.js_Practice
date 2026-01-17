import { ITask } from "@/types/tasks";
import Task from "./Task";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ( {tasks} ) => {
  return(
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tasks</TableHead>
          <TableHead>Descriptions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  )
}
export default TodoList;