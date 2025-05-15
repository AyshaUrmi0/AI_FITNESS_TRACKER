import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Close drawer when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="bg-gray-200 text-gray-800 shadow-lg hover:bg-pink-200 transition-colors">
      <div className="container mx-auto px-4">
        {/* Desktop navbar */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/logo.png"
              alt="Gym Management Logo" 
              className="h-10 w-10"
            />
            <h1 className="text-xl font-bold text-blue">FitSync Pro</h1>
          </div>
          
          {/* Desktop menu */}
          <ul className="hidden md:flex gap-6 items-center">
            <li><Link to="/" className="hover:text-pink-600 transition-colors">Home</Link></li>
            <li><Link to="/chat" className="hover:text-pink-600 transition-colors">AI Coach</Link></li>
            <li><Link to="/workout" className="hover:text-pink-600 transition-colors">Workouts</Link></li>
            <li><Link to="/diet" className="hover:text-pink-600 transition-colors">Nutrition</Link></li>
            <li>
              <Link to="/profile" className="btn btn-sm btn-outline border-gray-400 text-gray-700 hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                My Profile
              </Link>
            </li>
          </ul>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-pink-300 focus:outline-none"
            onClick={toggleDrawer}
            aria-label="Toggle menu"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile drawer */}
      <div className={`drawer-side md:hidden z-50 ${isDrawerOpen ? "drawer-open" : ""}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleDrawer}></div>
        <aside 
          className={`fixed top-0 bottom-0 right-0 w-64 bg-gray-100 transition-transform duration-300 ease-in-out transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } shadow-xl p-4`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/logo.png"
                alt="Gym Management Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-lg font-bold text-gray-800">FitSync Pro</h1>
            </div>
            <button 
              className="p-2 rounded-md hover:bg-pink-200"
              onClick={toggleDrawer}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <ul className="flex flex-col gap-4">
            <li><Link to="/" className="block py-2 hover:bg-pink-200 px-3 rounded-md" onClick={toggleDrawer}>Home</Link></li>
            <li><Link to="/chat" className="block py-2 hover:bg-pink-200 px-3 rounded-md" onClick={toggleDrawer}>AI Coach</Link></li>
            <li><Link to="/workout" className="block py-2 hover:bg-pink-200 px-3 rounded-md" onClick={toggleDrawer}>Workouts</Link></li>
            <li><Link to="/diet" className="block py-2 hover:bg-pink-200 px-3 rounded-md" onClick={toggleDrawer}>Nutrition</Link></li>
            <li className="mt-4">
              <Link 
                to="/profile" 
                className="btn btn-sm btn-outline w-full border-gray-400 text-gray-700 hover:bg-pink-400 hover:border-pink-400 hover:text-white"
                onClick={toggleDrawer}
              >
                My Profile
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </nav>
  );
}
