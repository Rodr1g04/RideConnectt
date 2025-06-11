
import { useState, useEffect } from 'react';
import { Copy, Share2, Calendar, Clock, Car, Users, CheckCircle, MessageCircle, Settings, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DriverGroups from '@/components/DriverGroups';

interface ScheduleSlot {
  time: string;
  status: 'livre' | 'agendado' | 'bloqueado';
  passenger?: string;
  id?: string;
}

interface Ride {
  id: number;
  passenger: string;
  date: string;
  time: string;
  from: string;
  to: string;
  status: 'confirmado' | 'pendente' | 'concluido';
  price?: number;
}

const DriverDashboard = () => {
  const [driverId] = useState('DRV-2024-8F3A');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'groups'>('schedule');
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([
    { time: "08:00", status: "livre" },
    { time: "09:00", status: "livre" },
    { time: "10:00", status: "livre" },
    { time: "11:00", status: "livre" },
    { time: "12:00", status: "livre" },
    { time: "13:00", status: "bloqueado" },
    { time: "14:00", status: "agendado", passenger: "Maria Silva", id: "ride-1" },
    { time: "15:00", status: "bloqueado" },
    { time: "16:00", status: "livre" },
    { time: "17:00", status: "livre" },
    { time: "18:00", status: "livre" },
  ]);

  const [upcomingRides, setUpcomingRides] = useState<Ride[]>([
    {
      id: 1,
      passenger: "Maria Silva",
      date: "2025-01-15",
      time: "14:00",
      from: "Centro",
      to: "Shopping",
      status: "confirmado",
      price: 25.00
    },
    {
      id: 2,
      passenger: "João Costa",
      date: "2025-01-16",
      time: "09:00",
      from: "Aeroporto",
      to: "Hotel",
      status: "pendente",
      price: 45.00
    }
  ]);

  const [newRide, setNewRide] = useState({
    passenger: '',
    date: '',
    time: '',
    from: '',
    to: '',
    price: ''
  });

  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const copyDriverId = () => {
    navigator.clipboard.writeText(driverId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareDriverId = () => {
    const message = `Olá! Para agendar corridas comigo, use meu ID no RideConnect: ${driverId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const updateSlotStatus = (time: string, status: 'livre' | 'bloqueado') => {
    setScheduleSlots(prev => prev.map(slot => 
      slot.time === time 
        ? { ...slot, status, passenger: undefined, id: undefined }
        : slot
    ));
    setEditingSlot(null);
  };

  const addNewRide = () => {
    if (!newRide.passenger || !newRide.date || !newRide.time || !newRide.from || !newRide.to) {
      return;
    }

    const ride: Ride = {
      id: Date.now(),
      passenger: newRide.passenger,
      date: newRide.date,
      time: newRide.time,
      from: newRide.from,
      to: newRide.to,
      status: 'pendente',
      price: parseFloat(newRide.price) || 0
    };

    setUpcomingRides(prev => [...prev, ride]);
    
    // Atualizar schedule se for hoje
    if (newRide.date === selectedDate) {
      setScheduleSlots(prev => prev.map(slot =>
        slot.time === newRide.time
          ? { ...slot, status: 'agendado', passenger: newRide.passenger, id: `ride-${ride.id}` }
          : slot
      ));
    }

    setNewRide({ passenger: '', date: '', time: '', from: '', to: '', price: '' });
  };

  const updateRideStatus = (rideId: number, status: 'confirmado' | 'pendente' | 'concluido') => {
    setUpcomingRides(prev => prev.map(ride =>
      ride.id === rideId ? { ...ride, status } : ride
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'concluido': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEarnings = upcomingRides
    .filter(ride => ride.status === 'concluido')
    .reduce((sum, ride) => sum + (ride.price || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="whatsapp-gradient p-2 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Dashboard Motorista</h1>
                <p className="text-sm text-gray-600">João Silva</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="p-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-whatsapp">{upcomingRides.filter(r => r.status === 'confirmado').length}</p>
              <p className="text-xs text-gray-600">Confirmadas</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{upcomingRides.filter(r => r.status === 'pendente').length}</p>
              <p className="text-xs text-gray-600">Pendentes</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">R$ {totalEarnings.toFixed(2)}</p>
              <p className="text-xs text-gray-600">Ganhos</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'schedule'
                ? 'bg-white text-whatsapp shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-1" />
            Agenda
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'groups'
                ? 'bg-white text-whatsapp shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 inline mr-1" />
            Grupos
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-6 space-y-6 mt-4">
        {activeTab === 'schedule' && (
          <>
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
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="w-5 h-5 mr-2 text-whatsapp" />
                    Agenda de Hoje
                  </CardTitle>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto text-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheduleSlots.map((slot) => (
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
                      <div className="flex items-center space-x-2">
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
                        {slot.status !== 'agendado' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Horário {slot.time}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Button
                                  onClick={() => updateSlotStatus(slot.time, 'livre')}
                                  variant={slot.status === 'livre' ? 'default' : 'outline'}
                                  className="w-full"
                                >
                                  Disponível
                                </Button>
                                <Button
                                  onClick={() => updateSlotStatus(slot.time, 'bloqueado')}
                                  variant={slot.status === 'bloqueado' ? 'destructive' : 'outline'}
                                  className="w-full"
                                >
                                  Bloquear
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add New Ride */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Plus className="w-5 h-5 mr-2 text-whatsapp" />
                  Nova Corrida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="passenger">Passageiro</Label>
                      <Input
                        id="passenger"
                        value={newRide.passenger}
                        onChange={(e) => setNewRide({...newRide, passenger: e.target.value})}
                        placeholder="Nome"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newRide.price}
                        onChange={(e) => setNewRide({...newRide, price: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newRide.date}
                        onChange={(e) => setNewRide({...newRide, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Horário</Label>
                      <Select value={newRide.time} onValueChange={(value) => setNewRide({...newRide, time: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha" />
                        </SelectTrigger>
                        <SelectContent>
                          {scheduleSlots.filter(slot => slot.status === 'livre').map(slot => (
                            <SelectItem key={slot.time} value={slot.time}>{slot.time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="from">Origem</Label>
                      <Input
                        id="from"
                        value={newRide.from}
                        onChange={(e) => setNewRide({...newRide, from: e.target.value})}
                        placeholder="Local de saída"
                      />
                    </div>
                    <div>
                      <Label htmlFor="to">Destino</Label>
                      <Input
                        id="to"
                        value={newRide.to}
                        onChange={(e) => setNewRide({...newRide, to: e.target.value})}
                        placeholder="Local de chegada"
                      />
                    </div>
                  </div>
                  <Button onClick={addNewRide} className="w-full whatsapp-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Corrida
                  </Button>
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
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(ride.status)}>
                            {ride.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 text-whatsapp" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>📅 {new Date(ride.date).toLocaleDateString('pt-BR')} às {ride.time}</p>
                        <p>📍 {ride.from} → {ride.to}</p>
                        <p>💰 R$ {ride.price?.toFixed(2)}</p>
                      </div>
                      {ride.status === 'pendente' && (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => updateRideStatus(ride.id, 'confirmado')}
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Confirmar
                          </Button>
                          <Button
                            onClick={() => setUpcomingRides(prev => prev.filter(r => r.id !== ride.id))}
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Recusar
                          </Button>
                        </div>
                      )}
                      {ride.status === 'confirmado' && (
                        <Button
                          onClick={() => updateRideStatus(ride.id, 'concluido')}
                          size="sm"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Marcar como Concluída
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'groups' && <DriverGroups />}
      </div>
    </div>
  );
};

export default DriverDashboard;
