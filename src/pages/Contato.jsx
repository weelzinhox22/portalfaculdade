import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contato = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Estamos aqui para ajudar você em sua jornada acadêmica. 
            Entre em contato conosco para dúvidas, sugestões ou parcerias.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envie sua Mensagem
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida sobre conteúdo</option>
                    <option value="sugestao">Sugestão de melhoria</option>
                    <option value="parceria">Proposta de parceria</option>
                    <option value="tecnico">Suporte técnico</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Descreva sua mensagem detalhadamente..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informações de Contato
                </h2>
                <p className="text-gray-600 mb-8">
                  Escolha a forma de contato que for mais conveniente para você. 
                  Estamos sempre prontos para ajudar e responder suas questões.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">E-mail</h3>
                    <p className="text-gray-600">contato@portalfisioterapia.com</p>
                    <p className="text-gray-600">suporte@portalfisioterapia.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefone</h3>
                    <p className="text-gray-600">(11) 3000-0000</p>
                    <p className="text-gray-600">(11) 99000-0000</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Rua da Fisioterapia, 123<br />
                      Bairro Saúde - São Paulo, SP<br />
                      CEP: 01000-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Horário de Atendimento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Como posso acessar o conteúdo?</p>
                    <p className="text-gray-600">Todo o conteúdo está disponível gratuitamente no portal. Basta navegar pelas seções.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Posso sugerir novos conteúdos?</p>
                    <p className="text-gray-600">Sim! Use o formulário de contato com o assunto "Sugestão de melhoria".</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Vocês oferecem certificados?</p>
                    <p className="text-gray-600">Atualmente não, mas estamos trabalhando nesta funcionalidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tem uma dúvida específica?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Nossa equipe de especialistas está pronta para ajudar você com questões acadêmicas e técnicas.
          </p>
          <a
            href="mailto:contato@portalfisioterapia.com"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            Enviar E-mail Direto
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contato;
