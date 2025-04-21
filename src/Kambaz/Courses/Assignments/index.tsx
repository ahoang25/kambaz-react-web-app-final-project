import { useEffect, useState } from "react";
import {
  BsThreeDotsVertical,
  BsGripVertical,
  BsTrash,
} from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import GreenCheckmark from "./GreenCheckmark";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import "./assignments.css";

import * as coursesClient from "../client";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  available?: string;
  due?: string;
  points?: number;
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignmentState = useSelector((state: any) => state.assignmentsReducer);
  const allAssignments = Array.isArray(assignmentState.assignments)
    ? assignmentState.assignments
    : [];

    const assignments = allAssignments.filter((a: any) =>
    typeof a.course === "string"
      ? a.course === cid
      : a.course?._id === cid
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const handleDelete = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedAssignment) {
      await coursesClient.deleteAssignment(selectedAssignment._id);
      dispatch(deleteAssignment(selectedAssignment._id));
    }
    setShowDeleteModal(false);
    setSelectedAssignment(null);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      try {
        const data = await coursesClient.findAssignmentsForCourse(cid);
        console.log("Fetched assignments:", data);
        dispatch(setAssignments(data));
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      }
    };
    fetchAssignments();
  }, [cid]);

  return (
    <Container fluid>
      <Row>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              placeholder="Search for Assignments"
              className="form-control w-50"
            />
            <div>
              <Button variant="light" className="me-2">
                + Group
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  navigate(`/Kambaz/Courses/${cid}/Assignments/New`)
                }
              >
                + Assignment
              </Button>
            </div>
          </div>

          <ListGroup className="rounded-0">
            <ListGroup.Item className="d-flex justify-content-between align-items-center p-3 bg-light">
              <div className="fw-bold">
                <BsGripVertical className="me-2" />
                ASSIGNMENTS
              </div>
              <div className="d-flex align-items-center">
                <span className="text-secondary me-3">40% of Total</span>
                <Button variant="light" className="p-0 border-0">
                  <BsThreeDotsVertical />
                </Button>
              </div>
            </ListGroup.Item>

            {assignments.length === 0 ? (
              <ListGroup.Item className="text-center text-secondary p-4">
                No assignments yet. Click "+ Assignment" to create one.
              </ListGroup.Item>
            ) : (
              assignments.map((assignment: Assignment) => (
                <ListGroup.Item
                  key={assignment._id}
                  className="d-flex align-items-center border rounded p-3 position-relative"
                >
                  <BsGripVertical className="me-2 fs-5 text-secondary" />
                  <FaFileAlt className="me-2 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      className="fw-bold text-primary text-decoration-none"
                    >
                      {assignment.title}
                    </Link>
                    <p className="mb-0">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>
                        Not available until {assignment.available || "N/A"}
                      </strong>
                    </p>
                    <p className="mb-0 text-secondary">
                      <strong>Due:</strong> {assignment.due || "N/A"} |{" "}
                      {assignment.points || "N/A"} pts
                    </p>
                  </div>
                  <GreenCheckmark />
                  <Button
                    variant="danger"
                    className="ms-3"
                    onClick={() => handleDelete(assignment)}
                  >
                    <BsTrash />
                  </Button>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedAssignment?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
