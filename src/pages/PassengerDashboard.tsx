
import { useState } from 'react';
import { Calendar, Clock, Plus, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PassengerDashboard = () => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    time: ''
  });

  const myRides = [
    {
      id: 1,
      driver: "João Silva",
      date: "2025-01-15",
      time: "14:00",
      from: "Centro",
      to: "Shopping",
      status: "confirmado"
    }
  ];

  const driverInfo = {
    id: 'DRV-2024-8F3A',
    name: 'João Silva',
    vehicle: 'Honda Civic Prata 2020',
    pricePerKm: 2.50,
    rating: 4.9
  };

  // Horários disponíveis para o dia selecionado
  const availableSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Agendamento:', { ...formData, date: selectedDate });
    setShowScheduleForm(false);
    setFormData({ from: '', to: '', time: '' });
    setSelectedDate('');
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agendar Corrida</h3>
              
              <form onSubmit={handleSchedule} className="space-y-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="mt-1"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <Label>Horários Disponíveis</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({...formData, time: slot})}
                          className={`p-2 text-sm rounded border ${
                            formData.time === slot
                              ? 'bg-whatsapp text-white border-whatsapp'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-whatsapp'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="from">Origem</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="from"
                      type="text"
                      value={formData.from}
                      onChange={(e) => setFormData({...formData, from: e.target.value})}
                      placeholder="Local de origem"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="to">Destino</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="to"
                      type="text"
                      value={formData.to}
                      onChange={(e) => setFormData({...formData, to: e.target.value})}
                      placeholder="Local de destino"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowScheduleForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 whatsapp-gradient text-white"
                    disabled={!selectedDate || !formData.time}
                  >
                    Agendar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDashboard;
