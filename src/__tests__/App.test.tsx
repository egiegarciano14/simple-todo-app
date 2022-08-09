import { screen, cleanup, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import { setupStore } from '../redux/store';
import todosReducer, { addTodo, removeTodo, setTodoStatus } from '../redux/todo/slice';
import { getTodoLists } from '../redux/todo/selector';
import App from '../App';
import { Todo } from '../interface/Todo';

const view = () => renderWithProviders(<App />);

afterEach(() => {
  cleanup();
});

describe('View is rendered properly', () => {
  test('Heading text should displayed', () => {
    view();

    // Possible solution to "not wrapped in act" erros
    // await act(async () => {
    // await view();
    // });

    const headingText = screen.getByRole('heading');

    expect(headingText).toHaveTextContent('Todo List');
  });

  test('Input field should displayed', () => {
    view();

    // const labelText = screen.getByLabelText('To Do Item'); // using getByLabelText()
    const inputField = screen.getByRole('textbox', { name: 'To Do Item' });

    expect(inputField).toBeInTheDocument();
  });

  test('Add item button is displayed', () => {
    view();

    const button = screen.getByRole('button', { name: 'Add Item' });

    expect(button).toHaveStyle('background-color: blue');
    expect(button).toBeInTheDocument();
  });
});

describe('Should add todo item', () => {
  test('user can type in the input', async () => {
    view();

    const user = userEvent.setup();
    const input = screen.getByLabelText('To Do Item');
    await user.type(input, 'Buy milk');

    expect(input).toHaveValue('Buy milk');
  });

  test('user can add item by pressing enter key', async () => {
    view();

    const user = userEvent.setup();
    const input = screen.getByLabelText('To Do Item');
    await user.type(input, 'Buy milk{enter}');
    expect(input).toHaveValue('');

    const itemText = screen.getByText('Buy milk');
    expect(itemText).toBeInTheDocument();
  });

  test('user can add item by add item button', async () => {
    view();

    const user = userEvent.setup();
    const input = screen.getByLabelText('To Do Item');
    await user.type(input, 'Buy milk{enter}');
    expect(input).toHaveValue('');

    const addItemButton = screen.getByRole('button', { name: 'Add Item' });
    await user.click(addItemButton);

    const listItem = screen.getByRole('listitem');
    const listItemText = within(listItem).getByText('Buy milk');
    expect(listItemText).toBeInTheDocument();
  });
});

describe('Should delete todo item and should todo item as complete', () => {
  test('user can check todo item as complete', async () => {
    const initialTodos = [{ id: 1, title: 'Buy milk', completed: false }];

    renderWithProviders(<App />, {
      preloadedState: {
        todos: {
          todoLists: initialTodos,
        },
      },
    });

    const user = userEvent.setup();
    const checkBox = screen.getAllByRole('checkbox');
    await user.click(checkBox[0]);
    const itemText = screen.getByText('Buy milk');

    expect(checkBox[0]).toBeChecked();
    expect(itemText).toHaveStyle('text-decoration-line: line-through');
  });

  test('user can delete todo item', async () => {
    const store = setupStore();
    store.dispatch(addTodo('Buy milk'));
    renderWithProviders(<App />, { store });

    const user = userEvent.setup();
    const deleteButton = screen.getAllByTestId('delete-button');
    await user.click(deleteButton[0]);
    const itemText = screen.queryByText('Buy milk');

    expect(itemText).not.toBeInTheDocument();
  });
});

describe('Should check the initial state with todo reducers', () => {
  test('should return the initial state', () => {
    expect(todosReducer(undefined, { type: undefined })).toEqual({ todoLists: [] });
  });

  test('should handle a todo being added to an empty list', () => {
    expect(todosReducer(undefined, addTodo('Buy milk'))).toEqual({
      todoLists: [{ id: 2, title: 'Buy milk', completed: false }],
    });
  });

  test('should handle a todo being added to an existing list', () => {
    const previousState = { todoLists: [{ id: 0, title: 'Buy milk', completed: true }] };

    expect(todosReducer(previousState, addTodo('Buy cereal'))).toEqual({
      todoLists: [
        { id: 0, title: 'Buy milk', completed: true },
        { id: 3, title: 'Buy cereal', completed: false },
      ],
    });
  });

  test('should remove a todo item', () => {
    const previousState = {
      todoLists: [
        { id: 0, title: 'Buy milk', completed: true },
        { id: 1, title: 'Buy cereal', completed: false },
      ],
    };

    expect(todosReducer(previousState, removeTodo(0))).toEqual({
      todoLists: [{ id: 1, title: 'Buy cereal', completed: false }],
    });
  });

  test('should set the satus of item to complete and not complete', () => {
    const previousState = {
      todoLists: [
        { id: 0, title: 'Buy milk', completed: true },
        { id: 1, title: 'Buy cereal', completed: false },
      ],
    };

    expect(todosReducer(previousState, setTodoStatus({ completed: false, id: 0 }))).toEqual({
      todoLists: [
        { id: 0, title: 'Buy milk', completed: false },
        { id: 1, title: 'Buy cereal', completed: false },
      ],
    });

    expect(todosReducer(previousState, setTodoStatus({ completed: true, id: 1 }))).toEqual({
      todoLists: [
        { id: 0, title: 'Buy milk', completed: true },
        { id: 1, title: 'Buy cereal', completed: true },
      ],
    });
  });
});

describe('Should check the initial state with todo selectors', () => {
  test('should return the initial state', () => {
    const state: any = {
      todos: {
        todoLists: [] as Todo[],
      },
    };

    expect(getTodoLists(state)).toEqual({ todoLists: [] });
  });

  test('should return the existing state', () => {
    const state: any = {
      todos: { todoLists: [{ id: 1, title: 'Buy milk', completed: false }] },
    };

    expect(getTodoLists(state)).toEqual({
      todoLists: [{ id: 1, title: 'Buy milk', completed: false }],
    });
  });
});

describe('Fetch todo list', () => {
  test('should fetch todo list', async () => {
    view();

    const listItem = await screen.findByText('delectus aut autem');
    // const listItemText = await within(listItem).findByText('Buy milk');

    expect(listItem).toBeInTheDocument();
  });
});

// test that user can visit localhost:3000/s
// test components
// test redux
