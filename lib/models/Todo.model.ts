
  import { Model, Schema } from 'mongoose';
import createModel from '../createModel';
  
  interface ITodo {
    
    Description: String,
    Deadline: String,
    State: "In progress"|"Done"|"Outdated"|"Failed"
  }
  
  type TodoModel = Model<ITodo, {}>;
  
  const todoSchema = new Schema<ITodo, TodoModel>({
    
    Description: String,
    Deadline: String,
    State: String
  });
  

  
  export default createModel<ITodo, TodoModel>('Todo', todoSchema,'Todos');
  