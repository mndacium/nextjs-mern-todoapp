import AlarmIcon from '@mui/icons-material/Alarm';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { ITodo } from 'lib/models/Todo.model';
import { useState } from 'react';
import useSWR from 'swr';
import StateIconButton from '../iconButton/stateIconButton';
export interface ITodosTable {}


const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const StateComparator: GridComparatorFn<string> = (v1:string, v2:string) => {
//   return states[v1] > states[v2] ? -1 : states[v1] < states[v2] ? 1 : 0;
// };

const TodosTable: React.FC<ITodosTable> = () => {
  const [stateIconButtonState, setStateIconButtonState] = useState('None');
  const { data: todos, error: error } = useSWR<ITodo[]>('/api/todos', fetcher);
  const updateState = (state: string): void => {
    setStateIconButtonState(state);
    console.log(state)
  };
  if (error) return <div>Failed to load</div>;
  if (!todos) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="col-span-12">
        <div className="flex justify-around mb-2 ">
          <div>
            <StateIconButton
              buttonState='Done'
              passedState={stateIconButtonState}
              icon={<DoneIcon sx={{ fontSize: "40px" ,color:'#00FFFF'}} />}
              updateState={updateState}
            ></StateIconButton>
          </div>
          <div>
          <StateIconButton
              buttonState='Failed'
              passedState={stateIconButtonState}
              icon={<RemoveDoneIcon sx={{ fontSize: "40px" ,color:'#00FFFF'}} />}
              updateState={updateState}
            ></StateIconButton>
          </div>
          <div>
          <StateIconButton
              buttonState='In progress'
              passedState={stateIconButtonState}
              icon={<AlarmIcon sx={{ fontSize: "40px" ,color:'#00FFFF'}} />}
              updateState={updateState}
            ></StateIconButton>
          </div>
          
          <div>
          <StateIconButton
              buttonState='Outdated'
              passedState={stateIconButtonState}
              icon={<AlarmOffIcon sx={{ fontSize: "40px" ,color:'#00FFFF'}} />}
              updateState={updateState}
            ></StateIconButton>
          </div>
          <div>
          <StateIconButton
              buttonState='None'
              passedState={stateIconButtonState}
              icon={<CloseIcon sx={{ fontSize: "40px" ,color:'#00FFFF'}} />}
              updateState={updateState}
            ></StateIconButton>
          </div>
        </div>
        <div className="overflow-auto lg:overflow-visible ">
          <table className="table text-gray-200  border-separate text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr key="Header">
                <th className="p-3">Description</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">State</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) =>{
                if(stateIconButtonState=='None' || todo.State==stateIconButtonState ) return (
                
                  <tr
                    key={todo._id}
                    className={`${
                      todo.State == 'Failed' ? 'line-through text-red-400' : ''
                    } bg-gray-800`}
                  >
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
  
                        <span
                          className={`${
                            todo.State == 'Failed' ? '' : ' text-gray-200'
                          } pl-2`}
                        >
                          {todo.State}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodosTable;
