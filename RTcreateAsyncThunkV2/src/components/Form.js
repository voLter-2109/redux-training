import { useDispatch } from "react-redux";
import { addToDo } from "../features/todo/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Form = () => {
  const dispatch = useDispatch();
  const [todoValue, settodoValue] = useState("");

  const addToDoHandler = () => {
    // debugger;
    const todo = {
      id: uuidv4(),
      text: todoValue,
      complited: "",
    };

    dispatch(addToDo(todo));
    settodoValue("");
  };

  return (
    <form className="w-full flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={todoValue}
        onChange={(e) => settodoValue(e.target.value)}
        placeholder="Type something..."
        className="w-full p-1 focus:outline-none focus:border-lime-500 focus: border-2 placeholder:text-sm"
      />
      <button
        onClick={() => addToDoHandler()}
        type="submit"
        className="shrink-0 bg-lime-300  hover:bg-lime-400 transition-all px-3 text-sm"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
