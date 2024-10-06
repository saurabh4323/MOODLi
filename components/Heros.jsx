import Image from "next/image";
import styles from "./Heros.module.css"; // Import the CSS file
import Hero from "./Hero";

const Heros = () => {
  return (
    <div className="mainhero">
      <div className={styles.heroSection}>
        {/* Background image */}
        <div
          className={styles.backgroundImage}
          style={{ borderTopRightRadius: "40px" }}
        >
          <Image
            src={"/vector.png"}
            alt="Background vector"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        {/* Content overlaying the background */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Elevate Your Emotional Well-being <br /> with our Mood Tracker App
          </h1>
          <p className={styles.subtitle}>
            Empower Yourself with Self-awareness, Track Your Emotions, <br />
            and Unleash a Happier You
          </p>
          <button className={styles.button}>Join with us</button>
          <Hero></Hero>
        </div>
      </div>
    </div>
  );
};

export default Heros;
