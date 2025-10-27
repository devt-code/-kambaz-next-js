"use client";
import { useSelector, useDispatch, Provider } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { Button, FormControl } from "react-bootstrap";
import { RootState } from "../../store/store";
import store from "../../store/store";

export default function AddRedux() {
  return (
    <Provider store={store}>
      <AddReduxInner />
    </Provider>
  );
}

function AddReduxInner() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);

  // Use optional chaining to avoid undefined during server render
  const sum = useSelector((state: RootState) => state.addReducer?.sum ?? 0);

  const dispatch = useDispatch();

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>
        {a} + {b} = {sum}
      </h2>
      <FormControl
        type="number"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
      />
      <FormControl
        type="number"
        value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
      />
      <Button onClick={() => dispatch(add({ a, b }))}>Add Redux</Button>
      <hr />
    </div>
  );
}
