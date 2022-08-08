export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FetchTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
