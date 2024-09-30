import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Script from "next/script";
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

      {/* Google Ads Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8925928685447144"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      ></Script>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8925928685447144"
        data-ad-slot="8648608876"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <Script id="ads-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </footer>
  );
};

export default Footer;
