import { motion } from "framer-motion";
import Navbar from './Navbar';
import Footer from './Footer';
import StarBackground from './StarBackground';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <StarBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 