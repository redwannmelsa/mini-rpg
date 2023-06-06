import { usePlayer } from "../../context/PlayerContext";

const Player: React.FC = () => {
  const { level, hp, maxHP, damage, xp, requiredXP } = usePlayer();

  return (
    <div>
      <h2>Player</h2>
      <p>Level: {level}</p>
      <p>HP: {hp}/{maxHP}</p>
      <p>Damage: {damage}</p>
      <p>XP: {xp}/{requiredXP}</p>
    </div>
  );
};

export default Player;