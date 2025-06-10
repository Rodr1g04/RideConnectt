
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileSelectionScreen from '../screens/ProfileSelectionScreen';
import DriverDashboard from '../screens/DriverDashboard';
import PassengerDashboard from '../screens/PassengerDashboard';
import CustomDrawer from '../components/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
  </Stack.Navigator>
);

const AppDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="DriverDashboard" component={DriverDashboard} />
    <Drawer.Screen name="PassengerDashboard" component={PassengerDashboard} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
