
export interface ITodosTable {
  sampleTextProp: string;
}

const TodosTable: React.FC<ITodosTable> = ({ sampleTextProp }) => {
  return <div className="text-3xl font-bold underline">{sampleTextProp}</div>;
};

export default TodosTable;
