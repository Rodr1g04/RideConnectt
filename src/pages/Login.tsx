
import { useState } from 'react';
import { ArrowLeft, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    phone: '',
    userType: 'passenger'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', loginData);
    
    // Simulação de login - direcionamento baseado no tipo de usuário
    if (loginData.userType === 'driver') {
      navigate('/dashboard/driver');
    } else {
      navigate('/dashboard/passenger');
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
          <h1 className="text-lg font-semibold text-gray-900">Fazer Login</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 whatsapp-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Bem-vindo de volta!</h2>
            <p className="text-gray-600 text-sm mt-2">
              Faça login para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="phone">WhatsApp</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={loginData.phone}
                  onChange={(e) => setLoginData({...loginData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Tipo de Usuário</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setLoginData({...loginData, userType: 'passenger'})}
                  className={`p-3 rounded-lg border text-sm font-medium ${
                    loginData.userType === 'passenger'
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  Passageiro
                </button>
                <button
                  type="button"
                  onClick={() => setLoginData({...loginData, userType: 'driver'})}
                  className={`p-3 rounded-lg border text-sm font-medium ${
                    loginData.userType === 'driver'
                      ? 'bg-whatsapp/10 border-whatsapp/30 text-whatsapp'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  Motorista
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full whatsapp-gradient text-white">
              Entrar
            </Button>
          </form>

          <div className="text-center mt-6">
            <Button
              onClick={() => navigate('/profile-selection')}
              variant="link"
              className="text-whatsapp"
            >
              Não tem conta? Cadastre-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
