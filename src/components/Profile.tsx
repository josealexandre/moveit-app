import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext'

import styles from '../styles/components/Profile.module.css';

export const Profile = () => {
    const { level } = useContext(ChallengeContext);
    
    return (
        <div className={styles.container}>
            <img src="https://github.com/josealexandre.png" alt="José Alexandre" />
            <div>
                <strong>José Alexandre</strong>
                <p>
                    <img src="icons/level.svg" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}