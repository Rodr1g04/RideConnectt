
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSelectionScreen = () => {
  const navigate = useNavigate();

  const handleDriverSelect = () => {
    console.log('Motorista selecionado');
    navigate('/driver-dashboard');
  };

  const handlePassengerSelect = () => {
    console.log('Passageiro selecionado');
    navigate('/passenger-dashboard');
  };

  const handleLoginLink = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>RideConnect</h2>
        <p style={styles.subtitle}>Escolha seu tipo de perfil</p>
      </div>

      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={handlePassengerSelect}>
          <div style={styles.buttonContent}>
            <h3>Sou Passageiro</h3>
            <p>Quero agendar corridas</p>
          </div>
        </button>

        <button style={styles.button} onClick={handleDriverSelect}>
          <div style={styles.buttonContent}>
            <h3>Sou Motorista</h3>
            <p>Quero oferecer corridas</p>
          </div>
        </button>
      </div>

      <p style={styles.loginLink} onClick={handleLoginLink}>
        Já tenho conta - Fazer Login
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#777',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '15px',
    border: '2px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    width: '100%',
  },
  buttonContent: {
    textAlign: 'left',
  },
  loginLink: {
    color: '#5cb85c',
    marginTop: '20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ProfileSelectionScreen;
