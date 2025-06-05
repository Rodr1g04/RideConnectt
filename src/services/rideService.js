
class RideService {
  static async createRide(rideData) {
    try {
      console.log('Criando corrida:', rideData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        ride: {
          id: Date.now(),
          ...rideData,
          status: 'created',
          createdAt: new Date()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getRides(userId) {
    try {
      console.log('Buscando corridas para usuário:', userId);
      
      // Simular dados de corridas
      const mockRides = [
        {
          id: 1,
          passenger: "Maria Silva",
          date: "2025-01-15",
          time: "14:00",
          from: "Centro",
          to: "Shopping",
          status: "confirmado"
        },
        {
          id: 2,
          passenger: "João Costa",
          date: "2025-01-16",
          time: "09:00",
          from: "Aeroporto",
          to: "Hotel",
          status: "pendente"
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

  static async updateRideStatus(rideId, status) {
    try {
      console.log('Atualizando status da corrida:', { rideId, status });
      
      return {
        success: true,
        ride: {
          id: rideId,
          status: status,
          updatedAt: new Date()
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
