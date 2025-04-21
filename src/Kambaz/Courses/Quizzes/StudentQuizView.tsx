import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import { Button, Form, Alert } from "react-bootstrap";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";

export default function StudentQuizView() {
  const { qid} = useParams();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const load = async () => {
      const q = await client.findQuizById(qid!);
      const qs = await client.findQuestionsForQuiz(qid!);
      const count = await client.countAttempts(qid!, currentUser._id);

      setQuiz(q);
      setQuestions(qs);
      setAttemptsRemaining(q.maxAttempts - count);

      if (count >= q.maxAttempts) {
        const last = await client.findLastAttempt(qid!, currentUser._id);
        setAnswers(last.answers);
        setScore(last.score);
        setSubmitted(true);
      }
    };
    if (qid && currentUser?._id) load();
  }, [qid, currentUser]);

  const handleAnswerChange = (qid: string, value: string) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async () => {
    let total = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q._id];
      if (
        q.questionType === "TRUE_FALSE" ||
        q.questionType === "MULTIPLE_CHOICE" ||
        q.questionType === "FILL_BLANK"
      ) {
        if (userAnswer?.toLowerCase() === q.correctAnswer?.toLowerCase()) {
          total += q.points || 0;
        }
      }
    });
    setScore(total);
    setSubmitted(true);
    await client.submitAttempt(qid!, currentUser._id, answers, total);
  };

  return (
    <div className="p-4">
      <h3>{quiz.title}</h3>

      {submitted ? (
        <Alert variant="info">
          <FaCheckCircle className="me-2" /> You submitted this quiz.
        </Alert>
      ) : quiz.multipleAttempts && attemptsRemaining !== null ? (
        <Alert variant="warning">
          <FaQuestionCircle className="me-2" />
          {attemptsRemaining} attempt{attemptsRemaining !== 1 && "s"} remaining.
        </Alert>
      ) : null}

      <p>
        <strong>Instructions:</strong> {quiz.description || "Answer all questions below."}
      </p>

      {currentQuestion && (
        <div className="border rounded p-3 mb-4" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <strong>Question {currentIndex + 1}</strong>
            <span className="text-muted">{currentQuestion.points} pts</span>
          </div>
          <div className="mb-3">{currentQuestion.title}</div>

          {currentQuestion.questionType === "TRUE_FALSE" && (
            <div>
              {["True", "False"].map((label) => (
                <div key={label} className="border-top pt-2 pb-2 ps-2 pe-2">
                  <Form.Check
                    type="radio"
                    label={label}
                    checked={answers[currentQuestion._id] === label}
                    onChange={() => handleAnswerChange(currentQuestion._id, label)}
                    disabled={submitted}
                  />
                </div>
              ))}
            </div>
          )}

          {currentQuestion.questionType === "MULTIPLE_CHOICE" && (
            <div>
              {currentQuestion.choices.map((choice: string) => (
                <div key={choice} className="border-top pt-2 pb-2 ps-2 pe-2">
                  <Form.Check
                    type="radio"
                    label={choice}
                    checked={answers[currentQuestion._id] === choice}
                    onChange={() => handleAnswerChange(currentQuestion._id, choice)}
                    disabled={submitted}
                  />
                </div>
              ))}
            </div>
          )}

          {currentQuestion.questionType === "FILL_BLANK" && (
            <Form.Control
              type="text"
              placeholder="Type your answer"
              value={answers[currentQuestion._id] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
              disabled={submitted}
            />
          )}

          {currentQuestion.questionType === "SHORT_ANSWER" && (
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your response"
              value={answers[currentQuestion._id] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
              disabled={submitted}
            />
          )}

          {submitted && (
            <div className="mt-2">
              {answers[currentQuestion._id]?.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase() ? (
                <span className="text-success">✓ Correct</span>
              ) : (
                <span className="text-danger">
                  ✗ Incorrect. Correct answer: <strong>{currentQuestion.correctAnswer}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className="mb-3 fw-bold">
          Final Score: {score} / {questions.reduce((s, q) => s + (q.points || 0), 0)} pts
        </div>
      )}

      <div className="d-flex justify-content-between">
        <div></div>
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          {currentIndex < questions.length - 1 && (
            <Button variant="primary" onClick={() => setCurrentIndex(currentIndex + 1)}>
              Next
            </Button>
          )}
          {!submitted && (
            <Button variant="success" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>
      </div>

      <div className="mb-4" style={{ marginTop: "2rem", maxWidth: "150px" }}>
        <strong>Questions</strong>
        <div className="d-flex flex-column mt-2">
          {questions.map((q, idx) => {
            const answered = answers[q._id];
            const isActive = idx === currentIndex;
            return (
              <Button
                key={idx}
                variant={isActive ? "primary" : answered ? "light" : "light"}
                onClick={() => setCurrentIndex(idx)}
                className={`mb-2 text-start ${isActive ? "fw-bold" : ""}`}
              >
                {answered ? (
                  <FaCheckCircle className="me-1 text-success" />
                ) : (
                  <FaQuestionCircle className="me-1 text-danger" />
                )}
                Question {idx + 1}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
