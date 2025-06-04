
import { useState } from 'react';
import { ArrowLeft, Car, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const RegisterDriver = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    city: '',
    pricePerKm: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do motorista:', formData);
    // Aqui seria a integração com backend
    navigate('/dashboard/driver');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile-selection')}
            className="mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Cadastro de Motorista</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 whatsapp-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Criar Perfil de Motorista</h2>
            <p className="text-gray-600 text-sm mt-2">
              Configure seu perfil para oferecer corridas aos seus contatos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Digite seu nome completo"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">WhatsApp</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="vehicle">Veículo</Label>
              <Input
                id="vehicle"
                type="text"
                value={formData.vehicle}
                onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                placeholder="Ex: Honda Civic Prata 2020"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="city">Cidade de Atuação</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Digite sua cidade"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pricePerKm">Preço por KM (R$)</Label>
              <Input
                id="pricePerKm"
                type="number"
                step="0.01"
                value={formData.pricePerKm}
                onChange={(e) => setFormData({...formData, pricePerKm: e.target.value})}
                placeholder="Ex: 2.50"
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full whatsapp-gradient text-white">
              Criar Perfil de Motorista
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDriver;
