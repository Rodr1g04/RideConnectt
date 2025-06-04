
import { useState } from 'react';
import { Copy, Share2, Calendar, Clock, Car, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DriverDashboard = () => {
  const [driverId] = useState('DRV-2024-8F3A');
  const [copied, setCopied] = useState(false);

  const upcomingRides = [
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

  const todaySchedule = [
    { time: "08:00", status: "livre" },
    { time: "09:00", status: "livre" },
    { time: "10:00", status: "livre" },
    { time: "11:00", status: "livre" },
    { time: "12:00", status: "livre" },
    { time: "13:00", status: "bloqueado" },
    { time: "14:00", status: "agendado", passenger: "Maria Silva" },
    { time: "15:00", status: "bloqueado" },
    { time: "16:00", status: "livre" },
    { time: "17:00", status: "livre" },
    { time: "18:00", status: "livre" },
  ];

  const copyDriverId = () => {
    navigator.clipboard.writeText(driverId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareDriverId = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu ID RideConnect',
        text: `Use meu ID para agendar corridas: ${driverId}`,
        url: window.location.origin
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="whatsapp-gradient p-2 rounded-lg">
              <Car className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard Motorista</h1>
              <p className="text-sm text-gray-600">João Silva</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Driver ID Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="w-5 h-5 mr-2 text-whatsapp" />
              Seu ID de Motorista
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-whatsapp mb-2">{driverId}</p>
                <p className="text-sm text-gray-600">
                  Compartilhe este ID com seus contatos para que possam agendar corridas
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={copyDriverId}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                {copied ? <CheckCircle className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
              <Button
                onClick={shareDriverId}
                className="flex-1 whatsapp-gradient text-white"
                size="sm"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2 text-whatsapp" />
              Agenda de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todaySchedule.map((slot) => (
                <div
                  key={slot.time}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    slot.status === 'agendado' 
                      ? 'bg-whatsapp/10 border-whatsapp/30' 
                      : slot.status === 'bloqueado'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 w-16">{slot.time}</span>
                    <div className={`w-3 h-3 rounded-full ml-3 ${
                      slot.status === 'agendado' 
                        ? 'bg-whatsapp' 
                        : slot.status === 'bloqueado'
                        ? 'bg-red-500'
                        : 'bg-gray-300'
                    }`}></div>
                  </div>
                  <div className="text-right">
                    {slot.status === 'agendado' && (
                      <span className="text-sm text-whatsapp font-medium">{slot.passenger}</span>
                    )}
                    {slot.status === 'bloqueado' && (
                      <span className="text-sm text-red-600">Bloqueado</span>
                    )}
                    {slot.status === 'livre' && (
                      <span className="text-sm text-gray-500">Disponível</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Rides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2 text-whatsapp" />
              Próximas Corridas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingRides.map((ride) => (
                <div key={ride.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{ride.passenger}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ride.status === 'confirmado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
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
    </div>
  );
};

export default DriverDashboard;
