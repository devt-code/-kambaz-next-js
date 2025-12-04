"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Alert, Button, Card } from "react-bootstrap";
import * as api from "../../client";
import type {
  AttemptAnswerPayload,
  Question,
  Quiz,
} from "../../types";
import { MdOutlineTimer } from "react-icons/md";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizTake() {
  const router = useRouter();
  const params = useParams();
  const qid = params.qid as string;
  const cid = params.cid as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<
    Record<string, string | number | boolean>
  >({});
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState(0);
  const [access, setAccess] = useState<string>("");
  const [remainingSec, setRemainingSec] = useState<number | null>(null);

  const [choiceOrderMap, setChoiceOrderMap] = useState<
    Record<string, number[]>
  >({});

  useEffect(() => {
    (async () => {
      if (!qid) return;

      const q = await api.getQuiz(qid);
      const qsRaw = await api.listQuestions(qid);

      const qs = q.shuffleAnswers ? shuffle(qsRaw) : qsRaw;

      const map: Record<string, number[]> = {};
      if (q.shuffleAnswers) {
        qs.forEach((qq) => {
          if (
            qq.type === "MCQ" &&
            Array.isArray(qq.choices) &&
            qq.choices.length > 1
          ) {
            const originalIdx = qq.choices.map((_, i) => i);
            map[qq._id] = shuffle(originalIdx);
          }
        });
      }

      setQuiz(q);
      setQuestions(qs);
      setChoiceOrderMap(map);
    })();
  }, [qid]);

  const requiresCode = !!quiz?.accessCode && quiz.accessCode.trim().length > 0;
  const unlocked =
    !requiresCode || (quiz && access.trim() === quiz.accessCode.trim());

  useEffect(() => {
    if (!quiz) return;
    if (
      unlocked &&
      remainingSec == null &&
      quiz.timeLimitMinutes &&
      quiz.timeLimitMinutes > 0
    ) {
      setRemainingSec(quiz.timeLimitMinutes * 60);
    }
  }, [quiz, unlocked, remainingSec]);

  const onSubmit = useCallback(async () => {
    if (!qid) return;

    if (quiz?.accessCode && access.trim() !== quiz.accessCode.trim()) {
      setError("Access code is incorrect");
      return;
    }

    const payload: AttemptAnswerPayload[] = Object.entries(answers).map(
      ([questionId, value]) => ({ questionId, value })
    );

    try {
      await api.submitAttempt(qid, payload);
      setError(null);
      router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Submit failed");
    }
  }, [qid, cid, quiz?.accessCode, access, answers, router]);

  useEffect(() => {
    if (remainingSec == null) return;
    if (remainingSec <= 0) {
      onSubmit();
      return;
    }
    const id = setInterval(
      () => setRemainingSec((s) => (s == null ? s : s - 1)),
      1000
    );
    return () => clearInterval(id);
  }, [remainingSec, onSubmit]);

  if (!quiz) return null;

  const oneAtATime = quiz.oneQuestionAtATime;
  const toRender = oneAtATime ? [questions[step]].filter(Boolean) : questions;

  return (
    <div className="container mt-3">
      <h3>Take Quiz: {quiz.title}</h3>

      {requiresCode && !unlocked && (
        <>
          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}

          <Card className="mb-3">
            <div className="bg-light px-3 py-2 border-bottom">
              <strong>Access Code Required</strong>
            </div>

            <div className="p-3">
              <input
                className="form-control"
                placeholder="Enter access code"
                value={access}
                onChange={(e) => setAccess(e.target.value)}
              />
              <div className="text-muted small mt-2">
                Enter the access code to unlock the quiz.
              </div>
            </div>
          </Card>

          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              onClick={() => router.push(`../${qid}`)}
            >
              Back to Details
            </Button>
          </div>

          <br />
        </>
      )}

      {unlocked && remainingSec != null && (
        <div className="small text-muted mb-2 align-items-center">
          <MdOutlineTimer className="me-2" />
           Time left:{" "}
          <strong>
            {Math.floor(remainingSec / 60)}:
            {String(remainingSec % 60).padStart(2, "0")}
          </strong>
        </div>
      )}

      {unlocked && error && <Alert variant="danger">{error}</Alert>}

      {unlocked &&
        toRender.map((q, i) => {
          const order =
            q.type === "MCQ"
              ? choiceOrderMap[q._id] ||
                (q.choices ? q.choices.map((_, idx) => idx) : [])
              : [];

          return (
            <Card key={q._id} className="mb-3">
              <div className="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <div>
                  <strong>Q{oneAtATime ? step + 1 : i + 1}.</strong> {q.title}
                </div>
                <div className="text-muted small">{q.points} pts</div>
              </div>

              <div
                className="p-3 border-bottom"
                dangerouslySetInnerHTML={{ __html: q.questionHtml || "" }}
              />

              <div className="p-3">
                {q.type === "MCQ" && (
                  <div className="vstack gap-2">
                    {order.map((origIdx) => {
                      const c = q.choices?.[origIdx];
                      if (!c) return null;

                      return (
                        <label
                          key={origIdx}
                          className="form-check d-flex align-items-center gap-2"
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`q-${q._id}`}
                            onChange={() =>
                              setAnswers((a) => ({ ...a, [q._id]: origIdx }))
                            }
                          />
                          <span>{c.text}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {q.type === "TRUE_FALSE" && (
                  <div className="d-flex gap-4">
                    <label className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`q-${q._id}`}
                        onChange={() =>
                          setAnswers((a) => ({ ...a, [q._id]: true }))
                        }
                      />
                      <span>True</span>
                    </label>

                    <label className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`q-${q._id}`}
                        onChange={() =>
                          setAnswers((a) => ({ ...a, [q._id]: false }))
                        }
                      />
                      <span>False</span>
                    </label>
                  </div>
                )}

                {q.type === "FILL_BLANK" && (
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [q._id]: e.target.value }))
                    }
                  />
                )}
              </div>
            </Card>
          );
        })}

      {unlocked && oneAtATime && (
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            disabled={step === 0 || quiz.lockAfterAnswering}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>

          <Button
            variant="secondary"
            disabled={step >= questions.length - 1}
            onClick={() =>
              setStep((s) => Math.min(questions.length - 1, s + 1))
            }
          >
            Next
          </Button>
        </div>
      )}

      {unlocked && (
        <div className="mt-3">
          <Button variant="secondary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
