import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchToDos = createAsyncThunk(
  "todos/fetchToDos",
  async function (_, { rejectWithValue }) {
    //_ - агр. функ. если бы они были
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=30"
      );

      if (!response.ok) {
        throw new Error("Что-то пошло не так...");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// вариант с разбивкой на ползователей
export const getUserState = createAsyncThunk(
  "todo/getUserState",
  async function () {
    try {
      // await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
      const respons = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((response) => response.json());
      return respons;
    } catch (error) {}
  }
);

export const deleteToDoServer = createAsyncThunk(
  "todo/deleteToDo",
  async function ({ id }, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          metod: "DELETE",
        }
      );
      // console.log(response);
      if (!response.ok) {
        throw new Error("Удаление пошло не так...");
      }

      dispatch(deleteToDo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function ({ id }, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("При смене статуса что то пошло не так...");
      }

      dispatch(toggleTodoComplete({ id }));

      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function ({ text }, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        userId: 1,
        title: text,
        completed: false,
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: todo,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("При добавлении что то пошло не так...");
      }

      const data = await response.json();
      dispatch(addToDo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const statusLoading = (state) => {
  state.status = "loading";
  state.error = null;
};
const statusRejectide = (state) => {
  state.status = "rejectide";
};

const todoSlice = createSlice({
  name: "todo",

  initialState: {
    todos: [],
    status: null,
    error: null,
    todosUser: [],
  },

  reducers: {
    addToDo(state, action) {
      state.todos.push(action.payload);
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

  extraReducers: (builder) => {
    // first fetch
    builder.addCase(fetchToDos.pending, statusLoading);

    builder.addCase(fetchToDos.fulfilled, (state, action) => {
      state.status = "resolve";
      state.todos = action.payload;
    });
    builder.addCase(fetchToDos.rejected, (state, action) => {
      state.status = "rejectide";
      state.error = action.payload;
    });

    builder.addCase(getUserState.fulfilled, (state, action) => {
      state.todosUser = action.payload;
      console.log(state.todosUser);
    });
    // delete
    builder.addCase(deleteToDoServer.pending, statusLoading);
    builder.addCase(deleteToDoServer.fulfilled, statusRejectide);
    builder.addCase(deleteToDoServer.rejected, (state, action) => {
      state.status = "rejectide";
      state.error = action.payload;
    });
    // toggle staus
    builder.addCase(toggleStatus.pending, statusLoading);
    builder.addCase(toggleStatus.fulfilled, statusRejectide);
    builder.addCase(toggleStatus.rejected, (state, action) => {
      state.status = "rejectide";
      state.error = action.payload;
    });
  },
});

const { addToDo, deleteToDo, toggleTodoComplete } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
