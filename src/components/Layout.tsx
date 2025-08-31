import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PrivacyNotice from './PrivacyNotice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <PrivacyNotice />
    </div>
  );
};

export default Layout;