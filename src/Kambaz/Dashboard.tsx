import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface Course {
  _id: string;
  name: string;
  number: string;
  description: string;
  image: string;
  enrolled?: boolean; 
}

interface User {
  _id: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: any; 
}

interface DashboardProps {
  courses: Course[];
  enrollments: Enrollment[];
  addNewCourse: (course: Course) => Promise<void>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  enrollUser: (userId: string, courseId: string) => Promise<void>;
  unenrollUser: (userId: string, courseId: string) => Promise<void>;
}

export default function Dashboard({
  courses,
  enrollments,
  addNewCourse,
  updateCourse,
  deleteCourse,
  enrollUser,
  unenrollUser,
}: DashboardProps) {
  const currentUser: User | null = useSelector(
    (state: any) => state.accountReducer.currentUser
  );

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: uuidv4(),
    name: "",
    number: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  const handleEdit = (selectedCourse: Course) => {
    setCourse(selectedCourse);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (isEditing) {
      await updateCourse(course);
    } else {
      await addNewCourse(course);
    }
    setShowForm(false);
    setIsEditing(false);
    setCourse({
      _id: uuidv4(),
      name: "",
      number: "",
      description: "",
      image: "/images/reactjs.jpg",
    });
  };

  
  const enrolledCourses = useMemo(() => {
    if (!currentUser || !currentUser._id) return [];
  
    return courses.filter((crs) =>
      enrollments.some((enrolledCourse) => enrolledCourse._id === crs._id)
    );
  }, [courses, enrollments, currentUser]);
  
  

  const coursesToDisplay = showAllCourses ? courses : enrolledCourses;

  if (!currentUser || !currentUser._id) {
    return <p className="text-center">No user signed in. Please log in.</p>;
  }

  return (
    <div id="wd-dashboard" style={{ marginLeft: "100px", padding: "20px" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <div className="mb-3 d-flex align-items-center justify-content-between" style={{ maxWidth: "400px" }}>
        <Button variant="info" onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "Show Enrolled" : "Show All"}
        </Button>
      </div>

      {!showForm && (
        <div className="d-flex align-items-center justify-content-between" style={{ maxWidth: "400px" }}>
          <h2 className="m-0">New Course</h2>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Add
          </Button>
        </div>
      )}

      {showForm && (
        <div style={{ maxWidth: "400px", border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h2 className="m-0">{isEditing ? "Edit Course" : "New Course"}</h2>
          <Form className="mt-3">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                placeholder="Course Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={course.number}
                onChange={(e) => setCourse({ ...course, number: e.target.value })}
                placeholder="Course Number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                placeholder="Course Description"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => { setShowForm(false); setIsEditing(false); }}>
                Cancel
              </Button>
              <Button variant={isEditing ? "warning" : "primary"} onClick={handleSave}>
                {isEditing ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </div>
      )}

      <hr />
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Enrolled Courses"} ({coursesToDisplay.length})
      </h2>

      <Container fluid>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {coursesToDisplay.map((c) => {
            const isEnrolled = enrollments.some(
              (enr) =>
              enr?.user === currentUser._id
              &&
                enr?.course?._id === c._id
            );
          
            
            
            return (
              <Col key={c._id} style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={c.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body>
                      <Card.Title className="text-nowrap overflow-hidden">
                        {c.name}
                      </Card.Title>
                      <Card.Text style={{ height: "100px", overflow: "hidden" }}>
                        {c.description}
                      </Card.Text>
                      <Button variant="primary">Go</Button>
                    </Card.Body>
                  </Link>
                  <div className="p-2">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(c);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCourse(c._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant={isEnrolled ? "danger" : "success"}
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          if (isEnrolled) {
                            await unenrollUser(currentUser._id, c._id);
                          } else {
                            await enrollUser(currentUser._id, c._id);
                          }
                        } catch (err) {
                          console.error("Error toggling enrollment:", err);
                        }
                      }}
                    >
                      {isEnrolled ? "Unenroll" : "Enroll"}
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
