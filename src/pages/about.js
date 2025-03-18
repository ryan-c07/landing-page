import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Timeline from "../components/Timeline";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function About() {
  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Bio Section */}
        <motion.section
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold mb-8"
          >
            About Me
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/80 mb-6"
          >
            I'm a senior software major with a strong focus on AI/ML and full-stack development. My journey in technology is driven by a deep passion for AI ethics, research, and creating innovative applications that make a meaningful impact.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/80"
          >
            Beyond coding, I bring diverse experience from my roles as a former Headstarter AI developer and barista at Yaya Tea NYC. I'm also proud of my achievements in competitive esports, where I've ranked 2nd nationally and 1st in state competitions.
          </motion.p>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold mb-12"
          >
            My Journey
          </motion.h2>
          <Timeline />
        </motion.section>
      </motion.div>
    </Layout>
  );
} 