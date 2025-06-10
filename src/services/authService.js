
class AuthService {
  static async login(phoneNumber, userType) {
    try {
      console.log('Fazendo login:', { phoneNumber, userType });
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        user: {
          id: Date.now(),
          phone: phoneNumber,
          type: userType,
          name: userType === 'driver' ? 'João Silva' : 'Maria Santos'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async logout() {
    try {
      console.log('Fazendo logout');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default AuthService;
