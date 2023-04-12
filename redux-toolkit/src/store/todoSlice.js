import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addToDo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    deleteToDo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggleTodo = state.todos.find((todo) => {
        return todo.id === action.payload.id;
      });
      toggleTodo.completed = !toggleTodo.completed;
    },
  },
});

export const { addToDo, deleteToDo, toggleTodoComplete } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;

