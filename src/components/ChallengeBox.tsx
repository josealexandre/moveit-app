import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
    const hasActiveChallenge = true;

    return (
        <div className={styles.container}>
            { hasActiveChallenge ? (
                <div className={styles.activeChallenge}>
                    <header>Earn 400 xp</header>
                    <main>
                        <img src="icons/body.svg" alt="work out" />
                        <strong>New challenge!</strong>
                        <p>It's time, Fulano! Get up and walk for three minutes. Strech your arms and legs to stay healthy. Let's go!</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.succeededButton}>Succeeded</button>
                        <button type="button" className={styles.failedButton}>Failed</button>
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