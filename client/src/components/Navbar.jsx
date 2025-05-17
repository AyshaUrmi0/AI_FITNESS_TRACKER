import { useState, useEffect } from "react";
import { Menu, X, Home, MessageCircle, Dumbbell, Apple, User } from "lucide-react";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle drawer closing on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer when link is clicked
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const navLinks = [
    { to: "#", label: "Home", icon: Home },
    { to: "#", label: "AI Coach", icon: MessageCircle },
    { to: "#", label: "Workouts", icon: Dumbbell },
    { to: "#", label: "Nutrition", icon: Apple },
  ];

  // Custom Link component to replace react-router Link
  const CustomLink = ({ to, className, children, onClick }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
    }`}>
      <div className="container mx-auto px-4">
        {/* Desktop navbar */}
        <div className="flex justify-between items-center">
          <CustomLink to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform group-hover:scale-110">
              FS
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-pink-600 bg-clip-text text-transparent">
              FitSync Pro
            </h1>
          </CustomLink>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.to + link.label}>
                  <CustomLink 
                    to={link.to} 
                    className="px-4 py-2 mx-1 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all flex items-center gap-1.5 font-medium"
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </CustomLink>
                </li>
              ))}
            </ul>
            <div className="ml-2 pl-2 border-l border-gray-200">
              <CustomLink 
                to="#" 
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all"
              >
                <User size={18} />
                <span>My Profile</span>
              </CustomLink>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
            onClick={toggleDrawer}
            aria-label="Toggle menu"
            aria-expanded={isDrawerOpen}
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile drawer - overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile drawer - content */}
      <div 
        className={`fixed top-0 bottom-0 right-0 w-72 bg-white z-50 md:hidden shadow-2xl p-6 transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <CustomLink to="/" className="flex items-center gap-2" onClick={closeDrawer}>
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              FS
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-pink-600 bg-clip-text text-transparent">
              FitSync Pro
            </h1>
          </CustomLink>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.to + link.label}>
              <CustomLink 
                to={link.to} 
                className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-lg transition-colors"
                onClick={closeDrawer}
              >
                <link.icon size={20} className="text-pink-600" />
                <span className="font-medium">{link.label}</span>
              </CustomLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <CustomLink 
            to="#" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={closeDrawer}
          >
            <User size={18} />
            <span className="font-medium">My Profile</span>
          </CustomLink>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© 2025 FitSync Pro</p>
            <p className="mt-1">Your fitness journey, simplified.</p>
          </div>
        </div>
      </div>
    </nav>
  );
}