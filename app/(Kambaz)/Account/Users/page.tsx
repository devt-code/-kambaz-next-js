/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  const [role, setRole] = useState("");
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  const filterUsersByName = async (name: string) => {
    if (name) {
      try {
        const users = await client.findUsersByPartialName(name);
        setUsers(users);
      } catch (e) {
        console.error(
          "findUsersByPartialName failed, falling back to local DB",
          e
        );
        try {
          const mod = await import("../../Database/users.json");
          const localUsers = (mod && (mod.default ?? mod)) as any[];
          const filtered = localUsers.filter(
            (u: any) =>
              u.firstName.toLowerCase().includes(name.toLowerCase()) ||
              u.lastName.toLowerCase().includes(name.toLowerCase())
          );
          setUsers(filtered);
        } catch (e2) {
          console.error("Failed loading local users.json", e2);
          setUsers([]);
        }
      }
    } else {
      fetchUsers();
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      try {
        const users = await client.findUsersByRole(role);
        setUsers(users);
      } catch (e) {
        console.error("findUsersByRole failed, falling back to local DB", e);
        try {
          const mod = await import("../../Database/users.json");
          const localUsers = (mod && (mod.default ?? mod)) as any[];
          const filtered = localUsers.filter((u: any) => u.role === role);
          setUsers(filtered);
        } catch (e2) {
          console.error("Failed loading local users.json", e2);
          setUsers([]);
        }
      }
    } else {
      fetchUsers();
    }
  };

  const { uid } = useParams();
  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setUsers(users);
    } catch (e) {
      console.error("findAllUsers failed, falling back to local DB", e);
      try {
        const mod = await import("../../Database/users.json");
        const localUsers = (mod && (mod.default ?? mod)) as any[];
        setUsers(localUsers);
      } catch (e2) {
        console.error("Failed loading local users.json", e2);
        setUsers([]);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  return (
    <div>
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>
      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>{" "}
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>{" "}
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
