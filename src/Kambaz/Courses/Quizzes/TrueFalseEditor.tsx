import { Form } from "react-bootstrap";

export default function TrueFalseEditor({ question, onChange }: any) {
  const handleChange = (value: string) => {
    onChange({ ...question, correctAnswer: value });
  };

  return (
    <Form className="mt-3">
      <Form.Label><strong>Answers:</strong></Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="True"
          name={`trueFalse-${question._id}`}
          checked={question.correctAnswer === "True"}
          onChange={() => handleChange("True")}
        />
        <Form.Check
          type="radio"
          label="False"
          name={`trueFalse-${question._id}`}
          checked={question.correctAnswer === "False"}
          onChange={() => handleChange("False")}
        />
      </div>
    </Form>
  );
}
