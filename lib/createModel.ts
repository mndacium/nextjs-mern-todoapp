import { Model, model, Schema } from 'mongoose';

// Simple Generic Function for reusability
// Feel free to modify however you like
export default function createModel<T, TModel = Model<T>>(
  modelName: string,
  schema: Schema<T>,
  collection?: string
): TModel {
  let createdModel: TModel;
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    

    // @ts-ignore
     if (!global[modelName]) {
      if(collection){
        createdModel = model<T, TModel>(modelName, schema,collection);
      }
      else createdModel = model<T, TModel>(modelName, schema);
      // @ts-ignore
      global[modelName] = createdModel;
    }
    // @ts-ignore
    createdModel = global[modelName];
  } else {
    // In production mode, it's best to not use a global variable.
    createdModel = model<T, TModel>(modelName, schema);
  }

  return createdModel;
}
