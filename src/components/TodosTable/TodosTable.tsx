import CircleIcon from '@mui/icons-material/Circle';

import { ITodo } from 'lib/models/Todo.model';
import useSWR from 'swr';
export interface ITodosTable {}
const states: { [key: string]: number } = {
  Failed: 0,
  Outdated: 1,
  Done: 2,
  'In progress': 3,
};

const fetcher = (url:string) => fetch(url).then((res) => res.json())

// const StateComparator: GridComparatorFn<string> = (v1:string, v2:string) => {
//   return states[v1] > states[v2] ? -1 : states[v1] < states[v2] ? 1 : 0;
// };


const TodosTable: React.FC<ITodosTable> = () => {
  const { data:todos, error:error } = useSWR<ITodo[]>('/api/todos', fetcher)
  console.log(todos)
  if (error) return <div>Failed to load</div>
  if (!todos) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible ">
          <table className="table text-gray-200  border-separate text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Description</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">State</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id } className={`${todo.State=='Failed' ? "line-through text-red-400" : ''} bg-gray-800`}>
                  <td className="p-3">
                    <div className="flex align-items-center">
                      <div className="ml-3">
                        <div className="">{todo.Description}</div>
                        
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {new Date(todo.Deadline).toDateString()}
                  </td>
                  <td className="p-3 ">
                    <div>
                      {(() => {
                        switch (todo.State) {
                          case 'In progress':
                            return (
                                <CircleIcon
                                  fontSize="inherit"
                                  style={{ color: '#FFFF2E' }}
                                />
                            );
                          case 'Done':
                            return (

                                <CircleIcon
                                  fontSize="inherit"
                                  style={{ color: '#90E111' }}
                                />
                              
                            );
                          case 'Outdated':
                            return (
                                <CircleIcon
                                  fontSize="inherit"
                                  style={{ color: '#FF0000' }}
                                />
                            );

                          default:
                            return null;
                        }
                      })()}

                      <span className={`${todo.State=='Failed' ? "" : ' text-gray-200'} pl-2`}>{todo.State}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodosTable;
