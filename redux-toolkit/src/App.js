import { useState } from "react";
import ToDOList from "./components/ToDoList";
import InputField from "./components/InputFeild";
import { addToDo } from "./store/todoSlice";
import "./App.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const addTask = () => {
    dispatch(addToDo({ text: text }));
    setText("");
  };

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      <ToDOList />
    </div>
  );
}

export default App;
