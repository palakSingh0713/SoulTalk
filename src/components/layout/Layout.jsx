import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  
 
  const noNavbarPages = ['/chat'];
  const showNavbar = !noNavbarPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      {showNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;