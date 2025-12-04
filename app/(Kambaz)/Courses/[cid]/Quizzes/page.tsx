"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Button,
  Card,
  Dropdown,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";

import * as api from "./client";
import { availabilityLabel, formatDateTime, sumPoints } from "./types";
import type { Question, Quiz, User } from "./types";
import * as userClient from "../../../Account/client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaBan } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoRocketOutline } from "react-icons/io5";

type Attempt = { score: number } | null;

export default function QuizList() {
  const router = useRouter();
  const params = useParams();

  const cid = params.cid as string;

  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Quiz[]>([]);
  const [qMeta, setQMeta] = useState<
    Record<string, { points: number; count: number }>
  >({});
  const [lastByQuiz, setLastByQuiz] = useState<Record<string, Attempt>>({});
  const [sortKey, setSortKey] = useState<"title" | "due" | "availableFrom">(
    "title"
  );

  useEffect(() => {
    (async () => {
      try {
        const profile = await userClient.profile();
        setMe(profile);
      } catch {}

      if (!cid) return;

      try {
        const res = await api.listQuizzes(cid);
        setList(res);

        const entries = await Promise.all(
          res.map(async (q) => {
            const qs: Question[] = await api.listQuestions(q._id);
            return [
              q._id,
              { points: sumPoints(qs), count: qs.length },
            ] as const;
          })
        );
        setQMeta(Object.fromEntries(entries));

        const attempts = await Promise.all(
          res.map((q) => api.getLastAttempt(q._id).catch(() => null))
        );
        const map: Record<string, Attempt> = {};
        res.forEach((q, i) => (map[q._id] = attempts[i]));
        setLastByQuiz(map);
      } finally {
        setLoading(false);
      }
    })();
  }, [cid]);

  const isFaculty = me?.role === "FACULTY";
  const isStudent = me?.role === "STUDENT";

  const sorted = useMemo(() => {
    let copy;
    if (isStudent) {
      copy = list.filter((q) => q.published);
    } else {
      copy = [...list];
    }
    copy.sort((a, b) => {
      if (sortKey === "title") return a.title.localeCompare(b.title);
      const da = a[sortKey] ? new Date(a[sortKey] as any).getTime() : 0;
      const db = b[sortKey] ? new Date(b[sortKey] as any).getTime() : 0;
      return da - db;
    });
    return copy;
  }, [list, sortKey]);

  async function onAdd() {
    const created = await api.createQuiz(cid, { title: "New Quiz" });
    router.push(`/Courses/${cid}/Quizzes/${created._id}/edit`);
  }

  async function togglePublish(q: Quiz) {
    const saved = q.published
      ? await api.unpublishQuiz(q._id)
      : await api.publishQuiz(q._id);

    setList((prev) => prev.map((x) => (x._id === q._id ? saved : x)));
  }

  async function onDelete(q: Quiz) {
    if (!window.confirm(`Delete quiz “${q.title}”?`)) return;
    await api.deleteQuiz(q._id);
    setList((prev) => prev.filter((x) => x._id !== q._id));
  }

  if (loading) return <Spinner animation="border" className="m-3" />;

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quizzes</h3>
        <div className="d-flex gap-2">
          <Form.Select
            size="sm"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            style={{ width: 220 }}
          >
            <option value="title">Sort by: Name</option>
            <option value="due">Sort by: Due date</option>
            <option value="availableFrom">Sort by: Available from</option>
          </Form.Select>

          {isFaculty && (
            <Button onClick={onAdd} variant="success">
              + Quiz
            </Button>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <Card className="p-4 text-center text-muted">
          No quizzes yet. {isFaculty ? "Click + Quiz to add one." : ""}
        </Card>
      ) : (
        <ListGroup>
          <ListGroupItem className="wd-module p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoMdArrowDropdown className="me-2 fs-3" />
                <span>QUIZZES</span>
              </div>
            </div>
          </ListGroupItem>
          {sorted.map((q) => {
            const meta = qMeta[q._id];
            const availability = availabilityLabel(q);

            const details = [
              `Availability: ${availability}`,
              q.due ? `Due: ${formatDateTime(q.due)}` : null,
              meta ? `Points: ${meta.points}` : null,
              meta ? `Questions: ${meta.count}` : null,
              me?.role === "STUDENT"
                ? `Score: ${lastByQuiz[q._id]?.score ?? "—"}`
                : null,
            ]
              .filter(Boolean)
              .join(" | ");

            return (
              <ListGroup.Item
                key={q._id}
                className="d-flex justify-content-between align-items-start"
                style={{ borderLeft: "4px solid var(--bs-success)" }}
              >
                <div className="d-flex align-items-start">
                  <IoRocketOutline
                    style={{
                      width: 28,
                      height: 28,
                      color: "var(--bs-success)",
                      alignContent: "center",
                      marginTop: 5,
                      marginRight: 10,
                    }}
                  />

                  <div>
                    <a
                      style={{ cursor: "pointer" }}
                      className="fw-semibold link-body-emphasis"
                      onClick={() =>
                        router.push(`/Courses/${cid}/Quizzes/${q._id}`)
                      }
                    >
                      {q.title}
                    </a>
                    <div className="text-muted small mt-1">{details}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  {isFaculty && (
                    <>
                      {q.published ? (
                        <GreenCheckmark />
                      ) : (
                        <FaBan
                          className="position-relative me-2"
                          style={{ bottom: "1px", color: "var(--bs-danger)" }}
                        />
                      )}
                    </>
                  )}

                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      size="sm"
                      className="border-0"
                    >
                      <IoEllipsisVertical className="fs-4" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          router.push(`/Courses/${cid}/Quizzes/${q._id}`)
                        }
                      >
                        Open
                      </Dropdown.Item>

                      {isFaculty && (
                        <Dropdown.Item
                          onClick={() =>
                            router.push(`/Courses/${cid}/Quizzes/${q._id}/edit`)
                          }
                        >
                          Edit
                        </Dropdown.Item>
                      )}

                      {isFaculty && (
                        <Dropdown.Item onClick={() => togglePublish(q)}>
                          {q.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      )}

                      {isFaculty && <Dropdown.Divider />}

                      {isFaculty && (
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => onDelete(q)}
                        >
                          Delete
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}
