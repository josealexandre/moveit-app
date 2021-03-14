import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/LevelUpModal.module.css';

export const LevelUpModal = () => {
    const { level, closeLevelUpModal } = useContext(ChallengeContext);
    
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>        

                <strong>Congratulations!</strong>
                <p>You reached a new level</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Close"></img>
                </button>
            </div>
        </div>
    )
}