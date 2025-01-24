import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
      
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif mb-4 text-accent-cream">Shivam Decorators</h3>
            <p className="text-sm text-accent-beige/80 leading-relaxed">
              Transform your events into unforgettable experiences with our elegant decoration services.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-serif mb-4 text-accent-cream">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-accent-beige/80 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-0.5 bg-accent-beige/40 mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="#services" className="text-sm text-accent-beige/80 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-0.5 bg-accent-beige/40 mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="#gallery" className="text-sm text-accent-beige/80 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-0.5 bg-accent-beige/40 mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-sm text-accent-beige/80 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-0.5 bg-accent-beige/40 mr-2 group-hover:w-3 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-serif mb-4 text-accent-cream">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-sm text-accent-beige/80 flex items-center">
                <svg className="w-4 h-4 mr-3 text-accent-beige/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@shivamdecorators.com
              </li>
              <li className="text-sm text-accent-beige/80 flex items-center">
                <svg className="w-4 h-4 mr-3 text-accent-beige/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </li>
              <li className="text-sm text-accent-beige/80 flex items-center">
                <svg className="w-4 h-4 mr-3 text-accent-beige/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Decoration Street, City, State 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-accent-beige/10 mt-12 pt-8 text-center">
          <p className="text-sm text-accent-beige/60">&copy; {new Date().getFullYear()} Shivam Decorators. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};