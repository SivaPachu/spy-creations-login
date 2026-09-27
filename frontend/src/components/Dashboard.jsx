import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  const stats = [
    { label: 'Active Projects', value: '38', change: '+2 this week' },
    { label: 'Storage Used', value: '42.8 GB', change: '71.47% of 150 GB' },
    { label: 'API Requests', value: '128.4k', change: '+14% vs last month' },
    { label: 'Team Members', value: '8', change: '2 pending invites' },
  ];

  const recentActivity = [
    { id: 1, action: 'Deployed v2.4 updates to production', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Created new project "Cyberpunk UI Kit"', time: '5 hours ago', status: 'completed' },
    { id: 3, action: 'Updated security credentials', time: '1 day ago', status: 'warning' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="brand-badge-group">
          <h2 className="brand-logo-sm">SPY CREATIONS</h2>
          <span className="badge">Pro Workspace</span>
        </div>
        <div className="user-profile-summary">
          <div className="avatar-circle">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-details-mini">
            <span className="user-name-text">{user?.name || 'User'}</span>
            <span className="user-email-text">{user?.email}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-body">
        <div className="welcome-banner">
          <h1>Welcome back, {user?.name || 'Creator'}! 👋</h1>
          <p>Here is what's happening across your SPY Creations projects today.</p>
        </div>

        <section className="stats-grid">
          {stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
              <span className="stat-change">{stat.change}</span>
            </div>
          ))}
        </section>

        <div className="dashboard-grid-2col">
          <div className="dashboard-card-panel">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className={`status-indicator ${item.status}`} />
                  <div className="activity-details">
                    <p className="activity-text">{item.action}</p>
                    <span className="activity-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card-panel">
            <h3>Account Overview</h3>
            <div className="user-info-list">
              <div className="info-row">
                <span className="info-label">Account Name</span>
                <span className="info-val">{user?.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email Address</span>
                <span className="info-val">{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Role Privilege</span>
                <span className="info-val highlight">Administrator</span>
              </div>
              <div className="info-row">
                <span className="info-label">Session Status</span>
                <span className="info-val active-status">● Active Session</span>
              </div>
            </div>

            <div className="action-buttons-group">
              <button className="primary-action-btn">Create ➕</button>
              <button className="secondary-action-btn">Manage Team</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;