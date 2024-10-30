"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function Feat() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation will trigger every time element enters view
    threshold: 0.3, // Starts animating when 30% of the element is in view
  });

  // Trigger animation when in view
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // Reset the animation when out of view
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from below
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2, // Delay between animations
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      className="coleft"
    >
      <motion.h5 variants={itemVariants} className="nft">
        Moodlii Features
      </motion.h5>
      <motion.div variants={itemVariants} className="dash"></motion.div>
      <motion.h5 variants={itemVariants} className="hhhk">
        Complete Solutions for your Mood
      </motion.h5>
      <motion.p variants={itemVariants} className="ppp">
        Sed ut perspiciatis unde omnis iste natus enim ad minim veniam, quis
        nostrud exercit.
      </motion.p>
      <Link href={"/blog"}>
        <motion.button variants={itemVariants} className="kbutton">
          Check Blogs
        </motion.button>
      </Link>
    </motion.div>
  );
}
