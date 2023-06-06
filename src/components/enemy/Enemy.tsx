import * as React from 'react'
import { useState, useEffect } from 'react'
import { usePlayer } from '../../context/PlayerContext';
import './enemy.css'


const Enemy: React.FC = () => {
  const [enemyHp, setEnemyHp] = useState(0);
  const [enemyDmg, setEnemyDmg] = useState(0);
  const { increaseXP, playerWasAttacked, damage } = usePlayer()

  useEffect(() => {
    generateRandomEnemy()
  }, [])


  const generateRandomEnemy = () => {
    if (Math.random() < 0.1) {
      setEnemyDmg(7)
      setEnemyHp(100)
    } else {
      generateRandomHP()
      generateRandomenemyDmg()
    }
  }

  const generateRandomHP = () => {
    setEnemyHp(Math.floor(Math.random() * (30 - 15 + 1) + 15))
  }

  const generateRandomenemyDmg = () => {
    setEnemyDmg(Math.floor(Math.random() * (5 - 2 + 1) + 2))
  }

  const enemyDefeated = () => {
    deathAnimation()
    generateRandomEnemy()
    increaseXP()
  };

  const deathAnimation = () => {
    const enemyElement = document.getElementById('enemy');
    if (enemyElement) {
      enemyElement.classList.add('flashing');
      setTimeout(() => {
        enemyElement.classList.remove('flashing');
      }, 1000);
    }
  };

  const handleEnemyAttacked = async () => {
    setEnemyHp(enemyHp - damage)
    if (enemyHp - damage <= 0) enemyDefeated()
    else playerWasAttacked(enemyDmg)
  }

  return (
    <div id='enemy'>
      <h2>Enemy</h2>
      <p>HP: {enemyHp}</p>
      <p>Attack Damage: {enemyDmg}</p>
      <button onClick={handleEnemyAttacked}>Attack enemy</button>
    </div>
  );
};

export default Enemy;