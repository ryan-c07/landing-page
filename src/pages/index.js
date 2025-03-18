import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import AnimatedSkills from "../components/AnimatedSkills";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "../utils/animations";
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
    icon: faJs, // Using JS icon as fallback
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
    name: 'Kotlin',
    description: 'Modern Android development language, offering improved syntax and features over Java for mobile app development.',
    icon: faJava, // Using Java icon as fallback
    color: '#7F52FF'
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

const projects = [
  {
    title: "Pantry Tracker",
    description: "AI-powered inventory & recipe generator that helps users manage their pantry and discover new recipes based on available ingredients.",
    technologies: ["React.js", "Next.js", "OpenAI API"],
    github: "https://github.com/ryan-c07/pantry-tracker",
  },
  {
    title: "Nue-Trivia",
    description: "An educational game designed to teach young audiences about nutrition through interactive trivia. Features custom-made sprites, AI-generated questions, and an engaging point system to make learning about healthy eating fun and accessible.",    technologies: ["React", "OpenAI API", "Node.js"],
    technologies: ["Java", "OpenAI API", "JPanel"],
    github: "https://github.com/ryan-c07/ai-flashcards",
  },
  
  // {
  //   title: "Esports Tracker",
  //   description: "Automated match tracking & analytics platform for esports teams and players, providing detailed performance insights.",
  //   technologies: ["Python", "Flask", "SQLite"],
  //   github: "https://github.com/ryan-c07/esports-tracker"
  // }
];

export default function Home() {
  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <motion.section
          variants={staggerContainer}
          className="py-20 sm:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold tracking-tight"
              >
                Hi, I'm Ryan Chen
                <motion.span
                  variants={fadeInUp}
                  className="block text-yellow-500"
                >
                  Software Engineer
                </motion.span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/80"
              >
                Specializing in AI, ML, and full-stack development. Passionate about building innovative solutions and exploring the frontiers of artificial intelligence.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center px-6 py-3 border border-yellow-500 text-base font-medium rounded-md text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    View My Work
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://drive.google.com/file/d/1XI1IDOiqZwFMa5mPpvDlmtYtHmZMa5V7/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-yellow-500/20 text-base font-medium rounded-md text-white bg-black hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                  >
                    View Resume
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="relative w-full rounded-lg overflow-hidden pt-12"
              style={{ 
                height: 'calc((827/565) * 100%)',
                minHeight: '500px'
              }}
            >
              {/* Profile Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/me.png"
                  alt="Ryan Chen"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient Overlay */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(to right bottom, rgba(255, 223, 0, 0.2), rgba(0, 0, 0, 0.3))",
                      "linear-gradient(to right bottom, rgba(0, 0, 0, 0.3), rgba(255, 223, 0, 0.2))",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 opacity-40"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          variants={fadeInUp}
          className="py-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold mb-8 text-center"
          >
            Skills & Technologies
          </motion.h2>
          <AnimatedSkills skills={skills} />
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          variants={fadeInUp}
          className="py-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold mb-8"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-black border border-yellow-500/20 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-500">{project.title}</h3>
                  <p className="text-white/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs border border-yellow-500/20 rounded-full text-yellow-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-yellow-500 transition-colors"
                    >
                      View on GitHub
                    </motion.a> 
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
  );
}
