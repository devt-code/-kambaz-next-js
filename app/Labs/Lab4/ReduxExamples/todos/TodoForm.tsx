import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl
        className="me-2"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo"
      />
      <Button
        variant="warning"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        className="me-2"
      >
        Update
      </Button>
      <Button
        variant="success"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        className="me-2"
      >
        Add
      </Button>
    </ListGroupItem>
  );
}
