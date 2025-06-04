
import { MessageCircle, Car, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="whatsapp-gradient p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">RideConnect</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              O primeiro app de corridas que conecta você apenas com motoristas dos seus contatos do WhatsApp. 
              Segurança e confiança em cada viagem.
            </p>
            <div className="flex space-x-4">
              <button className="whatsapp-gradient text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Conectar WhatsApp
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-whatsapp transition-colors">Início</a></li>
              <li><a href="#features" className="hover:text-whatsapp transition-colors">Recursos</a></li>
              <li><a href="#how-it-works" className="hover:text-whatsapp transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-whatsapp transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-whatsapp transition-colors">Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@rideconnect.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Business</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 RideConnect. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Desenvolvido com foco na segurança e confiança entre pessoas conhecidas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
