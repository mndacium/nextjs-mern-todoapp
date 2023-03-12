import UserModel from 'lib/models/User.model';
import dbConnect from 'lib/mongodb';
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
        const users = await UserModel.find() /* find all the data in our database */
     
        res.status(200).json(users)
      } catch (error) {
        res.status(400).json(error)
      }
      break
    case 'POST':
      try {
        const user = await UserModel.create(
          req.body
        ) 
        res.status(201).json(user)
      } catch (error) {
        res.status(400).json(error)
      }
      break
    default:
      res.status(400).json("Not invalid request")
      break
  }
}
