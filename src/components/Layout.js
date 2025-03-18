import { motion } from "framer-motion";
import Navbar from './Navbar';
import Footer from './Footer';
import StarBackground from './StarBackground';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <StarBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 