import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          Made by <span className={styles.name}>Saurabh</span> with{" "}
          <span className={styles.heart}>♥</span>
        </p>
        <p>© 2024 Moodly. All Rights Reserved.</p>
        <div className={styles.contactInfo}>
          <p>
            Email:{" "}
            <a href="mailto:saurabhiitr01@gmail.com">saurabhiitr01@gmail.com</a>
          </p>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/saurabh4323"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/saurabhsingh.27"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/saurabh-2708-singh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
