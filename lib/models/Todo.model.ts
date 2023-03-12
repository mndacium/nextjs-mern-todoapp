import { Model, Schema } from 'mongoose';
import createModel from '../createModel';

export interface ITodo {
  _id: string;
  Description: string;
  Deadline: Date;
  State: 'In progress' | 'Done' | 'Outdated' | 'Failed';
  User:Schema.Types.ObjectId;
}

type TodoModel = Model<ITodo, {}>;

const todoSchema = new Schema<ITodo, TodoModel>({
  Description: { type: String, required: true },
  Deadline: { type: Date, required: true },
  State: { type: String, required: true },
  User:{type:Schema.Types.ObjectId,ref:"User"}
});

export default createModel<ITodo, TodoModel>('Todo', todoSchema, 'Todos');
