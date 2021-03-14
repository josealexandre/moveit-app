import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from '../contexts/ChallengeContext';

interface CountdownProviderProps {
    children: ReactNode;
}

interface CountdownContextValue {
    isActive: boolean;
    isFinished: boolean;
    minutes: number;
    seconds: number;
    startCountdown: () => void;
    resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextValue);

export const CountdownProvider = ({ children }: CountdownProviderProps) => {
    let countdownTimeout;
    
    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setActive] = useState(false);
    const [isFinished, setFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const startCountdown = () => {
        setActive(true);
    }
    
    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(0.05 * 60);
        setFinished(false);
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
        <CountdownContext.Provider 
            value={{ 
                isActive,
                isFinished,
                minutes,
                seconds,
                startCountdown,
                resetCountdown,
            }}>
            { children }
        </CountdownContext.Provider>
    )
}