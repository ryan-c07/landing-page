import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPython, faJs, faSwift, faJava, faReact, 
  faNodeJs, faAndroid 
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faTerminal, faBrain } from '@fortawesome/free-solid-svg-icons';

const skills = [
  {
    name: 'Python',
    description: 'Primary language for AI/ML development, data analysis, and automation. Experience with frameworks like TensorFlow and scientific computing libraries.',
    icon: faPython,
    color: '#3776AB'
  },
  {
    name: 'JavaScript',
    description: 'Core language for web development, used extensively in building interactive front-end applications and Node.js backend services.',
    icon: faJs,
    color: '#F7DF1E'
  },
  {
    name: 'TypeScript',
    description: 'Utilized for building type-safe, scalable applications. Enhanced JavaScript development with static typing and modern ECMAScript features.',
    icon: faJs,
    color: '#3178C6'
  },
  {
    name: 'Swift',
    description: 'iOS app development language, used for creating native mobile applications with a focus on performance and user experience.',
    icon: faSwift,
    color: '#F05138'
  },
  {
    name: 'Java',
    description: 'Object-oriented programming for Android development and backend services. Experience with Spring Boot and Android SDK.',
    icon: faJava,
    color: '#007396'
  },
  {
    name: 'React.js',
    description: 'Modern front-end library for building user interfaces, with expertise in hooks, context API, and state management.',
    icon: faReact,
    color: '#61DAFB'
  },
  {
    name: 'SQL',
    description: 'Database management and querying, experienced with PostgreSQL and MySQL for data modeling and complex queries.',
    icon: faDatabase,
    color: '#336791'
  },
  {
    name: 'Node.js',
    description: 'Server-side JavaScript runtime, used for building scalable backend services and RESTful APIs.',
    icon: faNodeJs,
    color: '#339933'
  },
  {
    name: 'Bash',
    description: 'Shell scripting for automation, deployment processes, and system administration tasks.',
    icon: faTerminal,
    color: '#4EAA25'
  },
  {
    name: 'OpenAI API',
    description: 'Integration of AI capabilities into applications, including natural language processing and content generation.',
    icon: faBrain,
    color: '#412991'
  },
  {
    name: 'Android Studio',
    description: 'IDE for Android app development, proficient in UI design, debugging, and app performance optimization.',
    icon: faAndroid,
    color: '#3DDC84'
  }
];

// Mobile SkillCard Component
const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-3 p-4 bg-black border border-yellow-500/20 rounded-lg cursor-pointer"
        style={{
          borderColor: isHovered ? skill.color : 'rgba(234, 179, 8, 0.2)'
        }}
      >
        <FontAwesomeIcon 
          icon={skill.icon} 
          className="w-6 h-6"
          style={{ color: skill.color }}
        />
        <span className="text-white font-medium">{skill.name}</span>
      </motion.div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 w-64 p-4 mt-2 bg-black border border-yellow-500/20 rounded-lg shadow-xl"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: '100%'
          }}
        >
          <p className="text-sm text-white/80">{skill.description}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Desktop Neural Network Components
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

      <motion.div
        className="relative"
        onMouseEnter={() => onHover(skill)}
        onMouseLeave={() => onHover(null)}
      >
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

const NeuralSkills = ({ skills }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [connections, setConnections] = useState([]);
  const [activeSkill, setActiveSkill] = useState(null);
  
  const containerInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px"
  });

  const calculatePositions = () => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth - 288;
    const height = containerRef.current.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    const newPositions = skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y };
    });

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
      <SideDescription skill={activeSkill} />
    </div>
  );
};

// Main AnimatedSkills component with responsive layout
const AnimatedSkills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Switch to mobile layout below 1024px
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      ) : (
        <NeuralSkills skills={skills} />
      )}
    </>
  );
};

export default AnimatedSkills; 