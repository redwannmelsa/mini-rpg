import * as React from 'react'
import { createContext, useContext, useState } from 'react'

interface PlayerContextProps {
  level: number;
  hp: number;
  maxHP: number;
  damage: number;
  xp: number;
  requiredXP: number;
  increaseLevel: () => void;
  increaseXP: () => void;
  playerWasAttacked: (attackDmg: number) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [hp, setHP] = useState(80);
  const [maxHP, setMaxHP] = useState(80)
  const [damage, setDamage] = useState(15);
  const [xp, setXP] = useState(0);
  const [requiredXP, setRequiredXP] = useState(2);

  const increaseLevel = () => {
    setLevel(level + 1);
    setMaxHP(maxHP + 5)
    setHP(maxHP + 5);
    setDamage(damage + 2);
    setRequiredXP(requiredXP + 1);
  };

  const increaseXP = () => {
    if (xp + 1 >= requiredXP) {
      increaseLevel();
      setXP(0);
    } else {
      setXP(xp + 1);
    }
  };

  const playerWasAttacked = (attackDmg: number) => {
    setHP(hp - attackDmg)
  }

  return (
    <PlayerContext.Provider
      value={{
        level,
        hp,
        maxHP,
        damage,
        xp,
        requiredXP,
        increaseLevel,
        increaseXP,
        playerWasAttacked
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = (): PlayerContextProps => {
  const playerContext = useContext(PlayerContext);
  if (!playerContext) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return playerContext;
};

export { PlayerProvider, usePlayer };