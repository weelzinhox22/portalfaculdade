import Header from './Header';
import Footer from './Footer';
import PrivacyNotice from './PrivacyNotice';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />

      {/* Privacy Notice */}
      <PrivacyNotice />
    </div>
  );
};

export default Layout;