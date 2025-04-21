import { Form } from "react-bootstrap";

export default function ShortAnswerEditor({
  correctAnswer,
  onChange,
}: {
  correctAnswer: string;
  onChange: (answer: string) => void;
}) {
  return (
    <div className="mt-3">
      <div className="fw-bold mb-2">Correct Answer:</div>
      <Form.Control
        placeholder="Enter the correct answer"
        value={correctAnswer}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
