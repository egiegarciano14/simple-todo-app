import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import todosReducer from './todo/slice';
import fetchTodoReducer from './fetchTodo/slice';

const rootReducer = combineReducers({
  todos: todosReducer,
  fetchTodo: fetchTodoReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type TodoRootState = ReturnType<typeof todosReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
