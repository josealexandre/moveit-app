import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { LevelUpModal } from '../components/LevelUpModal';

import challenges from '../../challenges.json';

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    completedChallenges: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextValue {
    level: number;
    currentExperience: number;
    completedChallenges: number;
    currentChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextValue);

export const ChallengeProvider = ({ children, ...rest }: ChallengeProviderProps) => {
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
    const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('currentExperience', currentExperience.toString());
        Cookies.set('level', level.toString());
        Cookies.set('completedChallenges', completedChallenges.toString());
    }, [currentExperience, level, completedChallenges])

    const levelUp = () => {
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    }

    const closeLevelUpModal = () => {
        setIsLevelModalOpen(false);
    }
    
    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setCurrentChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New challenge!', {
                body: `Earn ${challenge.amount}xp`,
            })
        }
    }

    const resetChallenge = () => {
        setCurrentChallenge(null);
    }

    const completeChallenge = () => {
        if (!currentChallenge) {
            return;
        }

        const { amount } = currentChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setCompletedChallenges(completedChallenges + 1);
        setCurrentChallenge(null);
    }

    return (
        <ChallengeContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                completedChallenges, 
                currentChallenge,
                experienceToNextLevel,
                levelUp, 
                startNewChallenge, 
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}>
            { children }

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}