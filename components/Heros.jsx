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

          <div className={styles.emotionsSection}>
            {/* Group 1 */}
            <div className={styles.emotionGroup}>
              <Image
                src={"/groupb.png"}
                alt="Group 1 Emotion"
                width={150}
                height={100}
                unoptimized
              />
            </div>

            {/* Group 2 */}
            <div className={styles.emotionGroup}>
              <Image
                src={"/groupa.png"}
                alt="Group 2 Emotion"
                width={175}
                height={100}
                unoptimized
              />
            </div>

            {/* Group 3 */}
            <div className={styles.emotionGroup}>
              <Image
                src={"/groups.png"}
                alt="Group 3 Emotion"
                width={190}
                unoptimized
                height={100}
              />
            </div>

            {/* Group 4 */}
            <div className={styles.emotionGroup}>
              <Image
                src={"/groupd.png"}
                alt="Group 4 Emotion"
                width={175}
                unoptimized
                height={100}
              />
            </div>

            {/* Group 5 */}
            <div className={styles.emotionGroup}>
              <Image
                src={"/groupc.png"}
                alt="Group 5 Emotion"
                width={150}
                unoptimized
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heros;
