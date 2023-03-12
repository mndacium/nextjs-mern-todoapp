import UserModel from 'lib/models/User.model';
import dbConnect from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    await dbConnect();
  } catch (e) {
    console.log(e);
  }

  try {
    const todo = await UserModel.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
}
