import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaSearch,
  FaRocket,
} from "react-icons/fa";
import * as client from "./client";
import { useSelector } from "react-redux";


export default function Quizzes() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    try {
      const data = await client.findQuizzesForCourse(cid!);
  
      if (isFaculty) {
        setQuizzes(data);
      } else {
        setQuizzes(data.filter((q: any) => q.published));
      }
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    }
  };

  const handleDelete = async (quizId: string) => {
    try {
      await client.deleteQuiz(quizId);
      setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
    } catch (err) {
      console.error("Error deleting quiz", err);
    }
  };

  const handleTogglePublish = async (quiz: any) => {
    try {
      await client.updateQuiz(quiz._id, { published: !quiz.published });
      fetchQuizzes();
    } catch (err) {
      console.error("Error updating publish status", err);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await client.createQuizForCourse(cid!);
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
    } catch (err) {
      console.error("Failed to create quiz", err);
    }
  };

  useEffect(() => {
    if (cid) fetchQuizzes();
  }, [cid]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: 300 }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Quiz" />
        </InputGroup>

        {isFaculty && (
        <Button variant="danger" onClick={handleCreateQuiz}>
          + Quiz
        </Button>
        )}
      </div>

      <div className="border rounded">
        <div className="border-bottom px-3 py-2 fw-bold bg-light">
          ASSIGNMENT QUIZZES
        </div>

        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="d-flex justify-content-between align-items-center border-bottom px-3 py-3"
            style={{ borderLeft: "4px solid green" }}
          >
            <div className="d-flex align-items-start gap-3">
              <FaRocket className="text-success mt-1" />
              <div>
                <Link
                  to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Take`}
                  className="fw-bold text-decoration-none text-primary"
                >
                  {quiz.title}
                </Link>
                <div className="text-secondary small">
                  {quiz.published ? "Published" : "Unpublished"} |
                  {" Not available until " + quiz.available} |
                  Due: {quiz.due} | {quiz.points} pts | {quiz.questionCount} Questions
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <FaCheckCircle className="text-success" />
              {isFaculty && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="border-0 p-0">
                  <FaEllipsisV className="text-secondary" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/details`}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                    {quiz.published ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                )}
            </div>
          </div>
        ))}

        {quizzes.length === 0 && (
          <div className="text-center py-3 text-muted">No quizzes found.</div>
        )}
      </div>
    </div>
  );
}
