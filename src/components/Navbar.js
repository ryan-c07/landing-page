import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navVariants } from '../utils/animations';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm'
      } border-b border-yellow-500/20`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-bold text-black">RC</span>
              </motion.div>
              <span className="font-bold text-xl text-yellow-500 hidden sm:inline">Ryan Chen</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.path}
                  className="relative group"
                >
                  <span className="text-white hover:text-yellow-500 transition-colors">
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1XI1IDOiqZwFMa5mPpvDlmtYtHmZMa5V7/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="sm:hidden p-2 text-white hover:text-yellow-500 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-5 flex flex-col justify-between"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-full h-0.5 bg-current transform origin-left"
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 45, y: -2 }
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-current"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-current transform origin-left"
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: -45, y: 2 }
                }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4"
                  >
                    <Link
                      href={item.path}
                      className="text-white hover:text-yellow-500 transition-colors block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  className="px-4"
                >
                  <a
                    href="https://drive.google.com/file/d/1XI1IDOiqZwFMa5mPpvDlmtYtHmZMa5V7/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Resume
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar; 