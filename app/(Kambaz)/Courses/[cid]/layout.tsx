/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState, useEffect, useCallback } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import * as client from "../client";

import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any | null>(null);
  const [showNav, setShowNav] = useState(true);

  const isStudent = currentUser?.role === "STUDENT";

  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;

    try {
      let data;

      if (isStudent) {
        data = await client.fetchAllCourses();
      } else {
        data = await client.findMyCourses();
      }

      if (Array.isArray(data)) {
        setCourses(data);

        const found = data.find((c: any) => String(c._id) === String(cid));
        setCourse(found || null);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [currentUser, cid, isStudent]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (!course) {
    return <div className="p-3">Loading course...</div>;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          onClick={() => setShowNav(!showNav)}
        />
        <Breadcrumb course={course} />
      </h2>

      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
