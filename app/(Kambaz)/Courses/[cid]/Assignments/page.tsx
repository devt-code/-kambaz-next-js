"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

import Link from "next/link";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import AssignmentIcon from "./AssignmentIcon";

import "../../../styles.css";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

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

  return (
    <div id="wd-assignments">
      <ModulesControls />
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
            <ModuleControlButtons />
          </div>
        </ListGroupItem>

        {assignments
          .filter((assignment) => assignment.course === cid)
          .map((assignment) => (
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
              <LessonControlButtons />
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
