import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export const Countdown = () => {
    const { 
        isActive, 
        isFinished, 
        minutes, 
        seconds, 
        startCountdown, 
        resetCountdown
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('');
    const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('');    

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