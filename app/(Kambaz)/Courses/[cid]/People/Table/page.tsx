// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { Table } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import React from "react";
// // import { useParams } from "next/navigation";
// // import * as db from "../../../../Database";
// export default function PeopleTable({
//   users = [],
//   fetchUsers,
// }: {
//   users?: any[];
//   fetchUsers: () => void;
// }) {
//   // const { cid } = useParams();
//   // const { users, enrollments } = db;
//   // console.log("From where needed:" + users);
//   console.log(users);

//   return (
//     <div id="wd-people-table">
//       <Table striped>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Login ID</th>
//             <th>Section</th>
//             <th>Role</th>
//             <th>Last Activity</th>
//             <th>Total Activity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="wd-full-name text-nowrap">
//                 <FaUserCircle className="me-2 fs-1 text-secondary" />
//                 <span className="wd-first-name">{user.firstName}</span>{" "}
//                 <span className="wd-last-name">{user.lastName}</span>
//               </td>
//               <td className="wd-login-id">{user.loginId}</td>
//               <td className="wd-section">{user.section}</td>
//               <td className="wd-role">{user.role}</td>
//               <td className="wd-last-activity">{user.lastActivity}</td>
//               <td className="wd-total-activity">{user.lastActivity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// import * as db from "../../../../Database";

import PeopleDetails from "../Details";
import Link from "next/link";

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: any[];
  fetchUsers: () => void;
}) {
  const { cid } = useParams();

  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const [localUsers, setLocalUsers] = useState<any[]>([]);
  const [localEnrollments, setLocalEnrollments] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  // try to populate local DB data for debug/fallback
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const modUsers = await import("../../../../Database/users.json");
        const modEnroll = await import("../../../../Database/enrollments.json");
        if (!mounted) return;
        const u = (modUsers && (modUsers.default ?? modUsers)) as any[];
        const e = (modEnroll && (modEnroll.default ?? modEnroll)) as any[];
        setLocalUsers(u);
        setLocalEnrollments(e);
      } catch (err) {
        console.error("Error loading local DB in PeopleTable:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // compute filtered users for this course
  useEffect(() => {
    const source = users && users.length > 0 ? users : localUsers;
    const computeList = () => {
      if (!cid) return source;
      return source.filter((u: any) =>
        localEnrollments.some(
          (en: any) => en.user === u._id && en.course === cid
        )
      );
    };
    const list = computeList();

    // update only when the computed list is different to avoid infinite loops
    setFiltered((prev) => {
      if (!prev || prev.length !== list.length) return list;
      for (let i = 0; i < list.length; i++) {
        if (prev[i]?._id !== list[i]?._id) return list;
      }
      return prev; // identical, don't trigger a state update
    });
  }, [users, localUsers, localEnrollments, cid]);

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}

      {/* debug panel removed */}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  onClick={() => {
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
