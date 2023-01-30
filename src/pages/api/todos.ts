import dbConnect from 'lib/connection';
import TodoModel from 'lib/models/Todo.model';
import type { NextApiRequest, NextApiResponse } from 'next';
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;
export default async function test(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  try{
   await dbConnect();
   
  }
  catch(e){
    console.log(e)
  }
  
  switch (method) {
    case 'GET':
      try {
        const todos = await TodoModel.find() /* find all the data in our database */
     
        res.status(200).json({ success: true, data: todos })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const todo = await TodoModel.create(
          req.body
        ) 
        res.status(201).json({ success: true, data: todo })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
