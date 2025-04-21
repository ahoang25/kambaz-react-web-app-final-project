import { Button, Card } from "react-bootstrap";
import { FaCheckCircle, FaBan, FaBookOpen, FaHome, FaChartBar, FaBell, FaBullhorn, FaDownload } from "react-icons/fa";

export default function CourseStatus() {
  return (
    <Card className="p-3 shadow-sm">
      <h5 className="mb-3">Course Status</h5>

      <div className="d-flex gap-2 mb-3">
        <Button variant="light" className="w-50 d-flex align-items-center">
          <FaBan className="me-2" /> Unpublish
        </Button>
        <Button variant="success" className="w-50 d-flex align-items-center">
          <FaCheckCircle className="me-2" /> Publish
        </Button>
      </div>

      <div className="d-grid gap-2">
        <Button variant="secondary" className="d-flex align-items-center">
          <FaDownload className="me-2" /> Import Existing Content
        </Button>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaDownload className="me-2" /> Import from Commons
        </Button>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaHome className="me-2" /> Choose Home Page
        </Button>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaBookOpen className="me-2" /> View Course Screen
        </Button>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaBullhorn className="me-2" /> New Announcement
        </Button>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaChartBar className="me-2" /> New Analytics
        </Button>
        <Button variant="secondary" className="d-flex align-items-center">
          <FaBell className="me-2" /> View Course Notifications
        </Button>
      </div>
    </Card>
  );
}
