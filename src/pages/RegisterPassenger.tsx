
import { useState } from 'react';
import { ArrowLeft, Users, Phone, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const RegisterPassenger = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    driverId: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido. Use (11) 99999-9999';
    }
    
    if (!formData.driverId.trim()) {
      newErrors.driverId = 'ID do motorista é obrigatório';
    } else if (formData.driverId.length < 8) {
      newErrors.driverId = 'ID deve ter pelo menos 8 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({...formData, phone: formatted});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Dados do passageiro:', formData);
      
      // Salvar no localStorage para simular persistência
      localStorage.setItem('passengerData', JSON.stringify({
        ...formData,
        registeredAt: new Date().toISOString()
      }));
      
      navigate('/dashboard/passenger');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-lg font-semibold text-gray-900">Cadastro de Passageiro</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Criar Perfil de Passageiro</h2>
            <p className="text-gray-600 text-sm mt-2">
              Preencha seus dados para agendar corridas com motoristas conhecidos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Digite seu nome completo"
                  className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="phone">WhatsApp</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                  className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  maxLength={15}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="driverId">ID do Motorista</Label>
              <Input
                id="driverId"
                type="text"
                value={formData.driverId}
                onChange={(e) => setFormData({...formData, driverId: e.target.value.toUpperCase()})}
                placeholder="Digite o ID que o motorista compartilhou"
                className={`mt-1 font-mono ${errors.driverId ? 'border-red-500' : ''}`}
              />
              {errors.driverId && <p className="text-red-500 text-xs mt-1">{errors.driverId}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Peça o ID único para o motorista conhecido
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Certifique-se de que conhece pessoalmente o motorista antes de agendar corridas.
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              className="w-full whatsapp-gradient text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando perfil...' : 'Criar Perfil de Passageiro'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPassenger;
