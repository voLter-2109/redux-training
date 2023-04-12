import { useDispatch, useSelector } from "react-redux";
import { deleteToDoServer, toggleStatus } from "../store/todoSlice";

const ToDoItem = ({ id, completed, title }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => {
    return state.todos.status;
  });

  return (
    <li key={id}>
      <input
        type="checkbox"
        name=""
        id=""
        checked={completed}
        onChange={() => dispatch(toggleStatus({ id }))}
      />
      <span>{title}</span>
      <span
        className="delete"
        onClick={() => {
          dispatch(deleteToDoServer({ id: id }));
        }}
      >
        {status === "loading" ? "" : "X"}
      </span>
    </li>
  );
};

export default ToDoItem;
