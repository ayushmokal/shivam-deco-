import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif text-primary">Shivam Decorators</h1>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/services" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Services
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/gallery" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Gallery
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
};