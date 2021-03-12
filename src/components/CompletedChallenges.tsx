import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/CompletedChallenges.module.css';

export const CompletedChallenges = () => {
    const { completedChallenges } = useContext(ChallengeContext);

    return (
        <div className={styles.container}>
            <span>Completed challenges</span>
            <span>{completedChallenges}</span>
        </div>
    )
}