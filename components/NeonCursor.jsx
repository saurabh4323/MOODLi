import React, { useEffect, useState } from "react";
import styles from "./NeonCursor.module.css";

// Customize with 5 different emojis for the tail
const TAIL_EMOJIS = ["😀", "😂", "😎", "☝️", "😡", "🔥"]; // 5 unique emojis

export default function NeonCursor() {
  const [positions, setPositions] = useState(
    Array(TAIL_EMOJIS.length).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPositions = [...positions];
      // Move the first emoji to the mouse position
      newPositions[0] = { x: e.clientX, y: e.clientY };

      // Move the rest of the tail with a delay
      for (let i = TAIL_EMOJIS.length - 1; i > 0; i--) {
        newPositions[i] = {
          x: newPositions[i - 1].x,
          y: newPositions[i - 1].y,
        };
      }

      setPositions(newPositions);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [positions]);

  return (
    <>
      {positions.map((position, index) => (
        <div
          key={index}
          className={styles.emojiContainer}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: `transform ${index * 0.05}s ease-out`,
          }}
        >
          <span className={styles.emoji}>{TAIL_EMOJIS[index]}</span>
        </div>
      ))}
    </>
  );
}
