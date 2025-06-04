
import { MessageCircle, Shield, Users, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="hero-gradient py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Corridas Seguras com 
            <span className="text-whatsapp"> Pessoas Conhecidas</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            O único app de corridas que conecta você apenas com motoristas dos seus contatos do WhatsApp. 
            Mais segurança, mais confiança.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="whatsapp-gradient text-white hover:opacity-90 text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              Conectar WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-4">
              Ver Como Funciona
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-fade-in">
            <div className="whatsapp-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Seguro</h3>
            <p className="text-gray-600">Só funciona com contatos do seu WhatsApp. Zero estranhos.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="whatsapp-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rede Exclusiva</h3>
            <p className="text-gray-600">Conecte-se com motoristas que você já conhece e confia.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="whatsapp-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-gray-600">Interface simples e familiar, como o WhatsApp que você já usa.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
