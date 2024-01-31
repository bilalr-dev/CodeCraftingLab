// pages/api/quiz.js
import { Quiz } from '../../models/Quiz';
import { mongooseConnect } from '../../lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect();

  try {
    const { level, numberOfQuestions } = req.query;

    // Fetch quizzes based on the selected level
    const quizzes = await Quiz.find({ level });

    // Randomly select the required number of questions
    const selectedQuestions = quizzes
      .flatMap((quiz) => quiz.questions)
      .sort(() => 0.5 - Math.random())
      .slice(0, parseInt(numberOfQuestions, 10));

    res.status(200).json({ questions: selectedQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
