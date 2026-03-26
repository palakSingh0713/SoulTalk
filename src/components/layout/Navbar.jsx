import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Compass, MessageCircle, User, Users, LogOut, 
  Settings, ChevronDown, History
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/chat', label: 'Chat', icon: MessageCircle },
    { to: '/history', label: 'History', icon: History },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return '?';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="navbar-logo-icon"
            >
              💜
            </motion.div>
            <div className="navbar-logo-text">
              <span className="text-gradient-animate">SoulTalk</span>
              <span className="navbar-logo-subtitle">AI Companion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? 'navbar-link-active' : ''}`}
              >
                <link.icon className="navbar-link-icon" />
                <span>{link.label}</span>
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeNav"
                    className="navbar-link-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="user-menu-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="user-menu-trigger"
                >
                  <div className="avatar avatar-md">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user.name} />
                    ) : (
                      <span>{getUserInitials()}</span>
                    )}
                    <div className="avatar-status online" />
                  </div>
                  <span className="user-menu-name">{user?.name}</span>
                  <ChevronDown className={`user-menu-chevron ${showUserMenu ? 'rotated' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="user-menu-dropdown glass-effect-strong"
                    >
                      <div className="user-menu-header">
                        <div className="avatar avatar-lg">
                          {user?.profileImage ? (
                            <img src={user.profileImage} alt={user.name} />
                          ) : (
                            <span>{getUserInitials()}</span>
                          )}
                        </div>
                        <div className="user-menu-info">
                          <p className="user-menu-display-name">{user?.name}</p>
                          <p className="user-menu-email">{user?.email}</p>
                        </div>
                      </div>
                      
                      <div className="user-menu-divider" />
                      
                      <div className="user-menu-items">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="user-menu-item"
                        >
                          <User size={18} />
                          <span>Profile Settings</span>
                        </Link>
                        
                        <Link
                          to="/history"
                          onClick={() => setShowUserMenu(false)}
                          className="user-menu-item"
                        >
                          <History size={18} />
                          <span>Chat History</span>
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="user-menu-item"
                        >
                          <Settings size={18} />
                          <span>Settings</span>
                        </Link>
                      </div>

                      <div className="user-menu-divider" />
                      
                      <button
                        onClick={handleLogout}
                        className="user-menu-item user-menu-logout"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="navbar-auth-buttons">
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-ghost btn-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-primary btn-sm"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar-mobile-toggle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="navbar-mobile-menu glass-effect-strong"
          >
            <div className="navbar-mobile-content">
              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`navbar-mobile-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="navbar-mobile-divider" />

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="navbar-mobile-link"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="navbar-mobile-link"
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </Link>

                  <Link to="/marketplace">
                  <Users size={18} />
                                       <span>Marketplace</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="navbar-mobile-link logout"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="navbar-mobile-auth">
                  <button
                    onClick={() => navigate('/login')}
                    className="btn btn-secondary"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="btn btn-primary"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;