import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const NewNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Livros', href: '/livros' },
    { name: 'Cursos', href: '/cursos' },
    {
      name: 'Especialidades',
      dropdown: [
        { name: 'Saúde do Atleta', href: '/saude-atleta' },
        { name: 'Unidade Hospitalar', href: '/unidade-hospitalar' },
        { name: 'Saúde do Idoso', href: '/saude-idoso' },
        { name: 'Neurofuncional', href: '/neurofuncional' },
      ],
    },
    {
      name: 'Mais',
      dropdown: [
        { name: 'Calculadoras', href: '/calculadoras' },
        { name: 'Sobre', href: '/sobre' },
        { name: 'Contato', href: '/contato' },
      ],
    },
  ];

  const NavLinks = ({ isMobile = false }) => (
    navigation.map((item) => (
      item.dropdown ? (
        <div key={item.name} className="relative group">
          <button className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${isMobile ? 'w-full text-left' : ''}`}>
            {item.name} <ChevronDown size={16} />
          </button>
          <div className={`absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg ${isMobile ? 'relative' : 'hidden group-hover:block'}`}>
            {item.dropdown.map((subItem) => (
              <Link
                key={subItem.href}
                to={subItem.href}
                className={`block px-4 py-2 text-sm ${location.pathname === subItem.href ? 'text-teal-600' : 'text-gray-700'} hover:bg-gray-100`}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link
          key={item.href}
          to={item.href}
          className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.href ? 'text-teal-600' : 'text-gray-700'} hover:text-teal-600`}
        >
          {item.name}
        </Link>
      )
    ))
  );

  return (
    <nav>
      <div className="hidden md:flex items-center gap-4">
        <NavLinks />
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-white shadow-lg p-4">
          <div className="flex flex-col gap-4">
            <NavLinks isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NewNavbar;
