
import { useState } from 'react';
import { MessageCircle, MapPin, Clock, Users, Car, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('rides');

  const drivers = [
    { 
      id: 1, 
      name: "João Silva", 
      phone: "(11) 99999-1111",
      status: "Online", 
      distance: "2 km",
      rating: 4.9,
      lastSeen: "Agora"
    },
    { 
      id: 2, 
      name: "Maria Santos", 
      phone: "(11) 99999-2222",
      status: "Disponível", 
      distance: "5 km",
      rating: 4.8,
      lastSeen: "5 min"
    },
    { 
      id: 3, 
      name: "Pedro Costa", 
      phone: "(11) 99999-3333",
      status: "Online", 
      distance: "1 km",
      rating: 5.0,
      lastSeen: "Agora"
    }
  ];

  const upcomingRides = [
    {
      id: 1,
      driver: "João Silva",
      from: "Centro",
      to: "Shopping Iguatemi",
      date: "Hoje",
      time: "15:30",
      status: "Confirmada"
    },
    {
      id: 2,
      driver: "Maria Santos",
      from: "Casa",
      to: "Aeroporto",
      date: "Amanhã",
      time: "08:00",
      status: "Pendente"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Dashboard */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="whatsapp-gradient p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RideConnect</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <div className="w-8 h-8 bg-whatsapp rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação do Dashboard */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('rides')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'rides' 
                ? 'bg-white text-whatsapp shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Minhas Corridas
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drivers' 
                ? 'bg-white text-whatsapp shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Motoristas Conhecidos
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'schedule' 
                ? 'bg-white text-whatsapp shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Agendar Corrida
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'rides' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Corridas Próximas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-whatsapp" />
                Próximas Corridas
              </h2>
              <div className="space-y-4">
                {upcomingRides.map((ride) => (
                  <div key={ride.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{ride.driver}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ride.status === 'Confirmada' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ride.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-2" />
                        {ride.from} → {ride.to}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {ride.date}, {ride.time}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        Localização
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Histórico Recente */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2 text-whatsapp" />
                Histórico Recente
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Pedro Costa</h3>
                    <span className="text-sm text-gray-500">Ontem, 18:45</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Casa → Shopping Center
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">Concluída</span>
                    <span className="text-sm text-gray-500">R$ 15,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                      <p className="text-sm text-gray-500">{driver.lastSeen}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    driver.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-gray-900">{driver.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Distância:</span>
                    <span className="font-medium text-gray-900">{driver.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avaliação:</span>
                    <span className="font-medium text-gray-900">⭐ {driver.rating}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 whatsapp-gradient text-white">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Ligar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Agendar Nova Corrida
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Escolher Motorista
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent">
                    <option>Selecione um motorista conhecido</option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} - {driver.distance} - {driver.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local de Origem
                    </label>
                    <input 
                      type="text" 
                      placeholder="Digite o endereço de origem"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Local de Destino
                    </label>
                    <input 
                      type="text" 
                      placeholder="Digite o endereço de destino"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário
                    </label>
                    <input 
                      type="time" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Adicione observações sobre a corrida..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                  ></textarea>
                </div>

                <Button className="w-full whatsapp-gradient text-white py-3 text-lg">
                  <Clock className="w-5 h-5 mr-2" />
                  Agendar Corrida
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
