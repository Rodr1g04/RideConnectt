import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileSelectionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/car-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>RideConnect</Text>
        <Text style={styles.subtitle}>Escolha seu tipo de perfil</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.passengerButton]}
          onPress={() => navigation.navigate('RegisterPassenger')}
        >
          <Image
            source={require('../../assets/users-icon.png')}
            style={styles.buttonIcon}
          />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Sou Passageiro</Text>
            <Text style={styles.buttonSubtitle}>Quero agendar corridas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.driverButton]}
          onPress={() => navigation.navigate('RegisterDriver')}
        >
          <Image
            source={require('../../assets/car-icon.png')}
            style={styles.buttonIcon}
          />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Sou Motorista</Text>
            <Text style={styles.buttonSubtitle}>Quero oferecer corridas</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já tenho conta - Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  passengerButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  driverButton: {
    backgroundColor: '#5cb85c',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
  },
  loginLink: {
    color: '#5cb85c',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ProfileSelectionScreen;
