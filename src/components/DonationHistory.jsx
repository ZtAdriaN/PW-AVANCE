import React, { useState } from 'react';

const DonationHistory = ({ donations }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedDonations = showAll ? donations : donations.slice(0, 5);
  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const topDonation = donations.length > 0 ? Math.max(...donations.map(d => d.amount)) : 0;

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `hace ${hours}h`;
    if (minutes > 0) return `hace ${minutes}m`;
    return 'ahora';
  };

  const getDonationSize = (amount) => {
    if (amount >= 500) return 'mega-donation';
    if (amount >= 200) return 'super-donation';
    if (amount >= 100) return 'big-donation';
    if (amount >= 50) return 'medium-donation';
    return 'small-donation';
  };

  const getTopDonators = () => {
    const donatorMap = {};
    donations.forEach(donation => {
      if (!donation.isAnonymous) {
        if (donatorMap[donation.fromUser]) {
          donatorMap[donation.fromUser] += donation.amount;
        } else {
          donatorMap[donation.fromUser] = donation.amount;
        }
      }
    });

    return Object.entries(donatorMap)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  };

  const topDonators = getTopDonators();

  return (
    <div className="donation-history">
      <div className="donation-stats">
        <h3>📊 Estadísticas de Donaciones</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{totalDonated.toLocaleString()}</div>
            <div className="stat-label">💎 Total Recaudado</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{donations.length}</div>
            <div className="stat-label">🎁 Donaciones</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{topDonation}</div>
            <div className="stat-label">👑 Mayor Donación</div>
          </div>
        </div>
      </div>

      {/* Top Donators */}
      {topDonators.length > 0 && (
        <div className="top-donators">
          <h4>🏆 Top Donadores</h4>
          <div className="donators-list">
            {topDonators.map(([name, amount], index) => (
              <div key={name} className={`donator-item rank-${index + 1}`}>
                <div className="donator-rank">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <div className="donator-info">
                  <span className="donator-name">{name}</span>
                  <span className="donator-amount">{amount} 💎</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Donations */}
      <div className="recent-donations">
        <div className="donations-header">
          <h4>💝 Donaciones Recientes</h4>
          {donations.length > 5 && (
            <button 
              className="toggle-button"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Ver menos' : `Ver todas (${donations.length})`}
            </button>
          )}
        </div>

        {donations.length === 0 ? (
          <div className="no-donations">
            <p>¡Sé el primero en donar! 💎</p>
          </div>
        ) : (
          <div className="donations-list">
            {displayedDonations.map(donation => (
              <div key={donation.id} className={`donation-item ${getDonationSize(donation.amount)}`}>
                <div className="donation-avatar">
                  {donation.isAnonymous ? '🥷' : '👤'}
                </div>
                <div className="donation-details">
                  <div className="donation-header-info">
                    <span className="donor-name">
                      {donation.fromUser}
                      {donation.amount >= 500 && <span className="vip-badge">👑</span>}
                    </span>
                    <span className="donation-time">{formatTime(donation.timestamp)}</span>
                  </div>
                  <div className="donation-amount-info">
                    <span className="amount">{donation.amount} 💎</span>
                  </div>
                  {donation.message && (
                    <div className="donation-message">"{donation.message}"</div>
                  )}
                </div>
                <div className="donation-effect">
                  {donation.amount >= 500 ? '🎆' : 
                   donation.amount >= 200 ? '⭐' :
                   donation.amount >= 100 ? '✨' :
                   donation.amount >= 50 ? '💫' : '💎'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Donation Goal (Optional) */}
        <div className="donation-goal">
          <div className="goal-header">
            <span>🎯 Meta del Stream: 2,000 💎</span>
          </div>
          <div className="goal-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min((totalDonated / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {totalDonated.toLocaleString()} / 2,000 💎 ({Math.round((totalDonated / 2000) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;