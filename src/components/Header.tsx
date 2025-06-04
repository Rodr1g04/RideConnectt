
import { Menu, MessageCircle, Users, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="whatsapp-gradient p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RideConnect</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-whatsapp transition-colors">Início</a>
            <a href="#features" className="text-gray-700 hover:text-whatsapp transition-colors">Recursos</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-whatsapp transition-colors">Como Funciona</a>
            <a href="#contact" className="text-gray-700 hover:text-whatsapp transition-colors">Contato</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white">
              Entrar
            </Button>
            <Button className="whatsapp-gradient text-white hover:opacity-90">
              <MessageCircle className="w-4 h-4 mr-2" />
              Conectar WhatsApp
            </Button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-in">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-whatsapp">Início</a>
              <a href="#features" className="text-gray-700 hover:text-whatsapp">Recursos</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-whatsapp">Como Funciona</a>
              <a href="#contact" className="text-gray-700 hover:text-whatsapp">Contato</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-whatsapp text-whatsapp">Entrar</Button>
                <Button className="whatsapp-gradient text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conectar WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
