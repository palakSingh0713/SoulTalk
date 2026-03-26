import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import Profile from './pages/Profile'; 
import History from './pages/History';
import CreateCharacter from './pages/CreateCharacter';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Marketplace from './pages/Marketplace';
import ForgotPassword from './pages/ForgotPassword'; // ✅ ADDED

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

const RootLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <Layout />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',   // ✅ NEW ROUTE ADDED
        element: <ForgotPassword />,
      },
      {
        path: 'explore',
        element: (
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        ),
      },
      {
        path: 'chat',
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'history',
        element: (
          <PrivateRoute>
            <History />
          </PrivateRoute>
        ),
      },
      {
        path: 'create-character',
        element: (
          <PrivateRoute>
            <CreateCharacter />
          </PrivateRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: 'marketplace',
        element: (
          <PrivateRoute>
            <Marketplace />
          </PrivateRoute>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);