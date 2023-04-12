import { useDispatch } from "react-redux";
import { toggleCompletedToDo, removeToDo } from "../features/todo/todoSlice";

const TodoItem = ({ complited, id, text }) => {
  const dispatch = useDispatch();

  const toggleToDoHandler = (id) => {
    dispatch(toggleCompletedToDo(id));
  };

  const removeToDoHandler = (id) => {
    dispatch(removeToDo(id));
  };

  return (
    <div className="flex justify-between items-center my-2">
      <div
        className="text-sm px-4 py-2 cursor-pointer bg-lime-300 hover:bg-lime-400"
        onClick={() => toggleToDoHandler(id)}
      >
        Complete
      </div>
      <div className={`text-sm ${complited ? "line-through " : ""}`}>
        {text}
      </div>
      <div
        className="text-sm px-4 py-2 flex bg-red-400 hover:bg-red-500 transition-all text-white cursor-pointer"
        onClick={() => removeToDoHandler(id)}
      >
        Delete
      </div>
    </div>
  );
};

export default TodoItem;
