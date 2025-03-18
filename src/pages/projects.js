import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { fadeInUp, staggerContainer } from "../utils/animations";

const projects = [
  {
    title: "Pantry Tracker",
    description: "AI-powered inventory & recipe generator that helps users manage their pantry and discover new recipes based on available ingredients. The application uses advanced natural language processing to understand ingredients and generate personalized recipe recommendations.",
    technologies: ["React.js", "Next.js", "OpenAI API"],
    features: [
      "Real-time inventory management",
      "AI-powered recipe suggestions",
      "Ingredient expiration tracking",
      "Shopping list generation",
      "Nutritional information analysis"
    ],
    github: "https://github.com/ryan-c07/pantry-tracker",
    demo: "https://pantry-tracker.demo.com",
    video: "https://www.youtube.com/watch?v=1xDUebEPZEA",
    image: "/projects/pantry-tracker.png"
  },
  {
    title: "Nue-Trivia",
    description: "An educational game designed to teach young audiences about nutrition through interactive trivia. Features custom-made sprites, AI-generated questions, and an engaging point system to make learning about healthy eating fun and accessible.",
    technologies: ["Java", "OpenAI API", "JFrame", "JPanel", "GPT4-mini"],
    features: [
      "Custom-designed original sprites",
      "AI-powered question generation",
      "Interactive Q&A gameplay",
      "Point-based reward system",
      "Child-friendly nutrition education"
    ],
    github: "https://github.com/ryan-c07/nue-trivia",
    video: "https://www.youtube.com/watch?v=_xb2x3qkbf0",
    presentation: "https://docs.google.com/presentation/d/1TAS6zXIvuiCuxVLqjDMq7L64HEx7EBCSqw7GrfQsFyQ/edit#slide=id.g33d9a80511_1_20"
  },
  // {
  //   title: "Esports Tracker",
  //   description: "Automated match tracking & analytics platform for esports teams and players. The application provides detailed performance insights and helps teams improve their strategies through data analysis.",
  //   technologies: ["Python", "Flask", "SQLite", "TensorFlow", "Pandas"],
  //   features: [
  //     "Real-time match analysis",
  //     "Performance metrics tracking",
  //     "Team statistics",
  //     "Strategy recommendations",
  //     "Tournament management"
  //   ],
  //   github: "https://github.com/ryan-c07/esports-tracker",
  //   image: "/projects/esports-tracker.png"
  // }
];

export default function Projects() {
  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold mb-12"
        >
          Projects
        </motion.h1>

        <motion.div
          variants={staggerContainer}
          className="space-y-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              className="bg-black border border-yellow-500/20 rounded-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Project Info */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-yellow-500">
                    {project.title}
                  </h2>
                  <p className="text-white/80">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm border border-yellow-500/20 rounded-full text-yellow-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-white/80">
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-yellow-500 rounded-md text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                    >
                      View on GitHub
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-yellow-500/20 rounded-md text-white hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.presentation && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.presentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-yellow-500/20 rounded-md text-white hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                      >
                        View Presentation
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Image/Video */}
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  {/* Larger Gradient Backdrop */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(to right bottom, rgba(255, 223, 0, 0.1), rgba(0, 0, 0, 0.2))",
                        "linear-gradient(to right bottom, rgba(0, 0, 0, 0.2), rgba(255, 223, 0, 0.1))",
                      ],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -inset-4 scale-110 blur-sm opacity-50"
                  />
                  
                  {/* Video Container with Padding */}
                  {project.video ? (
                    <div className="relative w-full h-full p-4">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"></div>
                        <iframe
                          className="absolute inset-0 w-full h-full border-0"
                          src={`https://www.youtube.com/embed/${project.video.split('v=')[1]}`}
                          title={`${project.title} Demo Video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      animate={{
                        background: [
                          "linear-gradient(to right bottom, rgba(255, 223, 0, 0.2), rgba(255, 223, 0, 0.1))",
                          "linear-gradient(to right bottom, rgba(255, 223, 0, 0.1), rgba(255, 223, 0, 0.2))",
                        ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="absolute inset-0 opacity-75"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Layout>
  );
} 