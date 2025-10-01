"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import Calendar from "@/app/(Kambaz)/Calendar/page";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import "./DateInput.css";

export default function AssignmentEditor() {
  return (
    <div className="container text-left" style={{ maxWidth: "90%" }}>
      <Form className="p-3" id="wd-assignments-editor">
        <FormGroup className="mb-3">
          <FormLabel>Assignment Name</FormLabel>
          <Form.Control defaultValue="A1" />
        </FormGroup>
        <Form.Group className="mb-3">
          <div>
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
                  The Kambaz application should include a link to navigate back
                  to the landing page.
                </p>
              </Card.Body>
            </Card>
          </div>
        </Form.Group>
        <FormGroup as={Row} className="mb-3 text-end">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <Form.Control defaultValue={100} />
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
                    defaultValue="2024-05-13T23:59"
                    className="no-native-icon"
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
                        defaultValue="2024-05-06T00:00"
                        className="no-native-icon"
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
                        defaultValue=""
                        className="no-native-icon"
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
