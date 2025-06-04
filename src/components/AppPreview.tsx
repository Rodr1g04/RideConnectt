
import { Smartphone, MessageCircle, MapPin, Clock, Users } from 'lucide-react';

const AppPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interface Familiar e Intuitiva
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Design inspirado no WhatsApp que você já conhece, mas otimizado para agendamento de corridas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4 animate-fade-in">
              <div className="whatsapp-gradient p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lista de Contatos Motoristas</h3>
                <p className="text-gray-600">Veja todos os seus contatos do WhatsApp que são motoristas cadastrados, com status online e disponibilidade.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="whatsapp-gradient p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Agendamento Simples</h3>
                <p className="text-gray-600">Interface clean para selecionar origem, destino, data e hora. Tudo familiar como uma conversa do WhatsApp.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="whatsapp-gradient p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Localização em Tempo Real</h3>
                <p className="text-gray-600">Compartilhe sua localização apenas com o motorista escolhido durante a viagem, mantendo privacidade total.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="whatsapp-gradient p-3 rounded-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat Integrado</h3>
                <p className="text-gray-600">Converse com o motorista através do chat do app, mantendo o histórico organizado e seguro.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center animate-fade-in" style={{animationDelay: '0.8s'}}>
            <div className="relative">
              <div className="w-80 h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  {/* Mockup da tela do app */}
                  <div className="whatsapp-gradient p-4 flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-white" />
                    <span className="text-white font-semibold">RideConnect</span>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="text-sm text-gray-500 text-center">Motoristas Disponíveis</div>
                    
                    {/* Lista de motoristas mockup */}
                    <div className="space-y-3">
                      {[
                        { name: "João Silva", status: "Online", distance: "2 km" },
                        { name: "Maria Santos", status: "Disponível", distance: "5 km" },
                        { name: "Pedro Costa", status: "Online", distance: "1 km" }
                      ].map((driver, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-whatsapp rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{driver.name}</div>
                            <div className="text-xs text-gray-500">{driver.status} • {driver.distance}</div>
                          </div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-whatsapp-light rounded-lg">
                      <div className="text-sm font-semibold text-gray-800 mb-2">Próxima Viagem</div>
                      <div className="text-xs text-gray-600">
                        <div>📍 Centro → Shopping</div>
                        <div>🕐 Hoje, 15:30</div>
                        <div>👤 João Silva</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-whatsapp/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-whatsapp-dark/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
