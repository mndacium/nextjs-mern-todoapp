import type { NextApiRequest, NextApiResponse } from 'next'
import ITodo from '../../models/ITodo'
// Fake users data
const todos: ITodo[] = [ {
  Id: 0,
  Description: "Створити початкову сторінку",
  Deadline: new Date(),
  State:"Done"
},
{
  Id: 1,
  Description: "Роздати стілька",
  Deadline: new Date(),
  State:"In progress"
},
{
  Id: 2,
  Description: "Роздати стілька",
  Deadline: new Date(),
  State:"Failed"
},]

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(todos)
}