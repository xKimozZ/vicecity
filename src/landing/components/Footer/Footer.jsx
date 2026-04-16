import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`landing-container ${styles.footerInner}`}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Vice City PS2 Frontend</h3>
            <p className={styles.footerDesc}>
              A pixel-faithful recreation of the GTA: Vice City PS2 pause menu, 
              built with React and Redux.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Navigation</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/demo">Demo</Link></li>
              <li><Link to="/devlog">Devlog</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Project</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://github.com/xKimozZ" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><Link to="/demo">Live Demo</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} <span className={styles.author}>Karim Ayman (xKimozZ)</span>. 
            Not affiliated with Rockstar Games.
          </p>
          <p className={styles.disclaimer}>
            GTA: Vice City is a trademark of Rockstar Games / Take-Two Interactive.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
