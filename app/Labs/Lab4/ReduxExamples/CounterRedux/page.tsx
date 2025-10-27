"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { RootState } from "../../store/store";

export default function CounterRedux() {
  const dispatch = useDispatch();
  const count = useSelector((s: RootState) => s.counterReducer?.count ?? 0);

  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button
        onClick={() => dispatch(increment())}
        id="wd-counter-redux-increment-click"
        className="btn btn-primary me-2"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        id="wd-counter-redux-decrement-click"
        className="btn btn-primary me-2"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
