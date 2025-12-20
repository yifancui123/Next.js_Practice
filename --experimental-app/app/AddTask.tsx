import { IoAddCircle } from "react-icons/io5";
const AddTask = () => {
  return(
    <div>
      <button className="btn btn-primary w-full">
        Add New Task <IoAddCircle className="+" size={18}/> 
      </button>
    </div>
    );
};
export default AddTask;