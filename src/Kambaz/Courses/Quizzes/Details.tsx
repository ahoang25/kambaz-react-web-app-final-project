import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import { Button, Row, Col, Card } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid!);
    setQuiz(data);
  };

  useEffect(() => {
    if (qid) fetchQuiz();
  }, [qid]);

  const formatDate = (date: string | undefined) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return date;
    }
  };

  if (!quiz) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{quiz.title}</h3>
        <div>
        <Button
        variant="secondary"
        className="me-2"
        onClick={() =>
          navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`)
        }
      >
        Preview
      </Button>
          <Button
            variant="danger"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)
            }
          >
            Edit
          </Button>
        </div>
      </div>

      <Card className="p-4 bg-light">
        <Row className="mb-2">
          <Col xs={4}><strong>Quiz Type</strong></Col>
          <Col>{quiz.quizType || "Graded Quiz"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Points</strong></Col>
          <Col>{quiz.points || 0}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Assignment Group</strong></Col>
          <Col>{quiz.assignmentGroup || "Quizzes"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Shuffle Answers</strong></Col>
          <Col>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Time Limit</strong></Col>
          <Col>{quiz.timeLimit || 20} Minutes</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Multiple Attempts</strong></Col>
          <Col>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Show Correct Answers</strong></Col>
          <Col>{quiz.showCorrectAnswers ? "Yes" : "No"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Access Code</strong></Col>
          <Col>{quiz.accessCode || "None"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>One Question at a Time</strong></Col>
          <Col>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Webcam Required</strong></Col>
          <Col>{quiz.webcamRequired ? "Yes" : "No"}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Lock Questions After Answering</strong></Col>
          <Col>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
        </Row>
        <hr />
        <Row className="mb-2">
          <Col xs={4}><strong>Available</strong></Col>
          <Col>{formatDate(quiz.available)}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4}><strong>Due</strong></Col>
          <Col>{formatDate(quiz.due)}</Col>
        </Row>
        <Row>
          <Col xs={4}><strong>Until</strong></Col>
          <Col>{formatDate(quiz.until)}</Col>
        </Row>
      </Card>
    </div>
  );
}
