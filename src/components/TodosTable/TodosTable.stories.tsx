import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodosTable, { ITodosTable } from './TodosTable';
import { mockTodosTableProps } from './TodosTable.mocks';

export default {
  title: 'todosTable/TodosTable',
  component: TodosTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodosTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodosTable> = (args) => (
  <TodosTable {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodosTableProps.base,
} as ITodosTable;