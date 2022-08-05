import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodo } from '../../interface/Todo';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return (await response.json()) as FetchTodo;
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
