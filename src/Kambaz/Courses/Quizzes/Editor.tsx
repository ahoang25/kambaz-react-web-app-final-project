import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "./client";
import {
    Tabs, Tab, Form, Button, Card, Row, Col,
  } from "react-bootstrap";

  import FillBlankEditor from "./FillBlankEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import ShortAnswerEditor from "./ShortAnswerEditor";
import TrueFalseEditor from "./TrueFalseEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    available: "",
    due: "",
    points: 0,
  });

  const [questions, setQuestions] = useState<any[]>([]);


  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid!);
    setQuiz(data);
  };

  const fetchQuestions = async () => {
    const data = await client.findQuestionsForQuiz(qid!);
    setQuestions(data);
  };


  useEffect(() => {
    if (qid) {
      fetchQuiz();
      fetchQuestions();
    }
  }, [qid]);

  const handleSave = async () => {
    await client.updateQuiz(qid!, quiz);
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz(qid!, { ...quiz, published: true });
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  
  const handleNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString(),
        title: "",
        questionType: "MULTIPLE_CHOICE",
        points: 0,
        choices: [""],
        correctAnswer: "",
        isNew: true  
      },
    ]);
  };

  const handleSaveAll = async () => {
    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    await client.updateQuiz(qid!, { ...quiz, points: totalPoints });
  
    for (const question of questions) {
      if (question.isNew) {
        await client.createQuestion(qid!, question);
      } else {
        await client.updateQuestion(question._id, question);
      }
    }
  
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };
  
  
  

  return (
    <div className="p-4">
      <Tabs defaultActiveKey="details" className="mb-3">
        <Tab eventKey="details" title="Details">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select
                value={quiz.assignmentGroup}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time Limit (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />

            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            />

<Form.Group className="mb-3">
  <Form.Label>Max Attempts</Form.Label>
  <Form.Control
    type="number"
    min={1}
    value={quiz.maxAttempts || 1}
    onChange={(e) =>
      setQuiz({ ...quiz, maxAttempts: Number(e.target.value) })
    }
  />
</Form.Group>

            <Form.Check
              type="checkbox"
              label="Show Correct Answers"
              checked={quiz.showCorrectAnswers}
              onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
            />

            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
            />

            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
            />

            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
            />

            <Form.Group className="mb-3">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                value={quiz.accessCode}
                onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available Date</Form.Label>
              <Form.Control
                type="date"
                value={quiz.available || ""}
                onChange={(e) => setQuiz({ ...quiz, available: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={quiz.due || ""}
                onChange={(e) => setQuiz({ ...quiz, due: e.target.value })}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleSaveAndPublish}>
                Save & Publish
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>
        </Tab>

        <Tab eventKey="questions" title={`Questions (${questions.length})`}>
  <div className="mb-3 fw-bold">Points: {questions.reduce((sum, q) => sum + (q.points || 0), 0)}</div>
  <Button variant="outline-secondary" className="mb-3" onClick={handleNewQuestion}>
    + New Question
  </Button>
  {questions.map((q, index) => (
    <Card key={q._id} className="mb-3">
      <Card.Body>
        <Row className="align-items-center mb-2">
          <Col>
            <Form.Control
              value={q.title}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].title = e.target.value;
                setQuestions(newQuestions);
              }}
            />
          </Col>
          <Col xs={3}>
            <Form.Select
              value={q.questionType}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].questionType = e.target.value;
                setQuestions(newQuestions);
              }}
            >
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="TRUE_FALSE">True/False</option>
              <option value="SHORT_ANSWER">Short Answer</option>
              <option value="FILL_BLANK">Fill in the Blank</option>
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              value={q.points}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].points = Number(e.target.value);
                setQuestions(newQuestions);
              }}
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                const newQuestions = [...questions];
                newQuestions[index].editMode = !q.editMode;
                setQuestions(newQuestions);
              }}
            >
              {q.editMode ? "Close" : "Edit"}
            </Button>
          </Col>
        </Row>

        {q.editMode && (
          <div className="mt-3">
            {q.questionType === "MULTIPLE_CHOICE" && (
              <MultipleChoiceEditor
                question={q}
                onChange={(updatedQuestion: any) => {
                  const newQuestions = [...questions];
                  newQuestions[index] = updatedQuestion;
                  setQuestions(newQuestions);
                }}
              />
            )}
            {q.questionType === "TRUE_FALSE" && (
              <TrueFalseEditor
                question={q}
                onChange={(updatedQuestion: any) => {
                  const newQuestions = [...questions];
                  newQuestions[index] = updatedQuestion;
                  setQuestions(newQuestions);
                }}
              />
            )}
            {q.questionType === "FILL_BLANK" && (
              <FillBlankEditor
                question={q}
                onChange={(updatedQuestion: any) => {
                  const newQuestions = [...questions];
                  newQuestions[index] = updatedQuestion;
                  setQuestions(newQuestions);
                }}
              />
            )}
            {q.questionType === "SHORT_ANSWER" && (
  <ShortAnswerEditor
    correctAnswer={q.correctAnswer}
    onChange={(answer: string) => {
      const newQuestions = [...questions];
      newQuestions[index] = { ...q, correctAnswer: answer };
      setQuestions(newQuestions);
    }}
  />
)}
          </div>
        )}
      </Card.Body>
    </Card>
  ))}
  <div className="d-flex justify-content-end gap-2">
    <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSaveAll}>
      Save
    </Button>
  </div>
</Tab>
</Tabs>


    </div>
  );
}
