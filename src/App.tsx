import { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import { useAppDispatch, useAppSelector } from './redux/hooks';
// import { addTodo, removeTodo, setTodoStatus } from './redux/todo/slice';
// import { getTodoLists } from './redux/todo/selector';
import { getFetchTodoLists } from './redux/fetchTodo/selector';
import { addTodos, getAllTodo, deleteTodo, updateTodo } from './redux/fetchTodo/thunks';

const App = () => {
  const dispatch = useAppDispatch();

  // const { todoLists } = useAppSelector(getTodoLists);
  const { fetchTodoList, loading } = useAppSelector(getFetchTodoLists);

  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(getAllTodo());
  }, [dispatch]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    title !== '' &&
      dispatch(addTodos(title.trim())).then(() => {
        setTitle('');
        dispatch(getAllTodo());
      });
  };

  return (
    <main className='mt-11 flex h-screen flex-col items-center font-semibold'>
      <h3 className='text mb-4 text-5xl'>Todo List</h3>
      <form className='flex w-2/4 flex-col text-base' onSubmit={handleSubmit}>
        <label htmlFor='to-do-item'>To Do Item</label>
        <input
          type='text'
          name='to-do-item'
          id='to-do-item'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='mt-2 w-full rounded border border-slate-900 p-3 font-normal'
        />
        <button
          type='submit'
          style={{ backgroundColor: 'blue' }}
          className='mt-3 mb-4 rounded p-2 text-white'
        >
          Add Item
        </button>
      </form>

      {loading ? (
        'Loading...'
      ) : (
        <ul className='w-2/4'>
          {fetchTodoList.map((todo) => (
            <li key={todo.id} className='flex items-center justify-between'>
              <div style={{ textDecorationLine: `${todo.completed ? 'line-through' : ''}` }}>
                {todo.title}
              </div>
              <div className='flex items-center'>
                <button
                  data-testid='delete-button'
                  onClick={() => {
                    dispatch(deleteTodo(todo.id)).then(() => {
                      dispatch(getAllTodo());
                    });
                  }}
                >
                  <DeleteIcon />
                </button>
                <Checkbox
                  edge='end'
                  value={todo.completed}
                  checked={todo.completed && todo.completed}
                  onChange={() => {
                    dispatch(updateTodo({ id: todo.id, completed: !todo.completed })).then(() => {
                      dispatch(getAllTodo());
                    });
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Todo: fetch all the todo when the status is completed */}
      {/* <div className='mt-10'>
        <div>All Completed Todos</div>
      </div> */}
    </main>
  );
};

export default App;
