import { 
  Home, 
  Users, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Award, 
  Brain, 
  Heart, 
  Activity, 
  Baby, 
  Zap, 
  Stethoscope,
  Calculator,
  FileText,
  Video,
  Search,
  Settings,
  User,
  Bell,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// Base navigation item interface
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: any;
  description?: string;
  isExternal?: boolean;
  requiresAuth?: boolean;
  badge?: string | number;
  children?: NavigationItem[];
  parent?: string;
  keywords?: string[]; // For search functionality
}

// Navigation group interface for organizing items
export interface NavigationGroup {
  id: string;
  label: string;
  icon?: any;
  items: NavigationItem[];
  order: number;
}

// Specialty areas under 'Especialidades'
const especialidadesItems: NavigationItem[] = [
  {
    id: 'saude-atleta',
    label: 'Saúde do Atleta',
    path: '/saude-atleta',
    icon: Activity,
    description: 'Fisioterapia esportiva e reabilitação de atletas',
    keywords: ['esporte', 'atleta', 'lesão esportiva', 'performance']
  },
  {
    id: 'neurofuncional',
    label: 'Neurofuncional',
    path: '/neurofuncional',
    icon: Brain,
    description: 'Reabilitação neurológica e distúrbios do movimento',
    keywords: ['neurologia', 'AVC', 'parkinson', 'paralisia cerebral']
  },
  {
    id: 'respiratoria',
    label: 'Respiratória',
    path: '/respiratoria',
    icon: Heart,
    description: 'Fisioterapia cardiovascular e respiratória',
    keywords: ['coração', 'pulmão', 'respiração', 'cardíaco']
  },
  {
    id: 'pediatrica',
    label: 'Pediatria',
    path: '/pediatrica',
    icon: Baby,
    description: 'Fisioterapia infantil e desenvolvimento motor',
    keywords: ['criança', 'bebê', 'desenvolvimento', 'pediatria']
  },
  {
    id: 'ortopedica',
    label: 'Ortopédica',
    path: '/ortopedica',
    icon: Stethoscope,
    description: 'Fisioterapia ortopédica e traumatológica',
    keywords: ['osso', 'articulação', 'fratura', 'ortopedia']
  }
];

// Community features under 'Comunidade'
const comunidadeItems: NavigationItem[] = [
  {
    id: 'forum',
    label: 'Fórum',
    path: '/forum',
    icon: MessageSquare,
    description: 'Discussões e troca de experiências',
    keywords: ['discussão', 'pergunta', 'resposta', 'comunidade']
  },
  {
    id: 'eventos',
    label: 'Eventos',
    path: '/eventos',
    icon: Calendar,
    description: 'Congressos, workshops e cursos',
    keywords: ['congresso', 'workshop', 'curso', 'evento']
  },
  {
    id: 'profissionais',
    label: 'Profissionais',
    path: '/profissionais',
    icon: Users,
    description: 'Rede de fisioterapeutas',
    keywords: ['fisioterapeuta', 'profissional', 'rede', 'contato']
  },
  {
    id: 'casos-clinicos',
    label: 'Casos Clínicos',
    path: '/casos-clinicos',
    icon: FileText,
    description: 'Estudos de caso e discussões clínicas',
    keywords: ['caso', 'clínico', 'estudo', 'paciente']
  }
];

// Tools under 'Ferramentas'
const ferramentasItems: NavigationItem[] = [
  {
    id: 'calculadoras',
    label: 'Calculadoras',
    path: '/ferramentas-calculo',
    icon: Calculator,
    description: 'Calculadoras clínicas e de avaliação',
    keywords: ['cálculo', 'avaliação', 'medida', 'ferramenta']
  },
  {
    id: 'protocolos',
    label: 'Protocolos',
    path: '/ferramentas/protocolos',
    icon: BookOpen,
    description: 'Protocolos de tratamento e avaliação',
    keywords: ['protocolo', 'tratamento', 'procedimento', 'guia']
  },
  {
    id: 'videos',
    label: 'Vídeos Educativos',
    path: '/ferramentas/videos',
    icon: Video,
    description: 'Biblioteca de vídeos educacionais',
    keywords: ['vídeo', 'educação', 'técnica', 'demonstração']
  },
  {
    id: 'busca-avancada',
    label: 'Busca Avançada',
    path: '/ferramentas/busca',
    icon: Search,
    description: 'Busca avançada por conteúdo',
    keywords: ['buscar', 'pesquisar', 'encontrar', 'filtro']
  }
];

// Main navigation items (top level)
const mainNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Início',
    path: '/',
    icon: Home,
    description: 'Página inicial do portal',
    keywords: ['início', 'home', 'principal']
  },
  {
    id: 'sobre',
    label: 'Sobre',
    path: '/sobre',
    icon: HelpCircle,
    description: 'Sobre o Portal de Fisioterapia',
    keywords: ['sobre', 'informação', 'portal']
  },
  {
    id: 'contato',
    label: 'Contato',
    path: '/contato',
    icon: Mail,
    description: 'Entre em contato conosco',
    keywords: ['contato', 'email', 'telefone', 'suporte']
  }
];

// User-related navigation items
const userNavigationItems: NavigationItem[] = [
  {
    id: 'perfil',
    label: 'Meu Perfil',
    path: '/profile',
    icon: User,
    description: 'Gerenciar perfil pessoal',
    requiresAuth: true,
    keywords: ['perfil', 'conta', 'dados pessoais']
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    path: '/configuracoes',
    icon: Settings,
    description: 'Configurações da conta',
    requiresAuth: true,
    keywords: ['configuração', 'preferência', 'ajuste']
  },
  {
    id: 'notificacoes',
    label: 'Notificações',
    path: '/notificacoes',
    icon: Bell,
    description: 'Central de notificações',
    requiresAuth: true,
    keywords: ['notificação', 'alerta', 'aviso']
  }
];

