"use client";
import * as client from "../Courses/client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
  createdBy?: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface RootState {
  accountReducer: {
    currentUser: { _id: string; role: string } | null;
  };
}

export default function Dashboard() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [showAll, setShowAll] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/Mac.jpg",
    description: "New Description",
  });

  const isStudent = currentUser?.role === "STUDENT";
  const isFaculty = currentUser?.role === "FACULTY";
  const isOtherUser = currentUser && !isStudent;

  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;
    try {
      let data;
      if (isStudent) {
        data = await client.fetchAllCourses();
      } else {
        data = await client.findMyCourses();
      }
      console.log("Fetched courses:", data);
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, [currentUser, isStudent]);

  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) return;
    try {
      console.log("Fetching enrollments for user:", currentUser._id);
      const data = await client.findEnrollmentsForUser(currentUser._id);
      console.log("Fetched enrollments now:", data);

      if (Array.isArray(data)) {
        const normalized: Enrollment[] = data
          .map((item: unknown) => {
            const itemObj = item as Record<string, unknown>;
            if (
              itemObj &&
              Object.prototype.hasOwnProperty.call(itemObj, "course")
            ) {
              const courseValue = itemObj.course;
              const courseId =
                courseValue && typeof courseValue === "object"
                  ? (courseValue as Record<string, unknown>)._id
                  : courseValue;
              return {
                _id: (itemObj._id as string) || "unknown",
                user: (itemObj.user as string) ?? currentUser._id,
                course: (courseId as string) || "",
              };
            }
            if (itemObj && itemObj._id) {
              return {
                _id: (itemObj._id as string) || "unknown",
                user: currentUser._id,
                course: (itemObj._id as string) || "",
              };
            }
            return null;
          })
          .filter((e): e is Enrollment => e !== null);
        setEnrollments(normalized);
      } else {
        setEnrollments([]);
      }
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      setEnrollments([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser, fetchCourses, fetchEnrollments]);

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse({
        ...course,
        createdBy: currentUser?._id,
      });
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      await fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      await fetchCourses();
      await fetchEnrollments();
    }
  };

  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.enrollUserInCourse(currentUser._id, courseId);
      await fetchEnrollments();
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.unenrollUserFromCourse(currentUser._id, courseId);
      await fetchEnrollments();
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <h2>You must be signed in to view your dashboard.</h2>
        <Button
          variant="primary"
          size="lg"
          className="mt-3"
          onClick={() => router.push("/Account/Signin")}
        >
          Sign In
        </Button>
      </div>
    );
  }

  console.log("Current User:", currentUser);
  console.log("All enrollments:", enrollments);
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];
  console.log("Current Enrollments:", safeEnrollments);

  let filteredCourses: Course[];
  if (isStudent) {
    if (showAll) {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter((c) =>
        safeEnrollments.some((e) => e.course === c._id)
      );
    }
  } else {
    filteredCourses = courses;
  }

  console.log("Rendering Dashboard with courses:", filteredCourses);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        Dashboard
        {isStudent && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "My Courses" : "All Courses"}
          </button>
        )}
      </h1>
      <hr />

      <h2>Published Courses ({filteredCourses.length})</h2>
      <hr />

      {isOtherUser && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end me-2"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />

          <FormControl
            id="name"
            value={course.name}
            className="mb-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCourse({ ...course, name: e.target.value })
            }
          />

          <FormControl
            as="textarea"
            id="description"
            value={course.description}
            rows={3}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <Row xs={1} md={5} className="g-4">
        {filteredCourses.map((c) => {
          const isEnrolled = safeEnrollments.some((e) => e.course === c._id);

          return (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                {isEnrolled}
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />

                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>

                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>

                    <Button variant="primary">Go</Button>

                    {isOtherUser && (
                      <>
                        <button
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                          className="btn btn-danger float-end me-2"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {isStudent && showAll && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (isEnrolled) {
                            onUnenroll(c._id);
                          } else {
                            onEnroll(c._id);
                          }
                        }}
                        className={`btn float-end ${
                          isEnrolled ? "btn-danger" : "btn-success"
                        } me-2`}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
