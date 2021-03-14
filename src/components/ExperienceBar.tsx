import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/ExperienceBar.module.css';

export const ExperienceBar = () => {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

    const percentToNextLevel = Math.floor(currentExperience / experienceToNextLevel * 100);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}