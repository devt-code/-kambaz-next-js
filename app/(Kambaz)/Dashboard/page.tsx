/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import * as db from "../Database";
// import { useDispatch, useSelector } from "react-redux";
// import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
// import { enroll, unenroll } from "./reducer";
// import {
//   Row,
//   Col,
//   Card,
//   CardImg,
//   CardBody,
//   CardTitle,
//   CardText,
//   Button,
//   FormControl,
// } from "react-bootstrap";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const { courses } = useSelector((state: any) => state.coursesReducer);
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = useSelector(
//     (state: any) => state.dashboardReducer
//   ) || { enrollments: [] };

//   const [showAll, setShowAll] = useState(false);
// const [course, setCourse] = useState<any>({
//   _id: "0",
//   name: "New Course",
//   number: "New Number",
//   startDate: "2023-09-10",
//   endDate: "2023-12-15",
//   image: "/images/reactjs.jpg",
//   credits: 3,
//   description: "New Description",
// });

//   useEffect(() => {
//     if (currentUser && db.enrollments) {
//       const userEnrollments = db.enrollments.filter(
//         (en: any) => en.user === currentUser._id
//       );
//       userEnrollments.forEach((en: any) =>
//         dispatch(enroll({ user: en.user, course: en.course }))
//       );
//     }
//   }, [currentUser, dispatch]);

//   if (!currentUser) {
//     return (
//       <div id="wd-dashboard">
//         <h1 id="wd-dashboard-title">Dashboard</h1>
//         <hr />
//         <p>No user details available.</p>
//       </div>
//     );
//   }

//   const toggleEnrollment = (courseId: string) => {
//     const isEnrolled = enrollments.some(
//       (en: { course: string; user: any }) =>
//         en.course === courseId && en.user === currentUser._id
//     );

//     if (isEnrolled) {
//       dispatch(unenroll({ user: currentUser._id, course: courseId }));
//     } else {
//       dispatch(enroll({ user: currentUser._id, course: courseId }));
//     }
//   };

//   const handleDeleteCourse = (courseId: string) => {
//     dispatch(deleteCourse(courseId));
//     dispatch(unenroll({ user: currentUser._id, course: courseId }));
//   };

//   const handleAddCourse = () => {
//     const newCourse = {
//       ...course,
//       _id: new Date().getTime().toString(),
//     };
//     dispatch(addNewCourse({ courses, newCourse }));
//     dispatch(enroll({ user: currentUser._id, course: newCourse._id }));
//   };

//   const displayedCourses = showAll
//     ? courses
//     : courses.filter((course: any) =>
//         enrollments.some(
//           (en: { course: any; user: any }) =>
//             en.course === course._id && en.user === currentUser._id
//         )
//       );

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />

//       {currentUser?.role !== "STUDENT" && (
//         <div>
//           <h5>
//             New Course
//             <button
//               className="btn btn-primary float-end"
//               id="wd-add-new-course-click"
//               onClick={handleAddCourse}
//             >
//               Add
//             </button>
//             <button
//               className="btn btn-warning float-end me-2"
//               onClick={() => dispatch(updateCourse(course))}
//               id="wd-update-course-click"
//             >
//               Update
//             </button>
//           </h5>
//           <br />
//           <FormControl
//             value={course.name}
//             className="mb-2"
//             onChange={(e) => setCourse({ ...course, name: e.target.value })}
//           />
//           <FormControl
//             as="textarea"
//             value={course.description}
//             rows={3}
//             onChange={(e) =>
//               setCourse({ ...course, description: e.target.value })
//             }
//           />
//           <hr />
//         </div>
//       )}

//       <h2 id="wd-dashboard-published">
//         Published Courses (
//         {
//           enrollments.filter((en: { user: any }) => en.user === currentUser._id)
//             .length
//         }
//         )
//         <Button
//           className="float-end"
//           variant="primary"
//           onClick={() => setShowAll(!showAll)}
//         >
//           Enrollments
//         </Button>
//       </h2>
//       <hr />

//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {displayedCourses.map(
//             (course: { _id: string; name: string; description: string }) => {
//               const isEnrolled = enrollments.some(
//                 (en: { course: string; user: any }) =>
//                   en.course === course._id && en.user === currentUser._id
//               );

//               return (
//                 <Col
//                   key={course._id}
//                   className="wd-dashboard-course"
//                   style={{ width: "300px" }}
//                 >
//                   <Card>
//                     <Link
//                       href={
//                         isEnrolled
//                           ? `/Courses/${course._id}/Home`
//                           : "/Dashboard"
//                       }
//                       className="wd-dashboard-course-link text-decoration-none text-dark"
//                     >
//                       <CardImg
//                         src="/images/reactjs.jpg"
//                         variant="top"
//                         width="100%"
//                         height={160}
//                       />
//                       <CardBody className="card-body">
//                         <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                           {course.name}
//                         </CardTitle>
//                         <CardText
//                           className="wd-dashboard-course-description overflow-hidden"
//                           style={{ height: "100px" }}
//                         >
//                           {course.description}
//                         </CardText>

//                         <div className="d-flex flex-wrap gap-2 mt-2">
//                           <Button variant="primary">Go</Button>

//                           <button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               toggleEnrollment(course._id);
//                             }}
//                             className={`btn ${
//                               isEnrolled ? "btn-danger" : "btn-success"
//                             }`}
//                           >
//                             {isEnrolled ? "Unenroll" : "Enroll"}
//                           </button>

//                           {currentUser?.role !== "STUDENT" && (
//                             <>
//                               <button
//                                 onClick={(event) => {
//                                   event.preventDefault();
//                                   handleDeleteCourse(course._id);
//                                 }}
//                                 className="btn btn-danger"
//                               >
//                                 Delete
//                               </button>
//                               <button
//                                 id="wd-edit-course-click"
//                                 onClick={(event) => {
//                                   event.preventDefault();
//                                   setCourse(course);
//                                 }}
//                                 className="btn btn-warning"
//                               >
//                                 Edit
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </CardBody>
//                     </Link>
//                   </Card>
//                 </Col>
//               );
//             }
//           )}
//         </Row>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Row,
//   Col,
//   Card,
//   CardImg,
//   CardBody,
//   CardTitle,
//   CardText,
//   Button,
//   FormControl,
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import * as client from "../Courses/client";
// import { setCourses } from "../Courses/reducer";
// import { enroll, unenroll, setEnrollments } from "./reducer";

// export default function Dashboard() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
//   const { courses } = useSelector((state: any) => state.coursesReducer);
//   const dispatch = useDispatch();

//   console.log(enrollments);

//   const [showAll, setShowAll] = useState(false);
//   const [course, setCourse] = useState<any>({
//     _id: "0",
//     name: "New Course",
//     number: "New Number",
//     startDate: "2023-09-10",
//     endDate: "2023-12-15",
//     image: "/images/reactjs.jpg",
//     credits: 3,
//     description: "New Description",
//   });

//   // Fetch courses
//   const fetchCourses = async () => {
//     try {
//       const data = await client.findMyCourses();
//       dispatch(setCourses(data));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch enrollments from server
//   const fetchEnrollments = async () => {
//     if (!currentUser?._id) return;
//     try {
//       const data = await client.findMyEnrollments(currentUser._id); // API returns array of { user, course }
//       dispatch(setEnrollments(data));
//     } catch (err) {
//       console.error("Failed to fetch enrollments:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchEnrollments();
//   }, [currentUser]);

//   // Add course
//   const onAddNewCourse = async () => {
//     const newCourse = await client.createCourse(course);
//     dispatch(setCourses([...courses, newCourse]));
//   };

//   // Delete course
//   const onDeleteCourse = async (courseId: string) => {
//     await client.deleteCourse(courseId);
//     dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
//   };

//   // Update course
//   const onUpdateCourse = async () => {
//     await client.updateCourse(course);
//     dispatch(
//       setCourses(courses.map((c: any) => (c._id === course._id ? course : c)))
//     );
//   };

//   // Toggle enrollment
//   const toggleEnrollment = async (courseId: string) => {
//     try {
//       const isEnrolled = enrollments.some(
//         (e: any) => e.user === currentUser._id && e.course === courseId
//       );

//       if (isEnrolled) {
//         await client.unenroll(courseId, currentUser._id);
//         dispatch(unenroll({ user: currentUser._id, course: courseId }));
//       } else {
//         await client.enroll(courseId, currentUser._id);
//         dispatch(enroll({ user: currentUser._id, course: courseId }));
//       }
//     } catch (err) {
//       console.error("Error toggling enrollment:", err);
//     }
//   };

//   // Toggle between all courses / my courses
//   const onToggleEnrollments = async () => {
//     if (showAll) {
//       const myCourses = await client.findMyCourses();
//       dispatch(setCourses(myCourses));
//     } else {
//       const allCourses = await client.fetchAllCourses();
//       dispatch(setCourses(allCourses));
//     }
//     setShowAll(!showAll);
//   };

//   if (!currentUser) {
//     return (
//       <div id="wd-dashboard">
//         <h1 id="wd-dashboard-title">Dashboard</h1>
//         <hr />
//         <p>No user details available.</p>
//       </div>
//     );
//   }

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />
//       {currentUser?.role !== "STUDENT" && (
//         <h5>
//           New Course
//           <button
//             className="btn btn-primary float-end"
//             onClick={onAddNewCourse}
//           >
//             Add
//           </button>
//           <button
//             className="btn btn-warning float-end me-2"
//             onClick={onUpdateCourse}
//           >
//             Update
//           </button>
//           <br />
//           <FormControl
//             value={course.name}
//             className="mb-2"
//             onChange={(e) => setCourse({ ...course, name: e.target.value })}
//           />
//           <FormControl
//             as="textarea"
//             value={course.description}
//             rows={3}
//             onChange={(e) =>
//               setCourse({ ...course, description: e.target.value })
//             }
//           />
//         </h5>
//       )}
//       <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//         <Button
//           className="float-end"
//           variant="primary"
//           onClick={onToggleEnrollments}
//         >
//           Enrollments
//         </Button>
//       </h2>
//       <hr />
//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {courses.map((course: any) => {
//             const isEnrolled = enrollments.some(
//               (e: any) => e.user === currentUser._id && e.course === course._id
//             );

//             return (
//               <Col
//                 key={course._id}
//                 className="wd-dashboard-course"
//                 style={{ width: "300px" }}
//               >
//                 <Card>
//                   <Link
//                     href={`/Courses/${course._id}/Home`}
//                     className="wd-dashboard-course-link text-decoration-none text-dark"
//                   >
//                     <CardImg
//                       src="/images/reactjs.jpg"
//                       variant="top"
//                       width="100%"
//                       height={160}
//                     />
//                     <CardBody className="card-body">
//                       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                         {course.name}
//                       </CardTitle>
//                       <CardText
//                         className="wd-dashboard-course-description overflow-hidden"
//                         style={{ height: "100px" }}
//                       >
//                         {course.description}
//                       </CardText>
//                       <div className="d-flex flex-wrap gap-2 mt-2">
//                         <Button variant="primary">Go</Button>

//                         {/* Enrollment button */}
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             toggleEnrollment(course._id);
//                           }}
//                           className={`btn ${
//                             isEnrolled ? "btn-danger" : "btn-success"
//                           }`}
//                         >
//                           {isEnrolled ? "Unenroll" : "Enroll"}
//                         </button>

//                         {currentUser?.role !== "STUDENT" && (
//                           <>
//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 onDeleteCourse(course._id);
//                               }}
//                               className="btn btn-danger float-end"
//                             >
//                               Delete
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 setCourse(course);
//                               }}
//                               className="btn btn-warning float-end me-2"
//                             >
//                               Edit
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </CardBody>
//                   </Link>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </div>
//     </div>
//   );
// }

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

  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data =
        currentUser.role === "FACULTY"
          ? await client.findMyCourses()
          : await client.fetchAllCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, [currentUser]);

  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data = await client.findEnrollmentsForUser(currentUser._id);
      setEnrollments(data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
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
      const updatedCourse = await client.updateCourse(course);
      setCourses(
        courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
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

  const filteredCourses =
    currentUser.role === "FACULTY"
      ? courses.filter(
          (c) =>
            c.createdBy === currentUser._id ||
            enrollments.some((e) => e.course === c._id)
        )
      : showAll
      ? courses
      : courses.filter((c) => enrollments.some((e) => e.course === c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        Dashboard
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "My Courses" : "Enrollments"}
          </button>
        )}
      </h1>
      <hr />
      <h2>Published Courses ({filteredCourses.length})</h2>
      <hr />

      {currentUser.role === "FACULTY" && (
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
          const isEnrolled = enrollments.some((e) => e.course === c._id);

          return (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
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

                    {(isEnrolled || currentUser.role === "FACULTY") && (
                      <Button variant="primary">Go</Button>
                    )}

                    {currentUser.role === "FACULTY" && (
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

                    {currentUser.role !== "FACULTY" && showAll && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          isEnrolled ? onUnenroll(c._id) : onEnroll(c._id);
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
