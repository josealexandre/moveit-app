import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
    const { currentChallenge, resetChallenge } = useContext(ChallengeContext);

    return (
        <div className={styles.container}>
            { currentChallenge ? (
                <div className={styles.activeChallenge}>
                    <header>Earn {currentChallenge.amount} xp</header>
                    <main>
                        { currentChallenge.type === 'body' ? (
                            <img src="icons/body.svg" alt="work out" />
                        ) : (
                            <img src="icons/eye.svg" alt="eye" />
                        ) }
                        <strong>New challenge!</strong>
                        <p>{currentChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.failedButton} onClick={resetChallenge}>
                            Failed
                        </button>
                        <button type="button" className={styles.succeededButton}>
                            Succeeded
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.noActiveChallenge}>
                    <strong>Complete a cycle to receive a new challenge</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Level up by completing challenges
                    </p>
                </div>
            )}            
        </div>
    )
}