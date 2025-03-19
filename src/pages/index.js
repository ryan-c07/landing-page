import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import AnimatedSkills from "../components/AnimatedSkills";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "../utils/animations";

const projects = [
  {
    title: "Pantry Tracker",
    description: "AI-powered inventory & recipe generator that helps users manage their pantry and discover new recipes based on available ingredients.",
    technologies: ["React.js", "Next.js", "OpenAI API"],
    github: "https://github.com/ryan-c07/pantry-tracker",
  },
  {
    title: "Nue-Trivia",
    description: "An educational game designed to teach young audiences about nutrition through interactive trivia. Features custom-made sprites, AI-generated questions, and an engaging point system to make learning about healthy eating fun and accessible.",
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
          className="py-12 sm:py-20 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              >
                Hi, I'm Ryan Chen
                <motion.span
                  variants={fadeInUp}
                  className="block text-yellow-500 mt-2"
                >
                  Software Engineer
                </motion.span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-white/80"
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
                    className="inline-flex items-center justify-center px-6 py-3 border border-yellow-500 text-base font-medium rounded-md text-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black transition-colors w-full sm:w-auto"
                  >
                    View My Work
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://drive.google.com/file/d/1XI1IDOiqZwFMa5mPpvDlmtYtHmZMa5V7/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-yellow-500/20 text-base font-medium rounded-md text-white bg-black hover:border-yellow-500 hover:text-yellow-500 transition-colors w-full sm:w-auto"
                  >
                    View Resume
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="relative w-full rounded-lg overflow-hidden order-1 lg:order-2"
              style={{ 
                aspectRatio: '565/827',
                maxWidth: '100%',
                maxHeight: '600px'
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          className="py-12 sm:py-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-bold mb-8 text-center"
          >
            Skills & Technologies
          </motion.h2>
          <AnimatedSkills />
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          variants={fadeInUp}
          className="py-12 sm:py-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-bold mb-8"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-black border border-yellow-500/20 rounded-lg overflow-hidden h-full"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-500">{project.title}</h3>
                  <p className="text-white/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    View on GitHub
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
  );
}
