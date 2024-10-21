"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./hl.css";
import { useRouter } from "next/navigation";

export default function Heroleft() {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
        Welcome to Moodli
      </motion.h5>
      <div className="dash"></div>
      <h5
        variants={itemVariants}
        className="hhhk"
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
      >
        Track Your Mood, Make New Friends, and Discover Powerful Insights.
      </h5>

      <motion.p variants={itemVariants} className="ppp">
        Ever wonder how your mood changes throughout the day? At Moodlii, you
        can track your emotions, share your feelings with friends, and get
        insights and suggestions tailored to your current mood. Connect, Share,
        and Get Support Easily.
      </motion.p>

      <motion.button
        variants={itemVariants}
        className="kbutton"
        onClick={() => {
          router.push("/register");
        }}
      >
        Get Connected
      </motion.button>
    </motion.div>
  );
}
