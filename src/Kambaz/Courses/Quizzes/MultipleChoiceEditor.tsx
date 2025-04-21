import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function MultipleChoiceEditor({ question, onChange }: any) {
  const [choices, setChoices] = useState(question.choices || [""]);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer || "");

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
    onChange({ ...question, choices: updatedChoices });
  };

  const handleAddChoice = () => {
    const updatedChoices = [...choices, ""];
    setChoices(updatedChoices);
    onChange({ ...question, choices: updatedChoices });
  };

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = choices.filter((_: any, i: number) => i !== index);
    setChoices(updatedChoices);

    const updatedCorrect = choices[index] === correctAnswer ? "" : correctAnswer;
    setCorrectAnswer(updatedCorrect);

    onChange({
      ...question,
      choices: updatedChoices,
      correctAnswer: updatedCorrect,
    });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setCorrectAnswer(value);
    onChange({ ...question, correctAnswer: value });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label><strong>Question:</strong></Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={question.title}
          onChange={(e) => onChange({ ...question, title: e.target.value })}
        />
      </Form.Group>

      <Form.Label className="mt-4"><strong>Answers:</strong></Form.Label>
      {choices.map((choice: string, index: number) => (
        <Row key={index} className="mb-2 align-items-center">
          <Col xs={1}>
            <Form.Check
              type="radio"
              name="correctAnswer"
              checked={correctAnswer === choice}
              onChange={() => handleCorrectAnswerChange(choice)}
              title="Correct Answer"
            />
          </Col>
          <Col>
            <Form.Control
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`Possible Answer ${index + 1}`}
            />
          </Col>
          <Col xs="auto">
            <Button variant="outline-danger" onClick={() => handleDeleteChoice(index)}>
              <FaTrash />
            </Button>
          </Col>
        </Row>
      ))}
      <Button variant="outline-secondary" onClick={handleAddChoice}>
        + Add Another Answer
      </Button>
    </Form>
  );
}
