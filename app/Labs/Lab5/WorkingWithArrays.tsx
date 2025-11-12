"use client";
import { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const [errorMessage, setErrorMessage] = useState(null);
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos{" "}
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />
      <h3>Removing from an Array</h3>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}{" "}
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />
      <h3 className="mb-4">Updating an Item in an Array</h3>
      <div className="row align-items-center mb-3">
        <div className="col-md-2">
          <FormControl
            defaultValue={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            placeholder="ID"
          />
        </div>
        <div className="col-md-6">
          <FormControl
            defaultValue={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            placeholder="Title"
          />
        </div>
        <div className="col-md-4 text-md-end mt-2 mt-md-0">
          <a
            href={`${API}/${todo.id}/title/${todo.title}`}
            className="btn btn-primary w-100 w-md-auto"
          >
            Update Todo
          </a>
        </div>
      </div>
      <div className="row align-items-start mb-3">
        <div className="col-md-2">
          <FormControl
            defaultValue={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            placeholder="ID"
          />
        </div>
        <div className="col-md-6">
          <FormControl
            as="textarea"
            rows={2}
            defaultValue={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            placeholder="Description"
          />
        </div>
        <div className="col-md-4 text-md-end mt-2 mt-md-0">
          <a
            href={`${API}/${todo.id}/description/${todo.description}`}
            className="btn btn-primary w-100 w-md-auto"
          >
            Update Todo Description
          </a>
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <div className="col-md-2">
          <FormControl
            defaultValue={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            placeholder="ID"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <FormCheck
            id="wd-todo-completed"
            checked={todo.completed}
            type="checkbox"
            label="Completed"
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
        </div>
        <div className="col-md-4 text-md-end mt-2 mt-md-0">
          <a
            className="btn btn-primary w-100 w-md-auto"
            href={`${API}/${todo.id}/completed/${todo.completed}`}
          >
            Update Todo Completed
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}
