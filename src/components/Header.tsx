import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-accent-cream shadow-sm py-4">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col items-center justify-center space-y-4">
          <Link to="/" className="flex items-center">
            <motion.h1 
              className="text-2xl font-serif text-primary hover:text-primary-dark transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Shivam Decorators
            </motion.h1>
          </Link>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-2 shadow-md border border-secondary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {[
                  { path: "/", label: "Home" },
                  { path: "/services", label: "Services" },
                  { path: "/gallery", label: "Gallery" },
                  { path: "/blog", label: "Blog" },
                  { path: "/contact", label: "Contact" },
                ].map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`relative text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 rounded-full group ${
                        isActive(item.path) ? 'bg-[#E8E1D9]' : ''
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {!isActive(item.path) && (
                        <motion.div 
                          className="absolute inset-0 bg-[#E8E1D9] rounded-full opacity-0 group-hover:opacity-100 -z-0"
                          initial={false}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};