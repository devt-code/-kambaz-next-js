/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enroll, unenroll } from "./reducer";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: any) => state.dashboardReducer
  ) || { enrollments: [] };

  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    credits: 3,
    description: "New Description",
  });

  useEffect(() => {
    if (currentUser && db.enrollments) {
      const userEnrollments = db.enrollments.filter(
        (en: any) => en.user === currentUser._id
      );
      userEnrollments.forEach((en: any) =>
        dispatch(enroll({ user: en.user, course: en.course }))
      );
    }
  }, [currentUser, dispatch]);

  if (!currentUser) {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />
        <p>No user details available.</p>
      </div>
    );
  }

  const toggleEnrollment = (courseId: string) => {
    const isEnrolled = enrollments.some(
      (en: { course: string; user: any }) =>
        en.course === courseId && en.user === currentUser._id
    );

    if (isEnrolled) {
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } else {
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
  };

  const handleAddCourse = () => {
    const newCourse = {
      ...course,
      _id: new Date().getTime().toString(),
    };
    dispatch(addNewCourse({ courses, newCourse }));
    dispatch(enroll({ user: currentUser._id, course: newCourse._id }));
  };

  const displayedCourses = showAll
    ? courses
    : courses.filter((course: any) =>
        enrollments.some(
          (en: { course: any; user: any }) =>
            en.course === course._id && en.user === currentUser._id
        )
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {currentUser?.role !== "STUDENT" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses (
        {
          enrollments.filter((en: { user: any }) => en.user === currentUser._id)
            .length
        }
        )
        <Button
          className="float-end"
          variant="primary"
          onClick={() => setShowAll(!showAll)}
        >
          Enrollments
        </Button>
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map(
            (course: { _id: string; name: string; description: string }) => {
              const isEnrolled = enrollments.some(
                (en: { course: string; user: any }) =>
                  en.course === course._id && en.user === currentUser._id
              );

              return (
                <Col
                  key={course._id}
                  className="wd-dashboard-course"
                  style={{ width: "300px" }}
                >
                  <Card>
                    <Link
                      href={
                        isEnrolled
                          ? `/Courses/${course._id}/Home`
                          : "/Dashboard"
                      }
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <CardImg
                        src="/images/reactjs.jpg"
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <CardBody className="card-body">
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}
                        </CardTitle>
                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {course.description}
                        </CardText>

                        <div className="d-flex flex-wrap gap-2 mt-2">
                          <Button variant="primary">Go</Button>

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              toggleEnrollment(course._id);
                            }}
                            className={`btn ${
                              isEnrolled ? "btn-danger" : "btn-success"
                            }`}
                          >
                            {isEnrolled ? "Unenroll" : "Enroll"}
                          </button>

                          {currentUser?.role !== "STUDENT" && (
                            <>
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleDeleteCourse(course._id);
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                              <button
                                id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(course);
                                }}
                                className="btn btn-warning"
                              >
                                Edit
                              </button>
                            </>
                          )}
                        </div>
                      </CardBody>
                    </Link>
                  </Card>
                </Col>
              );
            }
          )}
        </Row>
      </div>
    </div>
  );
}
