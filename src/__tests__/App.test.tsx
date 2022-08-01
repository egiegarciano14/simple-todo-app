import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

const view = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

afterEach(() => {
  cleanup();
});

describe('View is rendered properly', () => {
  test('Heading text should displayed', () => {
    view();

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

  test('user can add item by pressing enter', async () => {
    view();

    const user = userEvent.setup();
    const input = screen.getByLabelText('To Do Item');
    await user.type(input, 'Buy milk{enter}');
    expect(input).toHaveValue('');

    // const listItem = screen.getByRole('listitem');
    // const listItemText = within(listItem).getByText('Buy milk');
    // expect(listItemText).toBeInTheDocument();

    const itemText = screen.getByText('Buy milk');
    expect(itemText).toBeInTheDocument();

    cleanup();
  });
});

describe('Should delete todo item and should todo item as complete', () => {
  test('user can check todo item as complete', async () => {
    view();

    const user = userEvent.setup();
    const checkBox = screen.getAllByRole('checkbox');
    await user.click(checkBox[0]);
    const itemText = screen.getByText('Buy milk');

    expect(itemText).toHaveStyle('text-decoration-line: line-through');
  });

  test('user can delete todo item', async () => {
    view();

    const user = userEvent.setup();
    // const input = screen.getByLabelText('To Do Item');
    // await user.type(input, 'Buy milk{enter}');

    const deleteButton = screen.getAllByTestId('delete-button');
    await user.click(deleteButton[0]);
    const itemText = screen.queryByText('Buy milk');

    expect(itemText).not.toBeInTheDocument();
  });
});
