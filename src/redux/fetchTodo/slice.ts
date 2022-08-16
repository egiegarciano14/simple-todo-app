import { createSlice } from '@reduxjs/toolkit';
import { addTodos, getAllTodo, deleteTodo, updateTodo } from './thunks';
import { Todo } from '../../interface/Todo';

const fetchTodoSlice = createSlice({
  name: 'fetchTodo',
  initialState: {
    loading: true,
    fetchTodoList: [] as Todo[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodos.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getAllTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchTodoList = action.payload;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = fetchTodoSlice.actions;

export default fetchTodoSlice.reducer;
