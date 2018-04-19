const Quiz = require('../models/quiz');

const quizController = {
  createQuiz(req, res, next) {
    Quiz.create({
      name: req.body.name,
      category: req.body.category,
      questions: [],
      user: req.decoded.id,
    })
      .then((quiz) => {
        res.status(200).json(quiz);
      })
      .catch((err) => {
        next(err);
      });
  },
  // createQuestion
  createQuestion(req, res, next) {
    const newQuestion = {
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      incorrect_answers: req.body.incorrect_answers,
    };
    console.log(newQuestion)
    console.log(req.params.quizId)
    Quiz.findOneAndUpdate({ _id: req.params.quizId }, { $push: { questions: newQuestion } })
      .then((quiz) => {
        res.status(200).json(quiz);
      })
      .catch((err) => {
        next(err);
      });
  },
  getAllQuizes(req, res, next) {

    Quiz.find({},'name user category')
    .then((quizes) => {
      console.log(quizes)
      res.status(200).json(quizes);
    })
    .catch((err)=>{
      next(err);
    });
  },
  getQuiz(req, res, next) {
    Quiz.findById(req.params.id)
    .then((quiz) => {
      console.log(quiz, quiz.response)
      res.status(200).json(quiz.questions)
    })
  }


};

module.exports = quizController;

