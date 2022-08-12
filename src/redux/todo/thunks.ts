import { createAsyncThunk } from '@reduxjs/toolkit';
import TodoApi from '../../api/todoApi';
import { updateTodoPayload } from '../../api/todoApi';
import { Todo } from '../../interface/Todo';

export const addTodos = createAsyncThunk('todos/addTodos', async (title: string) => {
  try {
    const res = await TodoApi.addTodo(title);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  // return (await response.json()) as FetchTodo;
});

export const getAllTodo = createAsyncThunk<Todo[]>('todos/getAllTodo', async () => {
  try {
    const res = await TodoApi.getAllTodo();
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  try {
    const res = await TodoApi.deleteTodo(id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (payload: updateTodoPayload) => {
    try {
      const res = await TodoApi.updateTodo(payload);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
);
