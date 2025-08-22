import { Link } from 'react-router-dom';

const Sobre = () => {
  const features = [
    {
      icon: '📚',
      title: 'Conteúdo Especializado',
      description: 'Material didático desenvolvido para cada área da fisioterapia, garantindo qualidade e atualização científica.'
    },
    {
      icon: '🎯',
      title: 'Metodologia Focada',
      description: 'Abordagem prática e objetiva, combinando teoria sólida com aplicação clínica real para melhor aprendizado.'
    },
    {
      icon: '👥',
      title: 'Comunidade Acadêmica',
      description: 'Espaço de aprendizado colaborativo para estudantes e profissionais compartilharem conhecimento e experiências.'
    },
    {
      icon: '🏆',
      title: 'Excelência Educacional',
      description: 'Compromisso com a formação de profissionais competentes e atualizados com as melhores práticas da fisioterapia.'
    }
  ];

  const stats = [
    { number: '4', label: 'Áreas de Especialização' },
    { number: '100+', label: 'Materiais Didáticos' },
    { number: '50+', label: 'Casos Clínicos' },
    { number: '24/7', label: 'Acesso Disponível' }
  ];

  const areas = [
    {
      title: 'Fisioterapia na Saúde do Atleta',
      description: 'Prevenção, tratamento e reabilitação de lesões esportivas com foco na performance atlética.',
      color: 'blue'
    },
    {
      title: 'Fisioterapia em Unidade Hospitalar',
      description: 'Cuidados intensivos, mobilização precoce e reabilitação no ambiente hospitalar.',
      color: 'teal'
    },
    {
      title: 'Fisioterapia na Saúde do Idoso',
      description: 'Envelhecimento ativo, prevenção de quedas e manutenção da funcionalidade.',
      color: 'green'
    },
    {
      title: 'Fisioterapia Neurofuncional',
      description: 'Reabilitação neurológica, plasticidade cerebral e recuperação funcional.',
      color: 'purple'
    }
  ];

  return (
    <main className="main">
      {/* Hero Section */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div className="container">
          <h1>Sobre o Portal de Fisioterapia</h1>
          <p>
            Um espaço dedicado ao ensino e aprendizado das principais áreas da fisioterapia, 
            reunindo conhecimento científico e prática clínica em uma plataforma acessível e organizada.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Nossa Missão</h2>
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
              Democratizar o acesso ao conhecimento em fisioterapia, oferecendo conteúdo de qualidade 
              que contribua para a formação de profissionais competentes e comprometidos com a saúde e 
              bem-estar da população. Nosso objetivo é criar uma ponte entre a teoria acadêmica e a 
              prática clínica, facilitando o aprendizado e a atualização profissional contínua.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section about" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title">Nossos Diferenciais</h2>
          <p className="section-subtitle">
            O que torna nosso portal único na educação em fisioterapia
          </p>
          
          <div className="grid grid-2">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="card-icon" style={{ background: '#f0f9ff' }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Portal em Números</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Dados que demonstram nosso compromisso com a educação de qualidade
          </p>
          
          <div className="stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat">
                <span className="stat-number" style={{ color: 'white' }}>{stat.number}</span>
                <span className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Áreas de Conhecimento</h2>
          <p className="section-subtitle">
            Cobertura completa das principais especialidades da fisioterapia
          </p>
          
          <div className="grid grid-2">
            {areas.map((area, index) => (
              <div key={index} className="card">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section about">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Comece sua Jornada de Aprendizado</h2>
          <p className="section-subtitle">
            Explore nosso conteúdo e descubra como podemos contribuir para seu desenvolvimento profissional
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn">
              Explorar Conteúdo
            </Link>
            <Link to="/contato" className="btn btn-secondary">
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sobre;