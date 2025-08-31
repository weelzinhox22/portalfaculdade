import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { X, ChevronDown, Home, HelpCircle, Mail, User, Settings, Bell } from 'lucide-react';
import { navigationGroups, mobileNavigationItems, type NavigationItem, type NavigationGroup } from '../../config/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle swipe to close
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldClose = info.velocity.x > 500 || info.offset.x > 150;
    if (shouldClose) {
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const mainNavItems = mobileNavigationItems.filter(item => !item.parent && !item.requiresAuth);
  const userNavItems = mobileNavigationItems.filter(item => item.requiresAuth);

  const renderNavigationItem = (item: NavigationItem, isSubItem = false) => {
    const IconComponent = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={item.id}
        to={item.path}
        className={`
          flex items-center gap-4 p-4 rounded-lg transition-all duration-200
          ${isSubItem ? 'ml-4 py-3' : 'py-4'}
          ${isActive 
            ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500' 
            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
          }
        `}
        style={{ minHeight: '44px' }}
        onClick={onClose}
      >
        {IconComponent && (
          <IconComponent 
            size={isSubItem ? 18 : 20} 
            className={`flex-shrink-0 ${isActive ? 'text-teal-600' : 'text-gray-500'}`}
          />
        )}
        <div className="flex-1">
          <div className={`font-medium ${isSubItem ? 'text-sm' : 'text-base'}`}>
            {item.label}
          </div>
          {item.description && !isSubItem && (
            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
              {item.description}
            </div>
          )}
        </div>
        {item.badge && (
          <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  const renderNavigationGroup = (group: NavigationGroup) => {
    const GroupIcon = group.icon;

    return (
      <Disclosure key={group.id}>
        {({ open }) => (
          <div className="border-b border-gray-100 last:border-b-0">
            <Disclosure.Button className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center gap-4">
                {GroupIcon && (
                  <GroupIcon size={20} className="text-gray-600 flex-shrink-0" />
                )}
                <span className="font-semibold text-gray-800">{group.label}</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-500 transition-transform duration-200 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </Disclosure.Button>
            
            <AnimatePresence>
              {open && (
                <Disclosure.Panel
                  as={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden bg-gray-25"
                >
                  <div className="pb-2">
                    {group.items.map(item => renderNavigationItem(item, true))}
                  </div>
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </div>
        )}
      </Disclosure>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 lg:hidden"
          style={{ zIndex: 1100 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur effect */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Mobile menu panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              duration: 0.3 
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-sm h-full bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <Link 
                to="/" 
                className="text-xl font-bold text-teal-600 tracking-tight"
                onClick={onClose}
              >
                FisioWel
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                aria-label="Fechar menu"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Navigation content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-4 space-y-2">
                {/* Main navigation items */}
                <div className="space-y-1">
                  {mainNavItems.map(item => renderNavigationItem(item))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-4" />

                {/* Navigation groups (accordion sections) */}
                <div className="space-y-1">
                  {navigationGroups
                    .sort((a, b) => a.order - b.order)
                    .map(group => renderNavigationGroup(group))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-4" />

                {/* User navigation items */}
                <div className="space-y-1">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Conta
                    </h3>
                  </div>
                  {userNavItems.map(item => renderNavigationItem(item))}
                </div>

                {/* Bottom padding for safe scrolling */}
                <div className="h-8" />
              </div>
            </div>

            {/* Drag indicator */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-12 bg-gray-300 rounded-r-full opacity-30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
