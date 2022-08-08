import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodo } from '../../interface/Todo';

export const fetchTodos = createAsyncThunk<FetchTodo>('todos/fetchTodos', async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return res.data;
  } catch (err) {
    console.log(err);
  }
  // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  // return (await response.json()) as FetchTodo;
});

const fetchTodoSlice = createSlice({
  name: 'fetchTodo',
  initialState: {
    loading: true,
    fetchTodoList: {} as FetchTodo,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchTodoList = action.payload;
    });
  },
});

export const {} = fetchTodoSlice.actions;

export default fetchTodoSlice.reducer;
