/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="container mt-4">
      <h2>Array State Variable</h2>
      <button className="btn btn-success mb-3" onClick={addElement}>
        Add Element
      </button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="fw-semibold">{item}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />

      <hr />
    </div>
  );
}
