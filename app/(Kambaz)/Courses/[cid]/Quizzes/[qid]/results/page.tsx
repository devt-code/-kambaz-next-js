"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import * as api from "../../client";
import type { Attempt, Question, Quiz } from "../../types";
import GreenCheckmark from "../../GreenCheckmark";
import RedXMark from "../../RedXMark";

export default function QuizResults() {
  const router = useRouter();
  const params = useParams();
  const qid = params.qid as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!qid) return;

      try {
        setLoading(true);
        const [q, qs, lastAttempt] = await Promise.all([
          api.getQuiz(qid),
          api.listQuestions(qid),
          api.getLastAttempt(qid),
        ]);

        setQuiz(q);
        setQuestions(qs);
        setAttempt(lastAttempt);

        if (!lastAttempt) {
          setError("No attempt found. Please take the quiz first.");
        }
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    })();
  }, [qid]);

  const total = useMemo(
    () => questions.reduce((acc, q) => acc + (q.points || 0), 0),
    [questions]
  );

  if (loading) {
    return (
      <div className="container mt-3">
        <Spinner animation="border" className="m-3" />
      </div>
    );
  }

  if (error || !quiz || !attempt) {
    return (
      <div className="container mt-3">
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="secondary" onClick={() => router.push(`../${qid}`)}>
          Back to Details
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h3>{quiz.title} — Results</h3>
      <Alert variant="success">
        Score: <strong>{attempt.score}</strong> / {total}
      </Alert>

      {attempt.answers.map((ans, i) => {
        const q = questions.find((qq) => qq._id === ans.question) as Question;

        return (
          <Card
            key={ans.question}
            className="mb-3"
            style={{
              borderLeft: `6px solid ${
                ans.isCorrect ? "var(--bs-success)" : "var(--bs-danger)"
              }`,
            }}
          >
            <div className="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <strong>Q{i + 1}.</strong> {q?.title}
              </div>
              <div className="text-muted small">{q?.points} pts</div>
            </div>

            <div
              className="p-3 border-bottom"
              dangerouslySetInnerHTML={{ __html: q?.questionHtml || "" }}
            />

            <div className="p-3">
              {ans.isCorrect ? (
                <div className="align-items-center">
                  <GreenCheckmark />
                  <span>Correct</span>
                </div>
              ) : (
                <div>
                  <div className="align-items-center mb-2">
                    <RedXMark />
                    <span>Incorrect</span>
                  </div>
                  {q && (
                    <div className="mt-2">
                      <strong>Correct Answer:</strong>{" "}
                      {q.type === "MCQ" && q.choices ? (
                        <span>
                          {q.choices.find((c) => c.correct)?.text || "N/A"}
                        </span>
                      ) : q.type === "TRUE_FALSE" ? (
                        <span>{q.correctBoolean ? "True" : "False"}</span>
                      ) : q.type === "FILL_BLANK" && q.acceptableAnswers ? (
                        <span>
                          {q.acceptableAnswers.length > 0
                            ? q.acceptableAnswers.join(", ")
                            : "N/A"}
                        </span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        );
      })}

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={() => router.push(`../${qid}`)}>
          Back to Details
        </Button>
      </div>
    </div>
  );
}

