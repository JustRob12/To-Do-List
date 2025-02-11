import React, { useEffect } from 'react';
import { TodoModel } from '../models/TodoModel';
import { TodoView } from '../components/TodoView';

export const TodoController: React.FC = () => {
  const [model] = React.useState(new TodoModel());
  const [todos, setTodos] = React.useState(model.getAllTodos());

  const handleAdd = async (text: string) => {
    await model.addTodo(text);
    setTodos(model.getAllTodos());
  };

  const handleDelete = async (id: number) => {
    await model.deleteTodo(id);
    setTodos(model.getAllTodos());
  };

  const handleToggle = async (id: number) => {
    await model.toggleTodo(id);
    setTodos(model.getAllTodos());
  };

  return (
    <TodoView
      todos={todos}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  );
}; 