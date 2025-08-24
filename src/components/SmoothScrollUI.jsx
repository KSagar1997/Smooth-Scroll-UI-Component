/**
 * SmoothScrollUI - A comprehensive scroll animation component using Framer Motion
 *
 * Features:
 * - Scroll progress indicator
 * - Parallax effects
 * - Scroll-triggered animations
 * - Stagger animations
 * - 3D transforms and hover effects
 *
 * Dependencies(used here):
 * - framer-motion: 12.23.12
 * - react: ^19.0.0
 * - tailwindcss: 4.1.12
 * - postcss: 8.5.6
 * - autoprefixer: 10.4.21
 *
 * Usage:
 * At the end of the code
 *
 * -----------------------------
 * Author: Krishna Sagar S Bisht
 * codeName: WallerTech
 * Preview: https://pzx572.csb.app/
 * Portfolio: https://portofolio-krishnasagar.netlify.app/  (-2020 not updated one)
 */

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";

/**
 * Main SmoothScrollUI Component
 * Demonstrates various scroll-based animation techniques
 */
const SmoothScrollUI = () => {
  // Here to track scroll within this container
  const containerRef = useRef(null);

  // useScroll hook tracks scroll progress of container
  // Returns scrollYProgress: 0 at start, 1 at end
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // When to [start,end] track
  });

  // Transform scroll progress into different animation values
  // To smooth interpolations based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Vertical moves
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]); // animation scalevise
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1]); // Opacity to fade

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
    >
      {/* 
        SCROLL PROGRESS BAR - TOP
        Fixed position bar that grows with scroll progress
        Uses scaleX transform for smooth performance
      */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-yellow-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 
        1-----
        HERO SECTION
        Demonstrates scroll-linked transforms and initial animations
      */}
      <section className="h-screen flex items-center justify-center relative">
        {/* Main hero content with scroll-based transforms */}
        <motion.div style={{ y, scale, opacity }} className="text-center z-10">
          {/* 
            ENTRANCE ANIMATIONS
            initial: starting state
            animate: end state
            transition: animate between them
          */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent"
          >
            Smooth Scroll
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300"
          >
            Experience buttery smooth animations
          </motion.p>
        </motion.div>

        {/* 
          FLOATING BACKGROUND ELEMENTS
          Array of dots with timing
        */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`, // Across screen
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0], // Flowing up and down
              scale: [1, 1.2, 1], // Pulse Kind of effect
            }}
            transition={{
              duration: 3 + i * 0.5, // Different speeds for every dot
              repeat: Infinity,
              delay: i * 0.3, // Start times
            }}
          />
        ))}
      </section>

      {/* 2-----
      Implement custom parallax section 
      */}

      <ParallaxSection />

      {/* 
        3-----
        CARDS SECTION
        Here scroll-triggered reveals with staggered time
      */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Animated title with letter-by-letter reveal */}
          <ScrollRevealTitle text="Featured Work" />

          {/* Grid of project cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Project Alpha",
                desc: "Modern web application",
                color: "from-pink-500 to-rose-500",
              },
              {
                title: "Project Beta",
                desc: "Mobile-first design",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Project Gamma",
                desc: "Interactive experience",
                color: "from-green-500 to-emerald-500",
              },
            ].map((project, i) => (
              <ScrollRevealCard
                key={i}
                project={project}
                delay={i * 0.2} // Stagger card animations
              />
            ))}
          </div>
        </div>
      </section>

      {/* 
        4-----
        Skills section with stagger animations 
      */}
      <StaggerSection />

      {/* 
        5-----
        FINAL CTA SECTION
        Simple scroll-triggered with hover interactions
      */}
      <section className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }} // Animate when in viewport
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }} // Trigger 100px before viewport
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Ready to Collaborate?</h2>
          {/* 
            INTERACTIVE BUTTON
            whileHover: state while hovering
            whileTap: state while hovering or click
          */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-white font-semibold text-lg shadow-lg"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

/**
 * ParallaxSection Component
 * Demonstrates parallax scrolling effects with different scroll speeds
 */
const ParallaxSection = () => {
  const ref = useRef(null);

  // Track scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Start before entering, end after leaving
  });

  // Create different transform values from scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Slower scroll speed
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]); // Full rotation

  return (
    <section
      ref={ref}
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background layer moves */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"
      />

      {/* Rotating circle element */}
      <motion.div
        style={{ rotate: rotation }}
        className="w-64 h-64 border-2 border-white/20 rounded-full flex items-center justify-center"
      >
        <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full" />
      </motion.div>

      {/* Text slides */}
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute text-4xl font-bold"
      >
        Parallax Magic
      </motion.h2>
    </section>
  );
};

/**
 * Animates text letter by letter when scrolled into view
 *
 * @param {string} text - The text to animate
 */
const ScrollRevealTitle = ({ text }) => {
  const ref = useRef(null);

  // To check if element in viewport
  const isInView = useInView(ref, {
    once: false, // Can trigger multiple times
    margin: "-50px", // Trigger 50px before viewport
  });

  // Animation controls
  const controls = useAnimation();

  // Animation based on visibility
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // Animation variants for letters
  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.h2 ref={ref} className="text-5xl font-bold text-center">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          initial="hidden"
          animate={controls}
          transition={{
            duration: 0.5,
            delay: i * 0.05, // Stagger each letter
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char} {/* Non-breaking space for spaces */}
        </motion.span>
      ))}
    </motion.h2>
  );
};

/**
 * ScrollRevealCard Component
 * Card that animates in rotation when scrolled
 *
 * @param {Object} project - title, desc, color
 * @param {number} delay - Animation delay
 */
const ScrollRevealCard = ({ project, delay }) => {
  return (
    <motion.div
      // 3Danimation
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: false, margin: "-50px" }}
      // Animations Hover
      whileHover={{ y: -10, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div
        className={`h-64 rounded-2xl bg-gradient-to-br ${project.color} p-8 shadow-2xl`}
      >
        {/* Icons animation */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="w-16 h-16 bg-white/20 rounded-xl mb-6 flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-white rounded-lg" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-white/80">{project.desc}</p>

        {/* Underline */}
        <motion.div
          className="mt-6 w-12 h-1 bg-white rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ duration: 0.8, delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

/**
 * StaggerSection Component
 * Children stagger animations
 */
const StaggerSection = () => {
  // Parent container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between animations
        delayChildren: 0.2, // Delay before start
      },
    },
  };

  // Individual item animation variants
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Skills data - easily customizable
  const skills = [
    "React",
    "Framer Motion",
    "Tailwind CSS",
    "GSAP",
    "Next.js",
    "Node.js",
    "Angular",
    "TypeScript",
  ];

  return (
    <section className="py-20 px-8 bg-black/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-16"
        >
          Skills & Technologies
        </motion.h2>

        {/* 
          STAGGER ANIMATION CONTAINER
          Parent controls timing of all children
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              variants={itemVariants} // Uses parent's stagger time
              whileHover={{ scale: 1.05 }} // Individual hover effect
              className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <span className="text-lg font-semibold">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Export for reuse in other projects
export default SmoothScrollUI;

/**
 * USAGE EXAMPLES:
 *
 * Basic usage:
 * import SmoothScrollUI from './components/SmoothScrollUI';
 * <SmoothScrollUI />
 *
 * CUSTOM CONTENT (modify data arrays above):
 * - Update the skills array in StaggerSection^
 * - Update the project data in the cards section^
 * - Modify colors and gradients for your brand^
 *
 * PERFORMANCE TIPS:
 * - useTransform is optimized for scroll animations
 * - Use transform properties like scale, rotate, translate over changing width/height
 * - Set once: true on animations that should only happens once and
 * - Use viewport margins to create animations fast or late
 *
 * CUSTOMIZATION IDEAS:
 * - Add your own sections between existing ones
 * - Change the color scheme by updating Tailwind classes
 * - Also use
 * @tailwind base;
 * @tailwind components;
 * @tailwind utilities;
 * - Add more effect with whileHover & whileTap
 * - Create different entrance animations by modifying initial states
 *
 */
