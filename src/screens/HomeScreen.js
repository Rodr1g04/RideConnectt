
import React from 'react';
import Header from '../components/Header';

const HomeScreen = () => {
  const handleLogin = () => {
    console.log('Navegar para Login');
  };

  const handleRegister = () => {
    console.log('Navegar para Cadastro');
  };

  return (
    <div style={styles.container}>
      <Header title="RideConnect" />
      <div style={styles.content}>
        <h2 style={styles.title}>Bem-vindo ao RideConnect!</h2>
        <p style={styles.subtitle}>Encontre caronas e compartilhe viagens.</p>

        <button style={styles.button} onClick={handleLogin}>
          Fazer Login
        </button>

        <button style={styles.button} onClick={handleRegister}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#4a4a4a',
  },
  subtitle: {
    fontSize: '16px',
    color: '#777',
    marginBottom: '20px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#25D366',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    margin: '15px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: '200px',
  },
};

export default HomeScreen;
