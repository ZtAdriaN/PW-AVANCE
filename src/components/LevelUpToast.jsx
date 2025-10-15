import React from "react";

const LevelUpToast = ({ level }) => {
  return (
    <div className="levelup-toast">
      <div className="levelup-content">
        <div className="levelup-emoji" aria-label="Level up">🎉</div>
        <div className="levelup-text">
          <div className="levelup-title">¡Has subido de nivel!</div>
          <div className="levelup-level">Nivel {level}</div>
        </div>
      </div>
      <div className="levelup-glow" />
    </div>
  );
};

export default LevelUpToast;