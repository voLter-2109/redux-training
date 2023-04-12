import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    console.log(res.data);
    dispatch(setPosts(res.data));
  }
);

export const removePostbyId = createAsyncThunk(
  "post/removePostbyId",
  async ({ id }, { rejectWithValue, dispatch, getState }) => {
    console.log(id);
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    // сам обьект на который нажали
    let test = getState().post.posts.filter((todo) => todo.id === id);
    console.log(test);
    // удаляем на сервере и если ок, удаляем в метном state.post
    dispatch(removePost(id));
    let test2 = getState();
    console.log(test2);
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      console.log("setPosts");
      state.posts = action.payload;
    },
    removePost: (state, action) => {
      console.log("removePost");
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // first fetch
    builder.addCase(getPosts.fulfilled, (state, action) => {
      console.log("getPosts:ok");
    });
    builder.addCase(getPosts.pending, (state, action) => {
      console.log("getPosts:loading");
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log("getPosts:error");
    });
    builder.addCase(removePostbyId.fulfilled, (state, action) => {
      console.log("removePostbyId:ok");
    });
    builder.addCase(removePostbyId.pending, (state, action) => {
      console.log("removePostbyId:loading");
      console.log(action);
    });
    builder.addCase(removePostbyId.rejected, (state, action) => {
      console.log("removePostbyId:error");
    });
  },
});

export const { setPosts, removePost } = postSlice.actions;
export default postSlice.reducer;
