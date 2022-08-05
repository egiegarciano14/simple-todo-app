import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../interface/Todo';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoLists: [] as Todo[],
  },
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
    addTodo({ todoLists }, { payload }: PayloadAction<string>) {
      todoLists.push({
        id: todoLists.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 3,
        title: payload,
        completed: false,
      });
    },
    removeTodo({ todoLists }, { payload }: PayloadAction<number>) {
      const index = todoLists.findIndex((todo) => todo.id === payload);
      todoLists.splice(index, 1);
    },
    setTodoStatus({ todoLists }, { payload }: PayloadAction<{ completed: boolean; id: number }>) {
      const index = todoLists.findIndex((todo) => todo.id === payload.id);
      todoLists[index].completed = payload.completed;
    },
  },
});

export const { addTodo, removeTodo, setTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;
