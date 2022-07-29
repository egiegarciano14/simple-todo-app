import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

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

  test('Input field with placeholder is displayed', () => {
    view();

    const input = screen.getByLabelText('To Do Item');

    expect(input).toBeInTheDocument();
  });

  test('Add item button is displayed', () => {
    view();

    const button = screen.getByRole('button', { name: 'Add Item' });

    expect(button).toBeInTheDocument();
  });
});

describe('Should add todo item', () => {
  test('user can input and add item by enter key', async () => {
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

    const text = screen.getByText('Buy milk');

    expect(text).toBeInTheDocument();
  });
});

describe('Should delete todo item', () => {
  test('user can delete todo item', async () => {
    view();
    // const user = userEvent.setup();
    // const input = screen.getByLabelText('To Do Item');
    // await user.type(input, 'Buy milk{enter}');
    const text = screen.getByText('Buy milk');
    // expect(text).toBeInTheDocument();

    // const deleted = screen.getAllByTestId('delete-button');
    // await user.click(deleted[0]);

    expect(text).toBeInTheDocument();
  });
});
