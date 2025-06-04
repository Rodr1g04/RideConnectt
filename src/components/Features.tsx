
import { MessageCircle, MapPin, Clock, Users, Shield, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Integração WhatsApp",
      description: "Conecte-se automaticamente com seus contatos do WhatsApp que também são motoristas."
    },
    {
      icon: Shield,
      title: "ID Único de Motorista",
      description: "Cada motorista tem um ID único verificado para garantir autenticidade e segurança."
    },
    {
      icon: MapPin,
      title: "Localização em Tempo Real",
      description: "Compartilhe sua localização apenas com motoristas conhecidos em grupos fechados."
    },
    {
      icon: Clock,
      title: "Agendamento Inteligente",
      description: "Agende corridas com antecedência com motoristas da sua rede de confiança."
    },
    {
      icon: Users,
      title: "Chat Exclusivo",
      description: "Converse diretamente com motoristas através de um chat seguro e privado."
    },
    {
      icon: Smartphone,
      title: "Design Mobile-First",
      description: "Aplicativo otimizado para uso mobile com interface intuitiva e responsiva."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos Exclusivos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvido especialmente para conectar pessoas que já se conhecem, 
            garantindo máxima segurança e confiança em cada viagem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-whatsapp/20 animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="whatsapp-gradient p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
