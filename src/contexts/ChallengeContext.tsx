import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json';

interface ChallengeProviderProps {
    children: ReactNode;
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
}

export const ChallengeContext = createContext({} as ChallengeContextValue);

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [completedChallenges, setCompletedChallenges] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    const levelUp = () => {
        setLevel(level + 1);
    }
    
    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setCurrentChallenge(challenge);
    }

    const resetChallenge = () => {
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
            }}>
            { children }
        </ChallengeContext.Provider>
    )
}