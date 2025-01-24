import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Header = () => {
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
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className="relative text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 group"
                  >
                    <span className="relative z-10">Home</span>
                    <motion.div 
                      className="absolute inset-0 bg-accent-beige rounded-full opacity-0 group-hover:opacity-100 -z-0"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/services" 
                    className="relative text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 group"
                  >
                    <span className="relative z-10">Services</span>
                    <motion.div 
                      className="absolute inset-0 bg-accent-beige rounded-full opacity-0 group-hover:opacity-100 -z-0"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/gallery" 
                    className="relative text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 group"
                  >
                    <span className="relative z-10">Gallery</span>
                    <motion.div 
                      className="absolute inset-0 bg-accent-beige rounded-full opacity-0 group-hover:opacity-100 -z-0"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/blog" 
                    className="relative text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 group flex items-center"
                  >
                    <span className="relative z-10">Blog</span>
                    <motion.div 
                      className="absolute inset-0 bg-accent-beige rounded-full opacity-0 group-hover:opacity-100 -z-0"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    to="/contact" 
                    className="relative text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 group"
                  >
                    <span className="relative z-10">Contact</span>
                    <motion.div 
                      className="absolute inset-0 bg-accent-beige rounded-full opacity-0 group-hover:opacity-100 -z-0"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};