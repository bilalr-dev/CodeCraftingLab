// components/QuizForm.js
import React from 'react';

export default function QuizForm({ selectedLevel, onLevelChange, onNumberOfQuestionsChange, onStartQuiz }) {
  const minNumberOfQuestions = 5; // Set the minimum value
  const maxNumberOfQuestions = 25; // Set the maximum value

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Quizzes</h2>
              </div>
            </div>
          </div>
          <div className="formbold-input-flex">
            <div>
              <label htmlFor="level" className="formbold-form-label">Level</label>
              <select className="formbold-form-input" value={selectedLevel} onChange={(e) => onLevelChange(e.target.value)}>
                <option value="">Select Level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label htmlFor="numberOfQuestions" className="formbold-form-label">Number of Questions</label>
              <input
                type="number"
                className="formbold-form-input"
                min={minNumberOfQuestions}
                max={maxNumberOfQuestions}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  onNumberOfQuestionsChange(Math.max(minNumberOfQuestions, Math.min(value, maxNumberOfQuestions)));
                }}
                onBlur={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (isNaN(value) || value < minNumberOfQuestions) {
                    e.target.value = minNumberOfQuestions.toString();
                    onNumberOfQuestionsChange(minNumberOfQuestions);
                  } else if (value > maxNumberOfQuestions) {
                    e.target.value = maxNumberOfQuestions.toString();
                    onNumberOfQuestionsChange(maxNumberOfQuestions);
                  }
                }}
              />
            </div>
          </div>
          <button className="formbold-btn" onClick={onStartQuiz}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}