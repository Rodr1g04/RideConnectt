
import React from 'react';

const Header = ({ title }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title || 'RideConnect'}</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#075E54',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
};

export default Header;
