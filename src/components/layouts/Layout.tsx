import Footer from '../Navigation/Footer';
import Header from '../Navigation/Header';

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
    <Header/>
      <main>{children}</main>
      <div className='fixed bottom-0'>
      <Footer />
      </div>
 
    </>
  );
};

export default Layout;
