
import React from 'react';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      // Para React web, podemos usar window.location ou react-router
      window.location.href = '/';
    } else {
      alert('Erro ao fazer logout');
    }
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>RideConnect</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ddd',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  logoutButton: {
    color: 'blue',
    fontSize: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Header;
