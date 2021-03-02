import { createContext, ReactNode, useState } from 'react';

interface ChallengeProviderProps {
    children: ReactNode;
}

interface ChallengeContextValue {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextValue);

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {
    const [level, setLevel] = useState(0);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const levelUp = () => {
        setLevel(level + 1);
    }
    
    const startNewChallenge = () => {
        console.log('new challenge');
    }

    return (
        <ChallengeContext.Provider value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge }}>
            { children }
        </ChallengeContext.Provider>
    )
}