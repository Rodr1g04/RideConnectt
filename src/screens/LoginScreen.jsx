
import React, { useState } from 'react';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('passenger');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber) {
      alert('Por favor, insira seu número de telefone.');
      return;
    }

    setLoading(true);
    // Simular login
    setTimeout(() => {
      console.log('Login realizado:', { phoneNumber, userType });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      
      <input
        style={styles.input}
        type="tel"
        placeholder="Número de Telefone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      
      <div style={styles.radioContainer}>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="passenger"
            checked={userType === 'passenger'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Passageiro
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="driver"
            checked={userType === 'driver'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Motorista
        </label>
      </div>
      
      <button 
        style={styles.button} 
        onClick={handleLogin} 
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Entrar'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '300px',
  },
  radioContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '300px',
    marginBottom: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#075E54',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '300px',
  },
};

export default LoginScreen;
