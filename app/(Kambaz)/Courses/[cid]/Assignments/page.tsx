import Link from "next/link";

import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentIcon from "./AssignmentIcon";
import "../../../styles.css";

export default function Assignments() {
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
        <ListGroupItem className="d-flex align-items-center p-3 ps-1 wd-assignemnt">
          <BsGripVertical className="me-2 fs-3" />
          <AssignmentIcon />
          <div className="flex-grow-1">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-black"
              >
                A1
              </Link>
            </div>
            <div className="small">
              <span className="text-danger">Multiple Modules</span> |{" "}
              <span>Not available until</span> May 20 at 12:00am
            </div>
            <div className="small">
              <span>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="d-flex align-items-center p-3 ps-1 wd-assignemnt">
          <BsGripVertical className="me-2 fs-3" />
          <AssignmentIcon />
          <div className="flex-grow-1">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-black"
              >
                A2
              </Link>
            </div>
            <div className="small">
              <span className="text-danger">Multiple Modules</span> |{" "}
              <span>Not available until</span> May 20 at 12:00am
            </div>
            <div className="small">
              <span>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="d-flex align-items-center p-3 ps-1 wd-assignemnt">
          <BsGripVertical className="me-2 fs-3" />
          <AssignmentIcon />
          <div className="flex-grow-1">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-black"
              >
                A3
              </Link>
            </div>
            <div className="small">
              <span className="text-danger">Multiple Modules</span> |{" "}
              <span>Not available until</span> May 20 at 12:00am
            </div>
            <div className="small">
              <span>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="d-flex align-items-center p-3 ps-1 wd-assignemnt">
          <BsGripVertical className="me-2 fs-3" />
          <AssignmentIcon />
          <div className="flex-grow-1">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-black"
              >
                A4
              </Link>
            </div>
            <div className="small">
              <span className="text-danger">Multiple Modules</span> |{" "}
              <span>Not available until</span> May 20 at 12:00am
            </div>
            <div className="small">
              <span>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="d-flex align-items-center p-3 ps-1 wd-assignemnt">
          <BsGripVertical className="me-2 fs-3" />
          <AssignmentIcon />
          <div className="flex-grow-1">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-black"
              >
                A5
              </Link>
            </div>
            <div className="small">
              <span className="text-danger">Multiple Modules</span> |{" "}
              <span>Not available until</span> May 20 at 12:00am
            </div>
            <div className="small">
              <span>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="d-flex align-items-center p-3 ps-1 wd-assignemnt">
          <BsGripVertical className="me-2 fs-3" />
          <AssignmentIcon />
          <div className="flex-grow-1">
            <div>
              <Link
                href="/Courses/1234/Assignments/123"
                className="wd-assignment-link text-black"
              >
                A6
              </Link>
            </div>
            <div className="small">
              <span className="text-danger">Multiple Modules</span> |{" "}
              <span>Not available until</span> May 20 at 12:00am
            </div>
            <div className="small">
              <span>Due</span> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
