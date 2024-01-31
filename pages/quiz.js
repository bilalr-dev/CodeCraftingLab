// pages/quiz.js
import React, { useState, useEffect } from 'react';
import Quizzes from "@/components/Quizzes";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import QuizForm from "@/components/QuizForm";

import { mongooseConnect } from "@/lib/mongoose";
import { Quiz } from "@/models/Quiz";

export default function QuizzesPage({ allQuizzes }) {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [playingAgain, setPlayingAgain] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  const fetchQuestions = async () => {
    try {
      if (!selectedLevel || !selectedNumberOfQuestions || isNaN(selectedNumberOfQuestions) || selectedNumberOfQuestions <= 0) {
        return;
      }

      const response = await fetch(`/api/quiz?level=${selectedLevel}&numberOfQuestions=${selectedNumberOfQuestions}`);
      const data = await response.json();

      setSelectedQuestions(data.questions);
      setQuizStarted(true);
      setScore(0);
      setTimer(0); // Reset the timer when starting a new quiz
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const startQuiz = () => {
    fetchQuestions();
    startTimer();
  };

  const onQuizFinish = () => {
    setQuizFinished(true);
    stopTimer();
  };

  const onPlayAgain = () => {
    setSelectedLevel('');
    setSelectedNumberOfQuestions('');
    setSelectedQuestions([]);
    setQuizStarted(false);
    setQuizFinished(false);
    setPlayingAgain(true);
    setScore(0);
    setTimer(0);
  };

  const increaseScore = () => {
    setScore(score + 1);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    // Update timer every second
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Store intervalId in state to clear it when needed
    setTimerIntervalId(intervalId);
  };

  const stopTimer = () => {
    // Clear the interval when the quiz finishes
    clearInterval(timerIntervalId);
  };

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearInterval(timerIntervalId);
  }, [timerIntervalId]);

  return (
    <>
      <Header />
      <Banner />

      {/* Quiz Form */}
      {!quizStarted && (
        <QuizForm
          selectedLevel={selectedLevel}
          selectedNumberOfQuestions={selectedNumberOfQuestions}
          onLevelChange={setSelectedLevel}
          onNumberOfQuestionsChange={setSelectedNumberOfQuestions}
          onStartQuiz={startQuiz}
        />
      )}

      {/* Display Quizzes Component */}
      <Quizzes
        allQuizzes={allQuizzes}
        selectedQuestions={selectedQuestions}
        onQuizFinish={onQuizFinish}
        onPlayAgain={onPlayAgain}
        increaseScore={increaseScore}
      />

      {/* Display Score and Timer */}
      {quizStarted && (
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="timerContainer">
                <p>Time: {formatTime(timer)}</p>
                <p>Score: {score} /{selectedNumberOfQuestions}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <FloatingButton />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allQuizzes = await Quiz.find({});

  return {
    props: {
      allQuizzes: JSON.parse(JSON.stringify(allQuizzes)),
    },
  };
}
