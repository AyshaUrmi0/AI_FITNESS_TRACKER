import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Dumbbell, Apple, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/chat', label: 'AI Coach', icon: MessageCircle },
    { to: '/workout', label: 'Workout', icon: Dumbbell },
    { to: '/diet', label: 'Diet', icon: Apple },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">FitnessAI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl flex flex-col p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-blue-600">FitnessAI</span>
              <button
                className="p-2 rounded-lg hover:bg-blue-50"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
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