import { useState, useEffect } from "react";
import ToDOList from "./components/ToDoList";
import InputField from "./components/InputFeild";
import { addNewTodo, fetchToDos, getUserState } from "./store/todoSlice";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todos);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo({ text: text }));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchToDos());
    dispatch(getUserState());
  }, [dispatch]);

  return (
    <div
      className="App"
      style={
        status === "loading"
          ? { backgroundColor: "grey" }
          : { backgroundColor: "white" }
      }
    >
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      {error && <h2> error occured: {error}</h2>}
      <ToDOList />
    </div>
  );
}

export default App;
