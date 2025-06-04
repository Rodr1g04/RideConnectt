
import { Users, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProfileSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="whatsapp-gradient p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Car className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">RideConnect</h2>
          <p className="text-gray-600">Escolha seu tipo de perfil</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/register/passenger')}
            className="w-full h-16 text-lg bg-white border-2 border-gray-200 text-gray-700 hover:border-whatsapp hover:text-whatsapp"
            variant="outline"
          >
            <Users className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Sou Passageiro</div>
              <div className="text-sm opacity-70">Quero agendar corridas</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/register/driver')}
            className="w-full h-16 text-lg whatsapp-gradient text-white"
          >
            <Car className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Sou Motorista</div>
              <div className="text-sm opacity-90">Quero oferecer corridas</div>
            </div>
          </Button>
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate('/login')}
            variant="link"
            className="text-whatsapp"
          >
            Já tenho conta - Fazer Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
