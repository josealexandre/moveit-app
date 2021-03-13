import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider level={props.level} currentExperience={props.currentExperience} completedChallenges={props.completedChallenges} >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {  
  const { level, currentExperience, completedChallenges } = context.req.cookies;
  
  return {
    props: {
      level: Number(level) || 1,
      currentExperience: Number(currentExperience) || 0,
      completedChallenges: Number(completedChallenges) || 0,
    },
  }
}