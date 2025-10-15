import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../levelup.css';

const LevelUpPopup = () => {
  const { levelUpInfo, clearLevelUpInfo, user } = useAuth();

  useEffect(() => {
    if (!levelUpInfo) return;
    const timer = setTimeout(() => clearLevelUpInfo(), 4000);
    return () => clearTimeout(timer);
  }, [levelUpInfo, clearLevelUpInfo]);

  if (!levelUpInfo) return null;

  return (
    <div className="levelup-popup">
      <div className="levelup-card">
        <div className="levelup-emoji">🎉✨</div>
        <div className="levelup-text">
          <div className="levelup-title">¡Subiste de nivel!</div>
          <div className="levelup-level">Nivel {user?.level}</div>
        </div>
        <div className="levelup-glow" />
      </div>
    </div>
  );
};

export default LevelUpPopup;