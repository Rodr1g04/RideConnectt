
import { MessageCircle, Users, Car, MapPin } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Conecte seu WhatsApp",
      description: "Faça login com seu WhatsApp e permita acesso aos seus contatos de forma segura."
    },
    {
      icon: Users,
      title: "Encontre Motoristas Conhecidos",
      description: "O app identifica automaticamente quais dos seus contatos são motoristas cadastrados."
    },
    {
      icon: Car,
      title: "Agende sua Corrida",
      description: "Escolha um motorista conhecido, defina origem e destino, e agende sua viagem."
    },
    {
      icon: MapPin,
      title: "Compartilhe Localização",
      description: "Durante a viagem, compartilhe sua localização em tempo real apenas com pessoas conhecidas."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em poucos passos simples, você estará conectado com motoristas de confiança 
            da sua rede de contatos do WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="relative mb-6">
                <div className="whatsapp-gradient p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-whatsapp rounded-full flex items-center justify-center text-whatsapp font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para começar?</h3>
            <p className="text-gray-600 mb-6">
              Conecte seu WhatsApp agora e descubra uma nova forma segura de se locomover.
            </p>
            <button className="w-full whatsapp-gradient text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Conectar WhatsApp Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
