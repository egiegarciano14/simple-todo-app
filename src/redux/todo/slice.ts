import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../interface/Todo';
import { RootState } from '../store';

const initialState = [] as Todo[];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // addTodo: {
    //   reducer: (state, action: PayloadAction<Todo>) => {
    //     state.push(action.payload);
    //   },
    //   prepare: (description: string) => ({
    //     payload: {
    //       id: uuidv4(),
    //       description,
    //       completed: false,
    //     } as Todo,
    //   }),
    // },
    addTodo(state, action: PayloadAction<string>) {
      state.push({
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        description: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action: PayloadAction<number>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ completed: boolean; id: number }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const todoLists = (state: RootState) => state.todos;
export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;
