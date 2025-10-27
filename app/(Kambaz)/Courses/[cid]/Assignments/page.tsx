/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";

import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

import AssignmentListControlButtons from "./AssignmentListControlButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentIcon from "./AssignmentIcon";

import "../../../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { ParamValue } from "next/dist/server/request/params";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments || []
  );

  const formatDate = (isoString: string | number | Date) => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    return date
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " at");
  };

  const dispatch = useDispatch();

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-module p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-3" />
              <span>ASSIGNMENTS</span>
            </div>
            <AssignmentsControlButtons />
          </div>
        </ListGroupItem>

        {assignments
          .filter(
            (assignment: { course: ParamValue }) => assignment.course === cid
          )
          .map(
            (assignment: {
              _id: Key | null | undefined;
              title:
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
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              fromDate: string | number | Date;
              dueDate: string | number | Date;
              points:
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
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <ListGroupItem
                key={assignment._id}
                className="d-flex align-items-center p-3 ps-1 wd-assignment"
              >
                <BsGripVertical className="me-2 fs-3" />
                <AssignmentIcon />
                <div className="flex-grow-1">
                  <div>
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-black"
                    >
                      {assignment.title}
                    </Link>
                  </div>
                  <div className="small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <span>Not available until</span>{" "}
                    {formatDate(assignment.fromDate)}
                  </div>
                  <div className="small">
                    <span>Due</span> {formatDate(assignment.dueDate)} |{" "}
                    {assignment.points} pts
                  </div>
                </div>
                <AssignmentListControlButtons
                  assignmentId={String(assignment._id)}
                  deleteAssignment={(assignmentId) => {
                    dispatch(deleteAssignment(assignmentId));
                  }}
                />
              </ListGroupItem>
            )
          )}
      </ListGroup>
    </div>
  );
}
