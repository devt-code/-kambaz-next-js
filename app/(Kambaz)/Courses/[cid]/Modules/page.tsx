/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { ParamValue } from "next/dist/server/request/params";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br /> <br /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: { course: ParamValue }) => module.course === cid)
          .map(
            (module: {
              _id: Key | null | undefined;
              editing: any;
              name: string | number | readonly string[] | undefined;
              lessons: {
                _id: Key | null | undefined;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }[];
            }) => (
              <ListGroupItem
                className="wd-module p-0 mb-5 fs-5 border-gray"
                key={module._id}
              >
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />{" "}
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id as string}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map(
                      (lesson: {
                        _id: Key | null | undefined;
                        name:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | Promise<
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactPortal
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | null
                              | undefined
                            >
                          | null
                          | undefined;
                      }) => (
                        <ListGroupItem
                          className="wd-lesson p-3 ps-1"
                          key={lesson._id}
                        >
                          <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                          <LessonControlButtons />
                        </ListGroupItem>
                      )
                    )}
                  </ListGroup>
                )}
              </ListGroupItem>
            )
          )}
      </ListGroup>
    </div>
  );
}
