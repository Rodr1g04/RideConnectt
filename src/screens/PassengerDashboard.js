
import React from 'react';

const PassengerDashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard Passageiro</h2>
      <p>Bem-vindo, Passageiro!</p>
      
      <div style={styles.infoCard}>
        <h3>Suas Corridas</h3>
        <p>Nenhuma corrida agendada</p>
      </div>
      
      <div style={styles.infoCard}>
        <h3>Buscar Corridas</h3>
        <button style={styles.button}>Procurar Motorista</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: '20px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '300px',
  },
  button: {
    backgroundColor: '#25D366',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default PassengerDashboard;
