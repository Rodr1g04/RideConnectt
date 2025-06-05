
import { useState, useEffect } from 'react';
import AuthService from '../services/authService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (phoneNumber, userType) => {
    setLoading(true);
    try {
      const response = await AuthService.login(phoneNumber, userType);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await AuthService.logout();
      if (response.success) {
        setUser(null);
        setIsAuthenticated(false);
      }
      return response;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout
  };
};

export default useAuth;
