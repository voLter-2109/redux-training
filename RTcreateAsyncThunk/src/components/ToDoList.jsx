import { useSelector } from "react-redux";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {

  const todos = useSelector((state) => {
    return state.todos.todos;
  });



  return (
    <ul>
      {todos.map((todo) => {
        return (
          <ToDoItem
            key={todo.id}
            {...todo}

          />
        );
      })}
    </ul>
  );
};

export default ToDoList;
