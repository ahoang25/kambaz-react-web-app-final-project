import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer"; 
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./assignmentEditor.css";
import * as coursesClient from "../client";


export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingAssignment = useSelector((state: { assignmentsReducer: { assignments: any[]; }; }) =>
    state.assignmentsReducer.assignments.find((a) => a._id === aid)
  );

  const [assignment, setAssignment] = useState({
    _id: uuidv4(),
    title: "",
    description: "",
    points: 100,
    due: new Date().toISOString().split("T")[0], 
    available: new Date().toISOString().split("T")[0], 
    course: cid ?? "",
  });

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  const handleSave = async () => {
    if (!assignment.title.trim()) return;
  
    const assignmentToSave = {
      ...assignment,
      available: assignment.available,
      due: assignment.due,
    };
  
    if (existingAssignment) {
      await coursesClient.updateAssignment(assignment._id, assignmentToSave);
      dispatch(updateAssignment(assignmentToSave));
    } else {
      const created = await coursesClient.createAssignmentForCourse(cid!, assignmentToSave);
      dispatch(addAssignment(created));
    }
  
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };
  

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={8}>
          <Form>
            <Form.Group controlId="assignmentName" className="mb-3">
              <Form.Label className="fw-bold">Assignment Name</Form.Label>
              <Form.Control
                type="text"
                value={assignment.title}
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="assignmentDescription" className="mb-3">
              <Form.Control
                as="textarea"
                rows={8}
                value={assignment.description}
                onChange={(e: { target: { value: any; }; }) => setAssignment({ ...assignment, description: e.target.value })}
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  fontSize: "16px",
                }}
              />
            </Form.Group>

            <Form.Group controlId="points" className="mb-3">
              <Form.Label className="fw-bold">Points</Form.Label>
              <Form.Control
                type="number"
                value={assignment.points}
                onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
                placeholder="Enter points"
              />
            </Form.Group>

            <Form.Group controlId="assignSection" className="mb-3">
              <Form.Label className="fw-bold fs-5">Assign</Form.Label>

              <Form.Group controlId="assignTo" className="mb-3">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Form.Group>

              <Form.Group controlId="dueDate" className="mb-3">
                <Form.Label className="fw-bold">Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.due}
                  onChange={(e: { target: { value: any; }; }) => setAssignment({ ...assignment, due: e.target.value })}
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="availableFrom" className="mb-3">
                    <Form.Label className="fw-bold">Available From</Form.Label>
                    <Form.Control
                      type="date"
                      value={assignment.available}
                      onChange={(e) => setAssignment({ ...assignment, available: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                <Button variant="secondary" className="me-2">
                  Cancel
                </Button>
              </Link>
              <Button variant="danger" onClick={handleSave}>Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
