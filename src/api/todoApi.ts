import { AxiosRequestConfig } from 'axios';
import baseAPI from './base';
import { Todo } from '../interface/Todo';

export type updateTodoPayload = {
  id: number;
  completed: boolean;
};

const TodoApi = {
  addTodo: (title: string) => {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: '/addTodo',
      data: {
        title: title,
      },
    };
    return baseAPI.request(options);
  },

  getAllTodo: () => {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: '/getAllTodo',
    };
    return baseAPI.request(options);
  },

  deleteTodo: (id: number) => {
    const options: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/deleteTodo/${id}`,
    };
    return baseAPI.request(options);
  },

  updateTodo: (payload: updateTodoPayload) => {
    const options: AxiosRequestConfig = {
      method: 'PUT',
      url: `/updateTodo/${payload.id}`,
      data: {
        completed: payload.completed,
      },
    };
    return baseAPI.request(options);
  },
};

export default TodoApi;
