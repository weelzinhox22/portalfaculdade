import Header from './Header';
import Footer from './Footer';
import StickyAd from './StickyAd';
import PrivacyNotice from './PrivacyNotice';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />

      {/* Anúncio Flutuante */}
      <StickyAd
        position="bottom-right"
        size="small"
        slot="sticky-global"
        autoHide={false}
      />

      {/* Privacy Notice */}
      <PrivacyNotice />
    </div>
  );
};

export default Layout;