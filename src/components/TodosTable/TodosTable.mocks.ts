import { ITodosTable } from './TodosTable';

const base: ITodosTable = {
  data: [ {
    Id: 0,
    Description: "Створити початкову сторінку",
    Deadline: new Date(),
    State:"Done"
  },
  {
    Id: 1,
    Description: "Ро",
    Deadline: new Date(),
    State:"In progress"
  },
  {
    Id: 2,
    Description: "Р",
    Deadline: new Date(),
    State:"Outdated"
  },],
  error: null
};

export const mockTodosTableProps = {
  base,
};