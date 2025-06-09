
class RideService {
  static async getRides(userId) {
    try {
      console.log('Buscando corridas para o usuário:', userId);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados simulados de corridas
      const mockRides = [
        {
          id: 1,
          userId: userId,
          from: 'Centro',
          to: 'Shopping',
          date: '2024-01-15',
          time: '14:00',
          status: 'confirmado',
          price: 25.00
        },
        {
          id: 2,
          userId: userId,
          from: 'Aeroporto',
          to: 'Hotel',
          date: '2024-01-16',
          time: '09:00',
          status: 'pendente',
          price: 45.00
        }
      ];
      
      return {
        success: true,
        rides: mockRides
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async createRide(rideData) {
    try {
      console.log('Criando nova corrida:', rideData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRide = {
        id: Date.now(),
        ...rideData,
        status: 'pendente',
        createdAt: new Date().toISOString()
      };
      
      return {
        success: true,
        ride: newRide
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async updateRideStatus(rideId, status) {
    try {
      console.log('Atualizando status da corrida:', { rideId, status });
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        ride: {
          id: rideId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default RideService;
