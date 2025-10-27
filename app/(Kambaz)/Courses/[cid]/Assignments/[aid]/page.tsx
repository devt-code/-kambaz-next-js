/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { redirect, useParams } from "next/navigation";

import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import "./DateInput.css";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );

  const assignment = assignments.find((a: any) => a._id === aid);

  const [title, setTitle] = useState(assignment?.title || "");
  const [points, setPoints] = useState(assignment?.points || 0);
  const [fromDate, setFromDate] = useState(
    assignment?.fromDate || new Date().toISOString().slice(0, 16)
  );
  const [dueDate, setDueDate] = useState(
    assignment?.dueDate || new Date().toISOString().slice(0, 16)
  );
  const [until, setUntil] = useState(
    assignment?.until || new Date().toISOString().slice(0, 16)
  );

  const handleSave = () => {
    const newAssignment = {
      _id: assignment?._id || "",
      title,
      course: cid,
      points,
      fromDate,
      dueDate,
      until,
    };

    if (assignment) {
      dispatch(updateAssignment(newAssignment));
    } else {
      dispatch(addAssignment(newAssignment));
    }

    redirect(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container text-left" style={{ maxWidth: "90%" }}>
      <Form className="p-3" id="wd-assignments-editor">
        <FormGroup className="mb-3">
          <FormLabel>Assignment Name</FormLabel>
          <Form.Control
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <Form.Group className="mb-3">
          <Card className="border-grey">
            <Card.Body contentEditable="true">
              <p>
                The assignment is{" "}
                <span className="text-danger">available online</span>
              </p>
              <p>
                Submit a link to the landing page of your Web application
                running on Netlify.
              </p>
              <p>The landing page should include the following:</p>
              <ul>
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>Link to the Kambaz application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p>
                The Kambaz application should include a link to navigate back to
                the landing page.
              </p>
            </Card.Body>
          </Card>
        </Form.Group>

        <FormGroup as={Row} className="mb-3 text-end">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <Form.Control
              defaultValue={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3 text-end">
          <FormLabel column sm={2}>
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <Form.Select>
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3 text-end">
          <FormLabel column sm={2}>
            Display Grade as
          </FormLabel>
          <Col sm={10}>
            <Form.Select>
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Submission Type
          </FormLabel>
          <Col sm={10}>
            <div className="border p-3 rounded">
              <Form.Select className="mb-3">
                <option>Online</option>
                <option>Offline</option>
              </Form.Select>
              <strong>Online Entry Options</strong>
              <Form.Check type="checkbox" label="Text Entry" />
              <Form.Check type="checkbox" label="Website URL" defaultChecked />
              <Form.Check type="checkbox" label="Media Recordings" />
              <Form.Check type="checkbox" label="Student Annotation" />
              <Form.Check type="checkbox" label="File Uploads" />
            </div>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Assign
          </FormLabel>
          <Col sm={10}>
            <div className="border rounded p-3">
              <FormGroup className="mb-3">
                <FormLabel>
                  <strong>Assign to</strong>
                </FormLabel>
                <div className="border rounded px-2 py-1 d-flex align-items-center">
                  <span className="bg-light px-2 py-1 rounded d-flex align-items-center">
                    Everyone
                    <AiOutlineClose
                      size={14}
                      className="ms-2 text-muted"
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </div>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>
                  <strong>Due</strong>
                </FormLabel>
                <InputGroup>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={dueDate}
                    className="no-native-icon"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <InputGroup.Text>
                    <AiOutlineCalendar size={16} />
                  </InputGroup.Text>
                </InputGroup>
              </FormGroup>

              <Row>
                <Col sm={6}>
                  <FormGroup className="mb-3">
                    <FormLabel>
                      <strong>Available from</strong>
                    </FormLabel>
                    <InputGroup>
                      <Form.Control
                        type="datetime-local"
                        defaultValue={fromDate}
                        className="no-native-icon"
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <InputGroup.Text>
                        <AiOutlineCalendar size={16} />
                      </InputGroup.Text>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup className="mb-3">
                    <FormLabel>
                      <strong>Until</strong>
                    </FormLabel>
                    <InputGroup>
                      <Form.Control
                        type="datetime-local"
                        defaultValue={until}
                        className="no-native-icon"
                        onChange={(e) => setUntil(e.target.value)}
                      />
                      <InputGroup.Text>
                        <AiOutlineCalendar size={16} />
                      </InputGroup.Text>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Col>
        </FormGroup>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
