import { useDispatch } from "react-redux";
import { deleteToDo, toggleTodoComplete } from "../store/todoSlice";

const ToDoItem = ({ id, completed, text }) => {
  const dispatch = useDispatch();

  return (
    <li key={id}>
      <input
        type="checkbox"
        name=""
        id=""
        checked={completed}
        onChange={() => dispatch(toggleTodoComplete({ id }))}
      />
      <span>{text}</span>
      <span className="delete" onClick={() => dispatch(deleteToDo({ id: id }))}>
        &times;
      </span>
    </li>
  );
};

export default ToDoItem;
