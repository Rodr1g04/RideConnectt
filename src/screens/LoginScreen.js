import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('passenger');

  const handleLogin = async () => {
    if (!phoneNumber) {
      Alert.alert('Erro', 'Por favor, insira seu número de telefone.');
      return;
    }

    const result = await login(phoneNumber, userType);
    if (result.success) {
      // Navegar para a dashboard correta após o login
      if (userType === 'driver') {
        navigation.navigate('App', { screen: 'DriverDashboard' });
      } else {
        navigation.navigate('App', { screen: 'PassengerDashboard' });
      }
    } else {
      Alert.alert('Erro ao fazer login', result.error || 'Erro desconhecido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de Telefone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radio, userType === 'passenger' && styles.radioSelected]}
          onPress={() => setUserType('passenger')}
        >
          <Text style={userType === 'passenger' && styles.radioTextSelected}>Passageiro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radio, userType === 'driver' && styles.radioSelected]}
          onPress={() => setUserType('driver')}
        >
          <Text style={userType === 'driver' && styles.radioTextSelected}>Motorista</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radio: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#075E54',
    borderColor: '#075E54',
  },
  radioTextSelected: {
    color: 'white',
  },
  button: {
    backgroundColor: '#075E54',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
