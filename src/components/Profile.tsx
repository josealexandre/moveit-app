import styles from '../styles/components/Profile.module.css';

export const Profile = () => (
    <div className={styles.container}>
        <img src="https://github.com/josealexandre.png" alt="José Alexandre" />
        <div>
            <strong>José Alexandre</strong>
            <p>
                <img src="icons/level.svg" />
                Level 1
            </p>
        </div>
    </div>
)