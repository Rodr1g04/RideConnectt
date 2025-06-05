
import { useState, useEffect } from 'react';
import RideService from '../services/rideService';

const useRides = (userId) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRides = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await RideService.getRides(userId);
      if (response.success) {
        setRides(response.rides);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createRide = async (rideData) => {
    setLoading(true);
    try {
      const response = await RideService.createRide(rideData);
      if (response.success) {
        setRides(prev => [...prev, response.ride]);
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

  const updateRideStatus = async (rideId, status) => {
    setLoading(true);
    try {
      const response = await RideService.updateRideStatus(rideId, status);
      if (response.success) {
        setRides(prev => 
          prev.map(ride => 
            ride.id === rideId 
              ? { ...ride, status: response.ride.status }
              : ride
          )
        );
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

  useEffect(() => {
    fetchRides();
  }, [userId]);

  return {
    rides,
    loading,
    error,
    fetchRides,
    createRide,
    updateRideStatus
  };
};

export default useRides;
