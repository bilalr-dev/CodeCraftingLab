// components/Quizzes.js
import React, { useState, useEffect } from 'react';

export default function Quizzes({ allQuizzes, selectedQuestions, onQuizFinish, onPlayAgain, increaseScore }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleChoiceSelection = (choiceIndex) => {
    setSelectedChoiceIndex(choiceIndex);

    setTimeout(() => {
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedChoiceIndex(null);
      } else {
        setQuizFinished(true);
        onQuizFinish();
      }
    }, 2000);
  };

  const isCorrectChoice = (choiceIndex) => {
    return selectedQuestions[currentQuestionIndex].correctAnswerIndex === choiceIndex;
  };

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedChoiceIndex(null);
    setQuizFinished(false);
  }, [selectedQuestions]);

  const playAgain = () => {
    onPlayAgain();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">

          {selectedQuestions && selectedQuestions.length > 0 && !quizFinished && (
            <>
              {selectedQuestions.map((question, questionIndex) => (
                <div key={question._id} style={{ display: questionIndex === currentQuestionIndex ? 'block' : 'none' }}>
                  <div className="section-heading mt-5 mb-auto">
                    <h2>Question № {questionIndex + 1}</h2>
                  </div>
                  <p className="questionText">{question.text}</p>
                  <div className="gridChoices">
                    {question.choices.map((choice, choiceIndex) => (
                      <button className="choiceButton"
                        key={choiceIndex}
                        onClick={() => {
                          handleChoiceSelection(choiceIndex);
                          // Check if the selected choice is correct and increase the score
                          if (isCorrectChoice(choiceIndex)) {
                            increaseScore();
                          }
                        }}
                        style={{
                          backgroundColor:
                            selectedChoiceIndex !== null &&
                            (isCorrectChoice(choiceIndex) ? '#ACDABA' : '#E94C43'),
                          color: selectedChoiceIndex !== null && (isCorrectChoice(choiceIndex) ? '#fff' : '#fff'), // Set text color to white for correct choice, black otherwise
                        }}
 
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {quizFinished && (
            <div className="section-heading mt-5 mb-auto">
              <h2>Quiz Finished!</h2>
              <p>Thank you for completing the quiz.</p>
              <button className="formbold-btnFinished" onClick={playAgain}>Play Again</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
