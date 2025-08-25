import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter Section no Footer */}
        <div style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
          borderRadius: '1.5rem',
          margin: '0 0 3rem 0',
          overflow: 'hidden'
        }}>
          <Newsletter variant="footer" />
        </div>

        <div className="footer-content">
          <div>
            <h4>Portal de Fisioterapia</h4>
            <p>
              Portal acadêmico desenvolvido para organizar e centralizar conteúdos
              de estudo das principais especialidades da fisioterapia.
            </p>
          </div>

          <div>
            <h4>Navegação</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4>Especialidades</h4>
            <ul>
              <li><Link to="/saude-atleta">Saúde do Atleta</Link></li>
              <li><Link to="/unidade-hospitalar">Unidade Hospitalar</Link></li>
              <li><Link to="/saude-idoso">Saúde do Idoso</Link></li>
              <li><Link to="/neurofuncional">Neurofuncional</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Portal de Fisioterapia - Projeto pessoal para estudos acadêmicos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;