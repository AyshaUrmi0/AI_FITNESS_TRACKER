import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Dumbbell,
  Apple,
  LogIn,
  LogOut,
  Menu,
  X,
  UserCircle,
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Fake auth state

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/chat', label: 'AI Coach', icon: MessageCircle },
    { to: '/workout', label: 'Workout', icon: Dumbbell },
    { to: '/diet', label: 'Diet', icon: Apple },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0c0c0c] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-orange-500">FitnessAI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-gray-50 hover:text-orange-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
                <UserCircle className="w-7 h-7 text-orange-500" />
              </>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/login'
                    ? 'bg-orange-500 text-white'
                    : 'text-white hover:bg-gray-50 hover:text-orange-500'
                }`}
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-orange-500" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-[#0c0c0c] z-50 shadow-2xl flex flex-col p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-orange-500">FitnessAI</span>
              <button
                className="p-2 rounded-lg hover:bg-blue-50"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-orange-500" />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map(({ to, label, icon: Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-lg transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-white hover:bg-gray-50 hover:text-orange-500'
                    }`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              {/* Auth buttons mobile */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-lg text-white hover:text-orange-500 hover:bg-gray-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                  <div className="flex items-center space-x-2 px-4 text-white">
                    <UserCircle className="w-6 h-6 text-orange-500" />
                    <span>Welcome</span>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-lg transition-colors ${
                    location.pathname === '/login'
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-gray-50 hover:text-orange-500'
                  }`}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </nav>
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
