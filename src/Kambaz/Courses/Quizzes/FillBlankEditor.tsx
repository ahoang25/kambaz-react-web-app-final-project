import { Form } from "react-bootstrap";

export default function FillBlankEditor({
  question,
  onChange,
}: {
  question: any;
  onChange: (updatedQuestion: any) => void;
}) {
  const handleChange = (value: string) => {
    onChange({ ...question, correctAnswer: value });
  };

  return (
    <div className="mt-3">
      <div className="fw-bold mb-2">Correct Answer:</div>
      <Form.Control
        placeholder="Enter the correct answer"
        value={question.correctAnswer || ""}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
