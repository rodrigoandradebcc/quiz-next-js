import React from 'react';

import QuizBackground from '../src/components/QuizBackground';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault();
          onSubmit();
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                {alternative}
                <input
                  // style={{ display: 'none' }}
                  type="radio"
                  name={questionId}
                  aid={alternativeId}
                />
              </Widget.Topic>
            );
          })}

          <Button type="submit">CONFIRMAR</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando ...</Widget.Header>
      <Widget.Content>[DESAFIO DO LOADING]</Widget.Content>
    </Widget>
  );
}

export default function Quiz() {
  const screenStates = {
    RESULT: 'RESULT',
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
  };
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          totalQuestions={totalQuestions}
          questionIndex={questionIndex}
          onSubmit={handleSubmitQuiz}
        />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns</div>}
        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/rodrigoandradebcc/" />

    </QuizBackground>
  );
}
