import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { navigationGroups, allNavigationItems } from '../../config/navigation';

const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Check if a path is active (exact match or starts with the path)
  const isActiveLink = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get main navigation items (not in groups)
  const mainNavItems = allNavigationItems.filter(item => 
    !navigationGroups.some(group => 
      group.items.some(groupItem => groupItem.id === item.id)
    )
  ).filter(item => !item.requiresAuth && item.path !== '/'); // Exclude home and auth-required items

  return (
    <nav className="hidden lg:flex items-center space-x-8" aria-label="Desktop navigation">
      {/* Main navigation items */}
      {mainNavItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`
            relative px-3 py-2 text-sm font-medium transition-colors duration-200
            hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md
            ${isActiveLink(item.path) 
              ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600' 
              : 'text-gray-700 hover:text-blue-600'
            }
          `}
          aria-current={isActiveLink(item.path) ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}

      {/* Dropdown navigation groups */}
      {navigationGroups
        .sort((a, b) => a.order - b.order)
        .map((group) => (
          <div
            key={group.id}
            className="relative"
          >
            <Menu as="div" className="relative">
              <Menu.Button
                id={`${group.id}-menu-button`}
                onClick={() => setOpenDropdown(prev => prev === group.id ? null : group.id)}
                className={`
                  flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200
                  hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md
                  ${group.items.some(item => isActiveLink(item.path))
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }
                `}
                aria-expanded={openDropdown === group.id}
                aria-haspopup="true"
              >
                <span>{group.label}</span>
                <ChevronDown 
                  className={`
                    w-4 h-4 transition-transform duration-200
                    ${openDropdown === group.id ? 'rotate-180' : ''}
                  `}
                  aria-hidden="true"
                />
              </Menu.Button>

              {openDropdown === group.id && (
                <Menu.Items
                  static
                  className="
                    absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg
                    ring-1 ring-black ring-opacity-5 focus:outline-none z-50
                    animate-in fade-in-0 zoom-in-95 duration-200
                  "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby={`${group.id}-menu-button`}
                >
                  <div className="py-2">
                    {group.items.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <Link
                            to={item.path}
                            className={`
                              flex items-start space-x-3 px-4 py-3 text-sm transition-colors duration-150
                              ${active 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'text-gray-700 hover:bg-gray-50'
                              }
                              ${isActiveLink(item.path) ? 'bg-blue-100 text-blue-800 font-medium' : ''}
                            `}
                            role="menuitem"
                            aria-current={isActiveLink(item.path) ? 'page' : undefined}
                          >
                            {item.icon && (
                              <item.icon 
                                className={`
                                  w-5 h-5 mt-0.5 flex-shrink-0
                                  ${active || isActiveLink(item.path) 
                                    ? 'text-blue-600' 
                                    : 'text-gray-400'
                                  }
                                `}
                                aria-hidden="true"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {item.badge && (
                              <span className="
                                inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                bg-blue-100 text-blue-800
                              ">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              )}
            </Menu>
          </div>
        ))}
    </nav>
  );
};

export default DesktopNavigation;