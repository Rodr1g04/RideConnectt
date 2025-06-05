
import { useState, useEffect } from 'react';
import { Users, MapPin, Plus, Share2, MessageCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Driver {
  id: string;
  name: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
    timestamp: Date;
  };
  status: 'online' | 'busy' | 'offline';
  isOnline: boolean;
}

interface Group {
  id: string;
  name: string;
  members: Driver[];
  createdBy: string;
}

const DriverGroups = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 'group-1',
      name: 'Motoristas Centro',
      createdBy: 'current-user',
      members: [
        {
          id: 'drv-1',
          name: 'Carlos Silva',
          status: 'online',
          isOnline: true,
          location: {
            lat: -23.550520,
            lng: -46.633309,
            address: 'Av. Paulista, Centro',
            timestamp: new Date()
          }
        },
        {
          id: 'drv-2',
          name: 'Ana Costa',
          status: 'busy',
          isOnline: true
        }
      ]
    }
  ]);

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [isShareLocation, setIsShareLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number, address: string} | null>(null);

  // Simular obtenção de localização
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Localização atual'
          });
        },
        (error) => {
          console.log('Erro ao obter localização:', error);
        }
      );
    }
  };

  const toggleLocationSharing = () => {
    if (!isShareLocation) {
      getCurrentLocation();
    }
    setIsShareLocation(!isShareLocation);
  };

  const createGroup = () => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: groupName,
      createdBy: 'current-user',
      members: []
    };
    setGroups([...groups, newGroup]);
    setGroupName('');
    setShowCreateGroup(false);
  };

  const joinGroup = () => {
    // Simular entrada em grupo com código
    console.log('Entrando no grupo com código:', groupCode);
    setGroupCode('');
    setShowJoinGroup(false);
  };

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Meus Grupos</h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowCreateGroup(true)}
            size="sm"
            className="whatsapp-gradient text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Criar
          </Button>
          <Button
            onClick={() => setShowJoinGroup(true)}
            size="sm"
            variant="outline"
          >
            Entrar
          </Button>
        </div>
      </div>

      {/* Status de compartilhamento de localização */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-whatsapp" />
              <div>
                <p className="font-medium text-gray-900">Compartilhar Localização</p>
                <p className="text-sm text-gray-600">
                  {isShareLocation ? 'Sua localização está sendo compartilhada' : 'Localização privada'}
                </p>
              </div>
            </div>
            <Button
              onClick={toggleLocationSharing}
              variant={isShareLocation ? "default" : "outline"}
              size="sm"
              className={isShareLocation ? "whatsapp-gradient text-white" : ""}
            >
              {isShareLocation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de grupos */}
      {groups.map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-whatsapp" />
                {group.name}
              </div>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      {member.location && (
                        <p className="text-xs text-gray-500">
                          📍 {member.location.address} • {member.location.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'online' ? 'bg-green-100 text-green-800' :
                      member.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status === 'online' ? 'Disponível' :
                       member.status === 'busy' ? 'Ocupado' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Modal Criar Grupo */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Grupo</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Nome do Grupo</Label>
                <Input
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Ex: Motoristas Centro"
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={createGroup}
                  disabled={!groupName.trim()}
                  className="flex-1 whatsapp-gradient text-white"
                >
                  Criar Grupo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Entrar em Grupo */}
      {showJoinGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Entrar em Grupo</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupCode">Código do Grupo</Label>
                <Input
                  id="groupCode"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  placeholder="Digite o código compartilhado"
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowJoinGroup(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={joinGroup}
                  disabled={!groupCode.trim()}
                  className="flex-1 whatsapp-gradient text-white"
                >
                  Entrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverGroups;
