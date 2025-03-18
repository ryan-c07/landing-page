import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const skillDescriptions = {
  'Python': 'Machine Learning & Data Analysis',
  'JavaScript': 'Frontend Development & Interactive UIs',
  'TypeScript': 'Type-safe Application Development',
  'React': 'Building Modern Web Applications',
  'Next.js': 'Server-side Rendering & Static Sites',
  'Node.js': 'Backend API Development',
  'Machine Learning': 'AI Model Development & Training',
  'TensorFlow': 'Deep Learning & Neural Networks',
  'PyTorch': 'Research & Computer Vision',
  'AWS': 'Cloud Infrastructure & Deployment',
  'Docker': 'Containerization & DevOps',
  'Git': 'Version Control & Collaboration'
};

const SkillNode = ({ skill, position, connections, isActive, onHover, index, totalSkills, containerInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -20% 0px",
    amount: 0.1
  });

  const calculateInitialPosition = () => {
    const angle = (index / totalSkills) * Math.PI * 2;
    const offsetDistance = 1000;
    const normalizedX = Math.cos(angle);
    const normalizedY = Math.sin(angle);

    return {
      x: position.x + normalizedX * offsetDistance,
      y: position.y + normalizedY * offsetDistance
    };
  };

  const initialPos = calculateInitialPosition();

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        position: 'absolute',
        pointerEvents: isInView ? 'auto' : 'none'
      }}
      initial={{ 
        x: initialPos.x,
        y: initialPos.y,
        opacity: 0,
        scale: 0.5
      }}
      animate={containerInView ? {
        x: position.x,
        y: position.y,
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 80,
          mass: 1,
          duration: 1,
          delay: index * 0.1,
          opacity: { duration: 0.5 }
        }
      } : {}}
    >
      {/* Connection lines */}
      {isInView && connections.map((connection, idx) => (
        <motion.div
          key={idx}
          className="absolute bg-yellow-500/10"
          style={{
            width: `${connection.distance}px`,
            height: '2px',
            transform: `rotate(${connection.angle}deg)`,
            transformOrigin: 'left center',
            opacity: isActive ? 0.3 : 0.1
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isActive ? [0.1, 0.3, 0.1] : 0.1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Skill node */}
      <motion.div
        className="relative"
        onMouseEnter={() => onHover(skill)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: skill.color }}
          animate={{
            scale: isActive ? [1, 1.5, 1] : 1,
            opacity: isActive ? [0.2, 0, 0.2] : 0.1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Icon container */}
        <motion.div
          className="relative z-10 p-4 rounded-full bg-black border-2"
          style={{ 
            borderColor: skill.color,
            color: isActive ? skill.color : 'white'
          }}
          whileHover={{ scale: 1.2 }}
        >
          <FontAwesomeIcon icon={skill.icon} className="text-xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Side description component
const SideDescription = ({ skill }) => (
  <div className="absolute right-0 top-0 w-72 h-full flex items-center">
    <AnimatePresence mode="wait">
      {skill && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full p-6"
        >
          <motion.div
            className="bg-black border border-yellow-500 rounded-lg p-6 shadow-lg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <h3 
              className="text-xl font-semibold mb-2" 
              style={{ color: skill.color }}
            >
              {skill.name}
            </h3>
            <p className="text-white/80">{skill.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function NeuralSkills({ skills }) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Single useInView for the entire container
  const containerInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px"
  });

  const calculatePositions = () => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth - 288; // Subtract side panel width
    const height = containerRef.current.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    // Calculate positions in a circular pattern
    const newPositions = skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y };
    });

    // Calculate connections between nodes
    const newConnections = newPositions.map((pos1, i) => {
      const nodeConnections = [];
      newPositions.forEach((pos2, j) => {
        if (i !== j) {
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          if (distance < radius) {
            nodeConnections.push({ distance, angle });
          }
        }
      });
      return nodeConnections;
    });

    setPositions(newPositions);
    setConnections(newConnections);
  };

  useEffect(() => {
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [skills.length]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex"
    >
      {/* Main network container */}
      <div className="flex-1 relative">
        {skills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={positions[index] || { x: 0, y: 0 }}
            connections={connections[index] || []}
            isActive={activeSkill?.name === skill.name}
            onHover={setActiveSkill}
            index={index}
            totalSkills={skills.length}
            containerInView={containerInView}
          />
        ))}
      </div>

      {/* Side description panel */}
      <SideDescription skill={activeSkill} />
    </div>
  );
} 