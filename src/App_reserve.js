import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  height: 35px;
  padding: 0 10px;
  font-size: 16px;
`;

const Button = styled.button`
  height: 35px;
  font-size: 16px;
`;

const Paragraph = styled.div`
  margin-top: 50px;
  text-align: left;
  width: 50%;
`;

const AnswerBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1em;
`;

const ExpandableSection = styled.div`
  margin-bottom: 10px;
`;

const ExpandableHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ExpandableIcon = styled.span`
  margin-right: 5px;
  font-size: 18px;
`;

function App() {
  const [studentQuestion, setStudentQuestion] = useState('');
  const [evaluationAnswer, setEvaluationAnswer] = useState('');
  const [assistantResponse, setAssistantAnswer] = useState('');
  const [professorAnswer, setProfessorAnswer] = useState('');
  const [isEvaluationExpanded, setEvaluationExpanded] = useState(false);
  const [isAssistantExpanded, setAssistantExpanded] = useState(false);
  const [isMentorExpanded, setMentorExpanded] = useState(false);

  const handleStudentQuestionChange = (e) => {
    setStudentQuestion(e.target.value);
  };

  const handleStudentQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/ask', {
        question: studentQuestion,
      });
      setEvaluationAnswer(response.data.hat_evaluation);

      const assistantAnswerObject = JSON.parse(response.data.mentors_script_output);
      setAssistantAnswer(assistantAnswerObject);

      setProfessorAnswer(response.data.mentors_script_2_output);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleEvaluationExpanded = () => {
    setEvaluationExpanded(!isEvaluationExpanded);
  };

  const toggleAssistantExpanded = () => {
    setAssistantExpanded(!isAssistantExpanded);
  };

  const toggleMentorExpanded = () => {
    setMentorExpanded(!isMentorExpanded);
  };

  return (
    <Container>
      <Form onSubmit={handleStudentQuestionSubmit}>
        <Input
          type="text"
          value={studentQuestion}
          onChange={handleStudentQuestionChange}
          placeholder="Ask your question here..."
        />
        <Button type="submit">Ask Mentor</Button>
      </Form>

      {professorAnswer && (
        <Paragraph>
          <ExpandableSection>
            <ExpandableHeader onClick={toggleMentorExpanded}>
              <ExpandableIcon>{isMentorExpanded ? '-' : '+'}</ExpandableIcon>
              <strong>Mentor's Answer:</strong>
            </ExpandableHeader>
            {isMentorExpanded && (
              <AnswerBox>
                {professorAnswer.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </AnswerBox>
            )}
          </ExpandableSection>
        </Paragraph>
      )}

      {assistantResponse && (
        <Paragraph>
          <ExpandableSection>
            <ExpandableHeader onClick={toggleAssistantExpanded}>
              <ExpandableIcon>{isAssistantExpanded ? '-' : '+'}</ExpandableIcon>
              <strong>Assistant's Response:</strong>
            </ExpandableHeader>
            {isAssistantExpanded && (
              <pre>{JSON.stringify(assistantResponse, null, 2).split('\\n').map((item, i) => <div key={i}>{item}</div>)}</pre>
            )}
          </ExpandableSection>
        </Paragraph>
      )}

      {evaluationAnswer && (
        <Paragraph>
          <ExpandableSection>
            <ExpandableHeader onClick={toggleEvaluationExpanded}>
              <ExpandableIcon>{isEvaluationExpanded ? '-' : '+'}</ExpandableIcon>
              <strong>Evaluation Answer:</strong>
            </ExpandableHeader>
            {isEvaluationExpanded && <p>{evaluationAnswer}</p>}
          </ExpandableSection>
        </Paragraph>
      )}
    </Container>
  );
}

export default App;
