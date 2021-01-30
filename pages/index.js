import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';

import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Naruto Quiz</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Naruto Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Cheguei aqui');
            }}
            >
              <input
                type="text"
                placeholder="Preencha seu nome"
                onChange={function (infoDoEvento) {
                  console.log(infoDoEvento.target.value);
                  setName(infoDoEvento.target.value);
                }}
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar [seuNome]
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quiz</h1>
            <p>
              It is a long established fact that a reader will be distracted.
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/rodrigoandradebcc/" />
    </QuizBackground>
  );
}
