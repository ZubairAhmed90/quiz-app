import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Header = () => {
  return (
    <header style={{ background: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
      <h1>Quiz App</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer style={{ background: '#282c34', padding: '10px', color: 'white', textAlign: 'center', position: 'absolute', bottom: '0', width: '100%', font:'caption'   }}>
      <p>&copy; 2024 Quiz App. Cereated By Zubair Ahmed Kaim Khani.</p>
    </footer>
  );
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const checkedInput = useRef([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setQuestionIndex(0);
        setQuizEnded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function nextQuestion() {
    const checkedButton = checkedInput.current.find(input => input.checked);
    if (checkedButton) {
      const selectedAnswer = checkedButton.value;
      console.log("Selected Answer:", selectedAnswer);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuizEnded(true);
    }
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setQuizEnded(false);
    checkedInput.current.forEach(input => (input.checked = false));
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header />

      <main style={{ padding: '20px', textAlign: 'center' }}>
        {quizEnded ? (
          <div>
            <h2>The quiz has ended!</h2>
            <button
              onClick={restartQuiz}
              style={{ background: '#ff5722', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          questions.length > 0 ? (
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Q{questionIndex + 1}: {questions[questionIndex].question.text}</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {shuffleArray([...questions[questionIndex].incorrectAnswers, questions[questionIndex].correctAnswer])
                  .map((item, index) => {
                    return (
                      <li key={index} style={{ margin: '10px 0' }}>
                        <input
                          type="radio"
                          name="choice"
                          id={item}
                          value={item}
                          ref={el => (checkedInput.current[index] = el)}
                        />
                        <label htmlFor={item} style={{ fontSize: '24px', marginLeft: '10px' }}>
                          {item}
                        </label>
                      </li>
                    );
                  })}
              </ul>
              <button
                onClick={nextQuestion}
                style={{ background: '#4CAF50', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', fontSize: '18px' }}
              >
                Next
              </button>
            </div>
          ) : (
            <h2>Loading...</h2>
          )
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
