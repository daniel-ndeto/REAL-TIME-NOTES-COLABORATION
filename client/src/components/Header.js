import React from 'react';

const Header = ({ user }) => {
  
  // header style
  const headerStyle = {
    background: 'linear-gradient(to right,rgb(160, 64, 230),rgb(238, 68, 238), #FF69B4)',
    color: 'white',
    padding: '40px 24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    borderBottom: '4px solid white',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '16px',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
  };

  const welcomeStyle = {
    fontSize: '1.5rem',
    fontStyle: 'italic',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0,0,0,0.4)'
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>RealTime Notes</h1>
      <h2>Brings your imagination to reality</h2>
      {user && (
        <p style={welcomeStyle}>
          Welcome, <span style={{ color: '#FFD700' }}>{user.username}</span>!
        </p>
      )}
    </header>
  );
};

export default Header;
