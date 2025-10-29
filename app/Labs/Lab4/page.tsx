"use client";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";
import HelloRedux from "./ReduxExamples/HelloRedux/page";
import store from "./store/store";
import { Provider } from "react-redux";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import AddRedux from "./ReduxExamples/AddRedux/page";
import TodoList from "./ReduxExamples/todos/TodoList";
import { Container } from "react-bootstrap";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Container>
      <Provider store={store}>
        <div>
          <h2 className="mb-4">Student Details</h2>
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th scope="row" className="w-25">
                  Name:
                </th>
                <td>Deva Sai Sunder Tangella</td>
              </tr>
              <tr>
                <th scope="row">Section:</th>
                <td>05</td>
              </tr>
              <tr>
                <th scope="row">GitHub Repo Link:</th>
                <td>
                  <a
                    href="https://github.com/devt-code/-kambaz-next-js/tree/a4"
                    id="wd-github"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    kambaz-next-js branch a4
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Lab 4</h2>
          Maintaining State in React Applications
          <ClickEvent />
          <PassingDataOnEvent />
          <PassingFunctions theFunction={sayHello} />
          <EventObject />
          <Counter />
          <BooleanStateVariables />
          <StringStateVariables />
          <DateStateVariable />
          <ObjectStateVariable />
          <ArrayStateVariable />
          <ParentStateComponent />
          <ReduxExamples />
          <HelloRedux />
          <CounterRedux />
          <AddRedux />
          <TodoList />
        </div>
      </Provider>
    </Container>
  );
}
