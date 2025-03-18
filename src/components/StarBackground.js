import { motion, useMotionValue, useSpring, animate, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';

const StarBackground = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [connections, setConnections] = useState([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const createShootingStar = useCallback(() => {
    const startX = Math.random() * (windowSize.width + 200) - 100;
    const startY = -50;
    const duration = Math.random() * 2 + 1;
    return {
      id: Math.random(),
      startX,
      startY,
      duration,
    };
  }, [windowSize.width]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      size: Math.random() * 2 + 1,
      blinkDelay: Math.random() * 3,
      velocity: {
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
      }
    }));
    setStars(newStars);

    const initialShootingStars = Array.from({ length: 3 }, createShootingStar);
    setShootingStars(initialShootingStars);

    const interval = setInterval(() => {
      setShootingStars(prev => {
        const filtered = prev.filter(star => star.startY < windowSize.height + 100);
        return [...filtered, createShootingStar()];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [windowSize, createShootingStar]);

  const updateStarPositions = useCallback((deltaTime) => {
    setStars(prevStars => prevStars.map(star => {
      let newX = star.x + star.velocity.x * deltaTime;
      let newY = star.y + star.velocity.y * deltaTime;

      // Wrap around screen edges
      if (newX < 0) newX = windowSize.width;
      if (newX > windowSize.width) newX = 0;
      if (newY < 0) newY = windowSize.height;
      if (newY > windowSize.height) newY = 0;

      return {
        ...star,
        x: newX,
        y: newY,
      };
    }));
  }, [windowSize]);

  const updateConnections = useCallback((timestamp) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      updateStarPositions(deltaTime);
    }
    previousTimeRef.current = timestamp;

    const cursorPos = { x: cursorX.get(), y: cursorY.get() };
    const maxDistance = 150;
    const newConnections = new Map();

    // Find connections between cursor and stars
    stars.forEach(star => {
      const distance = Math.sqrt(
        Math.pow(star.x - cursorPos.x, 2) + Math.pow(star.y - cursorPos.y, 2)
      );
      
      if (distance < maxDistance) {
        const opacity = 1 - (distance / maxDistance);
        newConnections.set(`cursor-${star.id}`, {
          id: `cursor-${star.id}`,
          x1: star.x,
          y1: star.y,
          x2: cursorPos.x,
          y2: cursorPos.y,
          opacity,
        });

        // Find connections between nearby stars
        stars.forEach(otherStar => {
          if (star.id !== otherStar.id) {
            const starDistance = Math.sqrt(
              Math.pow(star.x - otherStar.x, 2) + Math.pow(star.y - otherStar.y, 2)
            );
            
            if (starDistance < maxDistance) {
              const connectionId = [star.id, otherStar.id].sort().join('-');
              if (!newConnections.has(connectionId)) {
                const opacity = 1 - (starDistance / maxDistance);
                newConnections.set(connectionId, {
                  id: connectionId,
                  x1: star.x,
                  y1: star.y,
                  x2: otherStar.x,
                  y2: otherStar.y,
                  opacity: opacity * 0.5,
                });
              }
            }
          }
        });
      }
    });

    setConnections(Array.from(newConnections.values()));
    requestRef.current = requestAnimationFrame(updateConnections);
  }, [stars, cursorX, cursorY, updateStarPositions]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateConnections);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateConnections]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0.4 }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            delay: star.blinkDelay,
            repeat: Infinity,
          }}
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
        />
      ))}

      {/* Star connections */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 223, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 223, 0, 0)" />
          </linearGradient>
        </defs>
        {connections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: connection.opacity }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </svg>

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: star.startX,
            y: star.startY,
            opacity: 1,
            scale: 1,
          }}
          animate={{ 
            x: star.startX - 200,
            y: windowSize.height + 100,
            opacity: [1, 0.8, 0],
            scale: [1, 0.8, 0],
          }}
          transition={{
            duration: star.duration,
            ease: "linear",
          }}
          style={{
            boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}

      {/* Cursor light effect */}
      <motion.div
        className="absolute w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 223, 0, 0.15) 0%, rgba(255, 223, 0, 0.05) 40%, transparent 70%)',
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Secondary cursor light effect */}
      <motion.div
        className="absolute w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

export default StarBackground; 