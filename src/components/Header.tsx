import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between py-4">
            <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <motion.h1 
                className="text-xl md:text-2xl font-serif text-[#8B4513] hover:text-[#6B3410] transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Shivam Decorators
              </motion.h1>
            </Link>
            <button 
              className="md:hidden text-[#8B4513] p-2 hover:bg-[#8B4513]/10 rounded-full transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <AnimatePresence>
            {(isMenuOpen || !window.matchMedia('(max-width: 768px)').matches) && (
              <motion.div 
                className="w-full md:w-auto bg-white md:bg-transparent"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NavigationMenu className="w-full">
                  <NavigationMenuList className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto p-4 md:p-0">
                    {[
                      { path: "/", label: "Home" },
                      { path: "/services", label: "Services" },
                      { path: "/gallery", label: "Gallery" },
                      { path: "/blog", label: "Blog" },
                      { path: "/contact", label: "Contact" },
                    ].map((item) => (
                      <NavigationMenuItem key={item.path} className="w-full md:w-auto">
                        <Link 
                          to={item.path} 
                          className={`
                            relative w-full md:w-auto text-center text-base font-medium 
                            ${location.pathname === item.path ? 'text-[#8B4513]' : 'text-gray-600'} 
                            hover:text-[#8B4513] transition-colors px-4 py-2 rounded-full block
                            hover:bg-[#8B4513]/10
                          `}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};