// Navigation groups for desktop dropdowns
export const navigationGroups: NavigationGroup[] = [
  {
    id: 'especialidades',
    label: 'Especialidades',
    icon: Award,
    items: especialidadesItems,
    order: 1
  },
  {
    id: 'comunidade',
    label: 'Comunidade',
    icon: Users,
    items: comunidadeItems,
    order: 2
  },
  {
    id: 'ferramentas',
    label: 'Ferramentas',
    icon: Calculator,
    items: ferramentasItems,
    order: 3
  }
];

// Flat array for mobile menu (includes all items)
export const mobileNavigationItems: NavigationItem[] = [
  ...mainNavigationItems,
  ...especialidadesItems.map(item => ({ ...item, parent: 'especialidades' })),
  ...comunidadeItems.map(item => ({ ...item, parent: 'comunidade' })),
  ...ferramentasItems.map(item => ({ ...item, parent: 'ferramentas' })),
  ...userNavigationItems
];

// All navigation items for search and breadcrumb generation
export const allNavigationItems: NavigationItem[] = [
  ...mainNavigationItems,
  ...especialidadesItems,
  ...comunidadeItems,
  ...ferramentasItems,
  ...userNavigationItems
];

// Breadcrumb mapping for route resolution
export const breadcrumbMapping: Record<string, { label: string; parent?: string }> = {
  '/': { label: 'Início' },
  '/sobre': { label: 'Sobre' },
  '/contato': { label: 'Contato' },
  
  // Especialidades
  '/especialidades': { label: 'Especialidades' },
  '/saude-atleta': { label: 'Saúde do Atleta', parent: '/especialidades' },
  '/neurofuncional': { label: 'Neurofuncional', parent: '/especialidades' },
  '/respiratoria': { label: 'Respiratória', parent: '/especialidades' },
  '/pediatrica': { label: 'Pediatria', parent: '/especialidades' },
  '/ortopedica': { label: 'Ortopédica', parent: '/especialidades' },
  
  // Comunidade
  '/forum': { label: 'Fórum' },
  '/forum/topic': { label: 'Tópico', parent: '/forum' },
  '/eventos': { label: 'Eventos' },
  '/eventos/detalhes': { label: 'Detalhes do Evento', parent: '/eventos' },
  '/profissionais': { label: 'Profissionais' },
  '/profissionais/perfil': { label: 'Perfil Profissional', parent: '/profissionais' },
  '/casos-clinicos': { label: 'Casos Clínicos' },
  '/casos-clinicos/caso': { label: 'Caso Clínico', parent: '/casos-clinicos' },
  
  // Ferramentas
  '/ferramentas': { label: 'Ferramentas' },
  '/ferramentas-calculo': { label: 'Calculadoras', parent: '/ferramentas' },
  '/ferramentas/protocolos': { label: 'Protocolos', parent: '/ferramentas' },
  '/ferramentas/videos': { label: 'Vídeos Educativos', parent: '/ferramentas' },
  '/ferramentas/busca': { label: 'Busca Avançada', parent: '/ferramentas' },
  
  // User areas
  '/profile': { label: 'Meu Perfil' },
  '/configuracoes': { label: 'Configurações' },
  '/notificacoes': { label: 'Notificações' },
  '/login': { label: 'Login' },
  '/registro': { label: 'Registro' },
  '/recuperar-senha': { label: 'Recuperar Senha' }
};

// Helper function to get navigation item by path
export const getNavigationItemByPath = (path: string): NavigationItem | undefined => {
  return allNavigationItems.find(item => item.path === path);
};

// Helper function to get breadcrumb trail for a given path
export const getBreadcrumbTrail = (path: string): Array<{ label: string; path: string }> => {
  const trail: Array<{ label: string; path: string }> = [];
  
  // Always start with home unless we're already at home
  if (path !== '/') {
    trail.push({ label: 'Início', path: '/' });
  }
  
  // Find the current page in breadcrumb mapping
  const currentPage = breadcrumbMapping[path];
  if (!currentPage) {
    // If exact path not found, try to match partial paths
    const segments = path.split('/').filter(Boolean);
    let currentPath = '';
    
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const mapping = breadcrumbMapping[currentPath];
      if (mapping) {
        trail.push({ label: mapping.label, path: currentPath });
      }
    }
    
    return trail;
  }
  
  // Build trail by following parent relationships
  const buildTrail = (mapping: { label: string; parent?: string }, currentPath: string) => {
    if (mapping.parent) {
      const parentMapping = breadcrumbMapping[mapping.parent];
      if (parentMapping) {
        buildTrail(parentMapping, mapping.parent);
      }
    }
    
    if (currentPath !== '/') {
      trail.push({ label: mapping.label, path: currentPath });
    }
  };
  
  buildTrail(currentPage, path);
  
  return trail;
};

// Helper function to search navigation items
export const searchNavigationItems = (query: string): NavigationItem[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return allNavigationItems.filter(item => {
    const matchesLabel = item.label.toLowerCase().includes(lowercaseQuery);
    const matchesDescription = item.description?.toLowerCase().includes(lowercaseQuery);
    const matchesKeywords = item.keywords?.some(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery)
    );
    
    return matchesLabel || matchesDescription || matchesKeywords;
  });
};

// Export default configuration object
export default {
  navigationGroups,
  mobileNavigationItems,
  allNavigationItems,
  breadcrumbMapping,
  getNavigationItemByPath,
  getBreadcrumbTrail,
  searchNavigationItems
};