import { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addTodo, removeTodo, setTodoStatus } from './redux/todo/slice';
import { getTodoLists } from './redux/todo/selector';
import { getFetchTodoLists } from './redux/fetchTodo/selector';
import { fetchTodos } from './redux/fetchTodo/slice';

const App = () => {
  const [todoDescription, setTodoDescription] = useState('');

  const { todoLists } = useAppSelector(getTodoLists);
  const dispatch = useAppDispatch();

  const { fetchTodoList, loading } = useAppSelector(getFetchTodoLists);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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

      {loading ? (
        'Loading...'
      ) : (
        <ul className='w-2/4'>
          <li className='flex items-center justify-between'>
            <div style={{ textDecorationLine: `${fetchTodoList.completed ? 'line-through' : ''}` }}>
              {fetchTodoList.title}
            </div>
            <div className='flex items-center'>
              <button
                data-testid='delete-button'
                onClick={() => {
                  dispatch(removeTodo(fetchTodoList.id));
                }}
              >
                <DeleteIcon />
              </button>
              <Checkbox
                edge='end'
                value={fetchTodoList.completed}
                onChange={() => {
                  dispatch(
                    setTodoStatus({ completed: !fetchTodoList.completed, id: fetchTodoList.id }),
                  );
                }}
              />
            </div>
          </li>
        </ul>
      )}

      <ul className='w-2/4'>
        {todoLists.map((todo) => (
          <li key={todo.id} className='flex items-center justify-between'>
            <div style={{ textDecorationLine: `${todo.completed ? 'line-through' : ''}` }}>
              {todo.title}
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
