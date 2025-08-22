import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Brain, 
  Star,
  ChevronLeft 
} from 'lucide-react';

const Sidebar = ({ subjectName, subjectColor }) => {
  const location = useLocation();
  
  const sections = [
    {
      name: 'Conteúdo Programático',
      icon: BookOpen,
      id: 'conteudo'
    },
    {
      name: 'Materiais de Estudo',
      icon: FileText,
      id: 'materiais'
    },
    {
      name: 'Simulados',
      icon: Brain,
      id: 'simulados'
    },
    {
      name: 'Recursos Extras',
      icon: Star,
      id: 'recursos'
    }
  ];

  const colorClasses = {
    blue: 'border-atleta-500 bg-atleta-50 text-atleta-700',
    teal: 'border-hospitalar-500 bg-hospitalar-50 text-hospitalar-700',
    green: 'border-idoso-500 bg-idoso-50 text-idoso-700',
    purple: 'border-neuro-500 bg-neuro-50 text-neuro-700',
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen sticky top-16">
      <div className="p-6">
        {/* Botão voltar */}
        <Link 
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar ao Portal
        </Link>

        {/* Título da matéria */}
        <h2 className="text-lg font-semibold text-gray-900 mb-6 leading-tight">
          {subjectName}
        </h2>

        {/* Menu de navegação */}
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = location.hash === `#${section.id}`;
            
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? `${colorClasses[subjectColor]} border-l-4`
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {section.name}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
