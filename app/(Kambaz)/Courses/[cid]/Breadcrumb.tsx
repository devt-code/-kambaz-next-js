"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lastSegment = segments.pop() || "";
  const secondLastSegment = segments[segments.length - 1];

  
  const displaySegment =
    secondLastSegment === "Assignments" || secondLastSegment === "Quizzes"
      ? secondLastSegment
      : lastSegment;

  return (
    <span>
      {course?.name} &gt; {displaySegment}
    </span>
  );
}
