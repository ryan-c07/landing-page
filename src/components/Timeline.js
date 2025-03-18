import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TimelineEvent = ({ date, title, subtitle, description, year, links, isLongTerm }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      className={`relative ${isLongTerm ? 'min-h-[300px] sm:min-h-[400px]' : 'min-h-[250px] sm:min-h-[300px]'}`}
    >
      {/* Event marker */}
      <motion.div
        className="w-3 h-3 rounded-full absolute left-0 -translate-x-1/2 bg-yellow-500/50"
        initial={{ scale: 0 }}
        animate={isInView ? { 
          scale: 1,
          backgroundColor: "#EAB308"
        } : {}}
        transition={{ duration: 0.3 }}
        style={{ top: "2rem" }}
      />

      {/* Event content */}
      <div className="ml-4 sm:ml-6">
        <motion.div
          className="bg-black border rounded-lg overflow-hidden"
          initial={{ 
            width: '100%',
            opacity: 0,
            y: 20,
            borderColor: 'rgba(234, 179, 8, 0.2)'
          }}
          animate={isInView ? {
            width: '100%',
            opacity: 1,
            y: 0,
            borderColor: 'rgb(234, 179, 8)'
          } : {}}
          transition={{ 
            duration: 0.5,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            maxWidth: 'min(32rem, 90vw)'
          }}
        >
          <motion.div 
            className="p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-yellow-500">{date}</h3>
                <h4 className="text-base sm:text-lg font-semibold text-white mt-1">{title}</h4>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-4"
            >
              <p className="text-sm sm:text-base text-white/60 mb-4">{subtitle}</p>
              <ul className="space-y-2">
                {description.map((item, index) => (
                  <motion.li
                    key={index}
                    className="text-sm sm:text-base text-white/80 flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="mr-2 mt-1.5">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              {links && (
                <motion.div
                  className="mt-4 flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const timelineData = [
  {
    year: "2021-Present",
    date: "September 2021 - Present",
    title: "Brooklyn Technical High School",
    subtitle: "Software Engineering Major",
    description: [
      "Pursuing software engineering specialization with focus on AI and full-stack development",
      "Engaged in advanced coursework covering programming fundamentals, data structures, and algorithms",
      "Participated in various coding competitions and hackathons",
      "Developed strong foundation in computer science principles"
    ],
    isLongTerm: true
  },
  {
    date: "Apr 2024 - May 2024",
    title: "NYCDOE DIIT Project",
    subtitle: "Project Lead",
    description: [
      "Led initiative for standardizing official transcripts",
      "Created detailed proposals with UML diagrams and system analyses",
      "Researched and documented NYC public school record systems",
      "Developed scenarios for record request handling and delivery",
      "Presented findings to stakeholders and implemented feedback"
    ],
  },
  {
    date: "Jul 2024 - Aug 2024",
    title: "NYCDOE DIIT Internship",
    subtitle: "Technology Innovation Intern",
    description: [
      "Led TeachHub improvement initiative",
      "Conducted comprehensive user research with K-12 students and teachers",
      "Organized and analyzed qualitative and quantitative data",
      "Created detailed reports summarizing key findings",
      "Pitched recommendations to CIO and executive leadership",
      "Implemented approved changes to improve platform usability"
    ],
    links: [
      {
        label: "View on LinkedIn",
        url: "https://www.linkedin.com/posts/ryanchen07_6-weeks-of-exploration-innovation-and-activity-7231513728662319104-EuDI?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEf8ik4B9WSjpukXzC5w8y054RvBVpvkYWE",
        icon: "→"
      }
    ]
  },
  {
    date: "Jul 2024 - Sept 2024",
    title: "Headstarter AI Fellowship",
    subtitle: "Software Engineering Fellow",
    description: [
      "Developed AI-driven projects including Pantry Tracker and AI Flashcards",
      "Built scalable solutions using Next.js, Material UI, and OpenAI's API",
      "Collaborated with team members on AI Customer Support system",
      "Participated in technical mock interviews and professional development",
      "Gained hands-on experience with modern AI/ML technologies"
    ],
    links: [
      {
        label: "View on LinkedIn",
        url: "https://www.linkedin.com/in/ryanchen07/",
        icon: "→"
      }
    ]
  },
  {
    date: "October 4, 2024",
    title: "Divergent Hackathon Winner",
    subtitle: "AI Innovation Award",
    description: [
      "Won first place in competitive hackathon",
      "Built an innovative AI-powered question generator",
      "Demonstrated practical application of AI technology",
      "Presented solution to panel of industry judges",
      "Received recognition for technical excellence"
    ],
    links: [
      {
        label: "View on LinkedIn",
        url: "https://www.linkedin.com/posts/ryanchen07_first-hackathon-win-at-divergent-hackathon-activity-7249225236850573313-kJIP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEf8ik4B9WSjpukXzC5w8y054RvBVpvkYWE",
        icon: "→"
      }
    ]
  }
];

export default function Timeline() {
  return (
    <div className="relative py-24">
      {/* Main timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-yellow-500/20" />

      {/* Year markers - Now positioned at the start */}
      <div className="relative mb-32">
        {["2021", "2022", "2023", "2024"].map((year, index) => (
          <motion.div
            key={year}
            className="flex items-center mb-16"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute left-8 w-4 h-0.5 bg-yellow-500/20 -translate-x-2" />
            <span className="absolute left-12 text-yellow-500/40 text-sm">
              {year}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Timeline events */}
      <div className="ml-8 space-y-32">
        {timelineData.map((event, index) => (
          <TimelineEvent
            key={index}
            {...event}
          />
        ))}
      </div>
    </div>
  );
}