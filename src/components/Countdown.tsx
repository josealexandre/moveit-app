import { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
    let countdownTimeout;
    
    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setActive] = useState(false);
    const [isFinished, setFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('');
    const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('');

    const startCountdown = () => {
        setActive(true);
    }
    
    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(0.05 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }

        if (isActive && time === 0) {
            setFinished(true);
            setActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            { isFinished ? (
                <button 
                    disabled
                    type="button"
                    className={`${styles.countdownButton}`}
                >
                    Finished cycle
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
                            onClick={resetCountdown}
                        >
                            Cancel
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton} 
                            onClick={startCountdown}
                        >
                            Start a new cycle
                        </button>
                    )}
                </>         
            )}
             
        </div>
    )
}