import { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { addTodo, removeTodo, setTodoStatus } from './redux/todoSlice';

const App = () => {
  const [todoDescription, setTodoDescription] = useState('');

  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <main className='mt-11 flex h-screen flex-col items-center font-semibold'>
      <h3 className='text mb-4 text-5xl'>Todo List</h3>
      <form className='flex w-2/4 flex-col text-base' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='to-do-item'>To Do Item</label>
        <input
          type='text'
          name='to-do-item'
          id='to-do-item'
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
          className='mt-2 w-full rounded border border-slate-900 p-3 font-normal'
        />
        <button
          type='submit'
          style={{ backgroundColor: 'blue' }}
          onClick={() => {
            todoDescription !== '' && dispatch(addTodo(todoDescription.trim()));
            setTodoDescription('');
          }}
          className='mt-3 mb-4 rounded p-2 text-white'
        >
          Add Item
        </button>
      </form>

      <ul className='w-2/4'>
        {todoList.map((todo) => (
          <li key={todo.id} className='flex items-center justify-between'>
            <div style={{ textDecorationLine: `${todo.completed ? 'line-through' : ''}` }}>
              {todo.description}
            </div>
            <div className='flex items-center'>
              <button
                data-testid='delete-button'
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </button>
              <Checkbox
                edge='end'
                value={todo.completed}
                onChange={() => {
                  dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }));
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
