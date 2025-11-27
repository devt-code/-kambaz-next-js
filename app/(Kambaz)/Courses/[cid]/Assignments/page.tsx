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
import { setAssignments } from "./reducer";
import { useEffect, useCallback } from "react";

import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments || []
  );

  const fetchAssignments = useCallback(async () => {
    const modules = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(modules));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

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

  const onRemoveAssigment = async (assignmentId: string) => {
    await client.deleteAssignment(cid as string, assignmentId);
    dispatch(
      setAssignments(assignments.filter((a: any) => a._id !== assignmentId))
    );
  };

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isStudent = currentUser?.role === "STUDENT";
  const isOtherUser = currentUser && !isStudent;

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
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="d-flex align-items-center p-3 ps-1 wd-assignment"
            >
              <BsGripVertical className="me-2 fs-3" />
              <AssignmentIcon />
              <div className="flex-grow-1">
                <div>
                  {isOtherUser && (
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-black"
                    >
                      {assignment.title}
                    </Link>
                  )}
                  {isStudent && (
                    <Link
                      href={`/Courses/${cid}/Assignments/`}
                      className="wd-assignment-link text-black"
                    >
                      {assignment.title}
                    </Link>
                  )}
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
                deleteAssignment={(assignmentId) =>
                  onRemoveAssigment(assignmentId)
                }
              />
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
