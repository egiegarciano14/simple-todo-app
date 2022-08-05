export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
