import { useEffect, useState } from 'react';
import './App.css';
import questionsData from './questions.json';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(true);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleAnsweClick = (selectedOption) => {
    if (selectedOption === questionsData[currentQuestion].correctoption) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);  // Reset score as well
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score}/{questionsData.length}</h2>
          <button onClick={handleRestartQuiz}>Restart</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questionsData[currentQuestion].question}</p>
          <div className="options">
            {questionsData[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnsweClick(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">Time Left: <span>{timer}s</span></div>
        </div>
      )}
    </div>
  );
}

export default App;
