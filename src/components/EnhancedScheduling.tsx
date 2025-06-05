
import { useState } from 'react';
import { MapPin, Star, Calculator, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FavoriteLocation {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'other';
}

interface SchedulingProps {
  driverId: string;
  driverName: string;
  pricePerKm: number;
  onSchedule: (schedulingData: any) => void;
  onClose: () => void;
}

const EnhancedScheduling = ({ driverId, driverName, pricePerKm, onSchedule, onClose }: SchedulingProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  const [showChat, setShowChat] = useState(false);
  
  const [favoriteLocations] = useState<FavoriteLocation[]>([
    { id: '1', name: 'Casa', address: 'Rua das Flores, 123', type: 'home' },
    { id: '2', name: 'Trabalho', address: 'Av. Paulista, 1000', type: 'work' },
    { id: '3', name: 'Shopping Center', address: 'Shopping Vila Olímpia', type: 'other' }
  ]);

  const availableSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const estimatedPrice = estimatedDistance * pricePerKm;

  // Simular cálculo de distância (seria integrado com API de mapas)
  const calculateDistance = (from: string, to: string) => {
    if (from && to) {
      // Simulação: distância aleatória entre 5-25 km
      const distance = Math.floor(Math.random() * 20) + 5;
      setEstimatedDistance(distance);
    } else {
      setEstimatedDistance(0);
    }
  };

  const selectFavoriteLocation = (location: FavoriteLocation, isDestination: boolean) => {
    if (isDestination) {
      setToLocation(location.address);
    } else {
      setFromLocation(location.address);
    }
    calculateDistance(isDestination ? fromLocation : location.address, isDestination ? location.address : toLocation);
  };

  const handleSchedule = () => {
    const schedulingData = {
      driverId,
      date: selectedDate,
      time: selectedTime,
      from: fromLocation,
      to: toLocation,
      notes,
      estimatedDistance,
      estimatedPrice
    };
    onSchedule(schedulingData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Agendar com {driverName}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="text-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>

          {showChat && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm">Chat Direto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">{driverName}:</p>
                    <p>Olá! Pode me passar mais detalhes sobre o local exato?</p>
                  </div>
                  <Input placeholder="Digite sua mensagem..." className="text-sm" />
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSchedule(); }} className="space-y-4">
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
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2 text-sm rounded border ${
                        selectedTime === slot
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

            {/* Locais Favoritos */}
            <div>
              <Label>Locais Favoritos</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {favoriteLocations.map((location) => (
                  <div key={location.id} className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selectFavoriteLocation(location, false)}
                      className="flex-1 justify-start text-xs"
                    >
                      {location.type === 'home' ? '🏠' : location.type === 'work' ? '🏢' : '📍'} {location.name}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => selectFavoriteLocation(location, true)}
                      className="text-whatsapp"
                    >
                      <MapPin className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="from">Origem</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="from"
                  type="text"
                  value={fromLocation}
                  onChange={(e) => {
                    setFromLocation(e.target.value);
                    calculateDistance(e.target.value, toLocation);
                  }}
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
                  value={toLocation}
                  onChange={(e) => {
                    setToLocation(e.target.value);
                    calculateDistance(fromLocation, e.target.value);
                  }}
                  placeholder="Local de destino"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Estimativa de Preço */}
            {estimatedDistance > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calculator className="w-4 h-4 text-whatsapp" />
                    <div>
                      <p className="font-medium">Estimativa</p>
                      <p className="text-gray-600">
                        {estimatedDistance} km × R$ {pricePerKm.toFixed(2)} = R$ {estimatedPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">*Valor estimado, confirme com o motorista</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <Label htmlFor="notes">Observações</Label>
              <Input
                id="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Levar bagagem extra, animal de estimação..."
                className="mt-1"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 whatsapp-gradient text-white"
                disabled={!selectedDate || !selectedTime || !fromLocation || !toLocation}
              >
                Solicitar Agendamento
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedScheduling;
