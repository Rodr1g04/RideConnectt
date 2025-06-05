
import { useState } from 'react';
import { Calendar, Clock, Plus, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedScheduling from '@/components/EnhancedScheduling';

const PassengerDashboard = () => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const myRides = [
    {
      id: 1,
      driver: "João Silva",
      date: "2025-01-15",
      time: "14:00",
      from: "Centro",
      to: "Shopping",
      status: "confirmado",
      estimatedPrice: 25.00
    }
  ];

  const driverInfo = {
    id: 'DRV-2024-8F3A',
    name: 'João Silva',
    vehicle: 'Honda Civic Prata 2020',
    pricePerKm: 2.50,
    rating: 4.9
  };

  const handleSchedule = (schedulingData: any) => {
    console.log('Novo agendamento:', schedulingData);
    setShowScheduleForm(false);
    // Aqui seria integrado com backend para salvar o agendamento
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Dashboard Passageiro</h1>
                <p className="text-sm text-gray-600">Maria Santos</p>
              </div>
            </div>
            <Button
              onClick={() => setShowScheduleForm(true)}
              size="sm"
              className="whatsapp-gradient text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agendar
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Driver Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="w-5 h-5 mr-2 text-whatsapp" />
              Seu Motorista
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 whatsapp-gradient rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{driverInfo.name}</h3>
                <p className="text-sm text-gray-600">{driverInfo.vehicle}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-sm text-gray-500">⭐ {driverInfo.rating}</span>
                  <span className="text-sm text-gray-500">R$ {driverInfo.pricePerKm}/km</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Rides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2 text-whatsapp" />
              Minhas Corridas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myRides.map((ride) => (
                <div key={ride.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{ride.driver}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {ride.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📅 {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}</p>
                    <p>📍 {ride.from} → {ride.to}</p>
                    <p>💰 Estimado: R$ {ride.estimatedPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Schedule Modal */}
      {showScheduleForm && (
        <EnhancedScheduling
          driverId={driverInfo.id}
          driverName={driverInfo.name}
          pricePerKm={driverInfo.pricePerKm}
          onSchedule={handleSchedule}
          onClose={() => setShowScheduleForm(false)}
        />
      )}
    </div>
  );
};

export default PassengerDashboard;
