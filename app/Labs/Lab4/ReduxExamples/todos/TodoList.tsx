import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { RootState } from "../../store/store";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todosReducer.todos);

  return (
    <div id="wd-todo-list-redux" className="p-3">
      <h2>Todo List</h2>
      <ListGroup className="mb-3">
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
