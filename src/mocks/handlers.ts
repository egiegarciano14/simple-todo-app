import { rest } from 'msw';

type TodoBody = {
  title: string;
};

export const handlers = [
  rest.post<TodoBody>('http://localhost:8080/api/todos/addTodo', async (req, res, ctx) => {
    const { title } = await req.json();

    return res(
      ctx.json([
        {
          id: 200,
          title: title,
          completed: false,
          createdAt: '2022-08-12T08:04:43.000Z',
          updatedAt: '2022-08-15T03:50:37.000Z',
        },
      ]),
      ctx.status(200),
    );
  }),

  rest.get('http://localhost:8080/api/todos/getAllTodo', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 100,
          title: 'Buy pencil',
          completed: false,
          createdAt: '2022-08-12T08:04:43.000Z',
          updatedAt: '2022-08-15T03:50:37.000Z',
        },
      ]),
      ctx.status(200),
    );
  }),
];
