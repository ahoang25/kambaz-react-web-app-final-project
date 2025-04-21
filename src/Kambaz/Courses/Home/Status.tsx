import { Button, Card } from "react-bootstrap";
import { FaCheckCircle, FaBan, FaBookOpen, FaHome, FaChartBar, FaBell, FaBullhorn, FaDownload } from "react-icons/fa";

export default function CourseStatus() {
  return (
    <Card className="p-3 shadow-sm border-0" style={{ width: "350px" }}>
      <h5 className="mb-3">Course Status</h5>

      {/* Unpublish and Published */}
      <div className="d-flex gap-2 mb-3">
        <Button variant="outline-secondary" className="w-50 d-flex align-items-center justify-content-center border">
          <FaBan className="me-2" /> Unpublish
        </Button>
        <Button style={{ backgroundColor: "#a3c293", color: "#fff" }} className="w-50 d-flex align-items-center justify-content-center border">
          <FaCheckCircle className="me-2" /> Published
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="d-grid gap-2">
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaDownload className="me-2" /> Import Existing Content
        </Button>
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaDownload className="me-2" /> Import from Commons
        </Button>
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaHome className="me-2" /> Choose Home Page
        </Button>
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaBookOpen className="me-2" /> View Course Stream
        </Button>
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaBullhorn className="me-2" /> New Announcement
        </Button>
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaChartBar className="me-2" /> New Analytics
        </Button>
        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-start border">
          <FaBell className="me-2" /> View Course Notifications
        </Button>
      </div>
    </Card>
  );
}
