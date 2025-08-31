import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbTrail, breadcrumbMapping } from '../../config/navigation';

interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrentPage?: boolean;
}

interface DynamicContentCache {
  [key: string]: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const [dynamicContentCache, setDynamicContentCache] = useState<DynamicContentCache>({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch dynamic content for routes with parameters
  const fetchDynamicContent = async (path: string, segments: string[]): Promise<string> => {
    // Check cache first
    if (dynamicContentCache[path]) {
      return dynamicContentCache[path];
    }

    try {
      setIsLoading(true);
      
      // Handle different dynamic route patterns
      if (path.includes('/forum/topic/')) {
        const topicId = segments[segments.length - 1];
        // In a real app, this would be an API call
        // For now, return a placeholder
        const title = `Tópico #${topicId}`;
        setDynamicContentCache(prev => ({ ...prev, [path]: title }));
        return title;
      }
      
      if (path.includes('/eventos/') && segments.length > 2) {
        const eventId = segments[segments.length - 1];
        const title = `Evento #${eventId}`;
        setDynamicContentCache(prev => ({ ...prev, [path]: title }));
        return title;
      }
      
      if (path.includes('/profissionais/') && segments.length > 2) {
        const profileId = segments[segments.length - 1];
        const title = `Profissional #${profileId}`;
        setDynamicContentCache(prev => ({ ...prev, [path]: title }));
        return title;
      }
      
      if (path.includes('/casos-clinicos/') && segments.length > 2) {
        const caseId = segments[segments.length - 1];
        const title = `Caso Clínico #${caseId}`;
        setDynamicContentCache(prev => ({ ...prev, [path]: title }));
        return title;
      }

      // Default fallback for unknown dynamic routes
      return segments[segments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
      return segments[segments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    } finally {
      setIsLoading(false);
    }
  };

  // Function to truncate long labels
  const truncateLabel = (label: string, maxLength: number = 25): string => {
    if (label.length <= maxLength) return label;
    return `${label.substring(0, maxLength)}...`;
  };

  // Function to build breadcrumb items
  const buildBreadcrumbItems = async (currentPath: string): Promise<BreadcrumbItem[]> => {
    // Don't show breadcrumbs on home page
    if (currentPath === '/') {
      return [];
    }

    const items: BreadcrumbItem[] = [];
    const segments = currentPath.split('/').filter(Boolean);
    
    // Always start with home
    items.push({
      label: 'Início',
      path: '/',
      isCurrentPage: false
    });

    // Build path progressively and check for matches
    let buildPath = '';
    for (let i = 0; i < segments.length; i++) {
      buildPath += `/${segments[i]}`;
      
      // Check if this path exists in our breadcrumb mapping
      const mapping = breadcrumbMapping[buildPath];
      
      if (mapping) {
        // Static route found in mapping
        items.push({
          label: truncateLabel(mapping.label),
          path: buildPath,
          isCurrentPage: i === segments.length - 1
        });
      } else {
        // Check for dynamic route patterns
        const isDynamicRoute = await handleDynamicRoute(buildPath, segments, i);
        if (isDynamicRoute) {
          const dynamicLabel = await fetchDynamicContent(buildPath, segments.slice(0, i + 1));
          items.push({
            label: truncateLabel(dynamicLabel),
            path: buildPath,
            isCurrentPage: i === segments.length - 1
          });
        } else {
          // Fallback for unknown routes
          const fallbackLabel = segments[i].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          items.push({
            label: truncateLabel(fallbackLabel),
            path: buildPath,
            isCurrentPage: i === segments.length - 1
          });
        }
      }
    }

    // Limit to 3 levels deep (including home)
    if (items.length > 3) {
      return [
        items[0], // Home
        { label: '...', path: '', isCurrentPage: false }, // Ellipsis
        ...items.slice(-2) // Last two items
      ];
    }

    return items;
  };

  // Function to check if a route is dynamic
  const handleDynamicRoute = async (path: string, segments: string[], index: number): Promise<boolean> => {
    // Check for known dynamic route patterns
    if (path.includes('/forum/topic/') && segments[1] === 'forum' && segments[2] === 'topic') {
      return true;
    }
    if (path.includes('/eventos/') && segments[1] === 'eventos' && index > 1) {
      return true;
    }
    if (path.includes('/profissionais/') && segments[1] === 'profissionais' && index > 1) {
      return true;
    }
    if (path.includes('/casos-clinicos/') && segments[1] === 'casos-clinicos' && index > 1) {
      return true;
    }
    
    return false;
  };

  // Update breadcrumbs when location changes
  useEffect(() => {
    const updateBreadcrumbs = async () => {
      const items = await buildBreadcrumbItems(location.pathname);
      setBreadcrumbItems(items);
    };

    updateBreadcrumbs();
  }, [location.pathname, dynamicContentCache]);

  // Don't render anything if no breadcrumb items or on home page
  if (breadcrumbItems.length === 0 || location.pathname === '/') {
    return null;
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
      .filter(item => item.path !== '') // Exclude ellipsis
      .map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `${window.location.origin}${item.path}`
      }))
  };

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        className="bg-gray-50 border-b border-gray-200 py-3"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={`${item.path}-${index}`} className="flex items-center">
                {index > 0 && (
                  <ChevronRight 
                    className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" 
                    aria-hidden="true"
                  />
                )}
                
                {item.path === '' ? (
                  // Ellipsis for truncated paths
                  <span className="text-gray-500 font-medium">
                    {item.label}
                  </span>
                ) : item.isCurrentPage ? (
                  // Current page (non-clickable)
                  <span 
                    className="text-gray-900 font-medium flex items-center"
                    aria-current="page"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                    {item.label}
                    {isLoading && index === breadcrumbItems.length - 1 && (
                      <div className="ml-2 h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    )}
                  </span>
                ) : (
                  // Clickable breadcrumb links
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                    title={`Navegar para ${item.label}`}
                  >
                    {index === 0 && (
                      <Home 
                        className="h-4 w-4 mr-1 group-hover:text-blue-600 transition-colors duration-200" 
                        aria-hidden="true" 
                      />
                    )}
                    <span className="hover:underline">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;