
import { Menu, MessageCircle, Users, Car, Home, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Início', href: '#' },
    { icon: Info, label: 'Recursos', href: '#features' },
    { icon: Users, label: 'Como Funciona', href: '#how-it-works' },
    { icon: Phone, label: 'Contato', href: '#contact' },
  ];

  const handleLogin = () => {
    navigate('/login');
    setIsDrawerOpen(false);
  };

  const handleConnect = () => {
    navigate('/profile-selection');
    setIsDrawerOpen(false);
  };

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
          
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-gray-700 hover:text-whatsapp transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Button 
              className="whatsapp-gradient text-white hover:opacity-90"
              onClick={handleConnect}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Conectar WhatsApp
            </Button>
          </div>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button className="md:hidden p-2">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="flex items-center space-x-3">
                  <div className="whatsapp-gradient p-2 rounded-lg">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <span>RideConnect</span>
                </DrawerTitle>
              </DrawerHeader>
              
              <div className="px-4 pb-8">
                <nav className="space-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-700 hover:text-whatsapp transition-colors p-3 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
                
                <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="border-whatsapp text-whatsapp w-full"
                    onClick={handleLogin}
                  >
                    Entrar
                  </Button>
                  <Button 
                    className="whatsapp-gradient text-white w-full"
                    onClick={handleConnect}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Conectar WhatsApp
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
