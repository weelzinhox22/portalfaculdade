import Header from './Header';
import Footer from './Footer';
import StickyAd from './StickyAd';

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
    </div>
  );
};

export default Layout;