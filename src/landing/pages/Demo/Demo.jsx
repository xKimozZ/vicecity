import { Link } from "react-router-dom";
import styles from "./Demo.module.css";
import demoVideo from "../../demo.webm";
import LinkButton from "../../components/LinkButton/LinkButton";
import { ArrowIcon } from "../../components";

const KeyIcon = ({ children }) => (
  <span className={styles.keyIcon}>{children}</span>
);

const Demo = () => {
  return (
    <div className={styles.demo}>
      <section className={styles.heroSection}>
        <div className="landing-container">
          <h1 className={styles.title}>Launch the Demo</h1>
        </div>
      </section>
      <div className="landing-container">
        <div className={styles.content}>
          
          <div className={styles.warningCard}>
            <span className="landing-badge landing-badge-warning">Important</span>
            <p>
              The demo is optimized for <strong>desktop browsers</strong> with a keyboard. 
              Mobile devices are not currently supported.
            </p>
          </div>

          <div className={styles.controls}>
            <h2 className={styles.controlsTitle}>Controls</h2>
            <div className={styles.controlsGrid}>
              <div className={styles.controlItem}>
                <div className={styles.keys}>
                  <KeyIcon>↑</KeyIcon>
                  <KeyIcon>↓</KeyIcon>
                  <KeyIcon>←</KeyIcon>
                  <KeyIcon>→</KeyIcon>
                </div>
                <span className={styles.controlDesc}>Navigate menus</span>
              </div>
              <div className={styles.controlItem}>
                <div className={styles.keys}>
                  <KeyIcon>Enter</KeyIcon>
                </div>
                <span className={styles.controlDesc}>Select / Confirm</span>
              </div>
              <div className={styles.controlItem}>
                <div className={styles.keys}>
                  <KeyIcon>Esc</KeyIcon>
                </div>
                <span className={styles.controlDesc}>Back / Cancel</span>
              </div>
              <div className={styles.controlItem}>
                <div className={styles.keys}>
                  <KeyIcon>Mouse</KeyIcon>
                </div>
                <span className={styles.controlDesc}>Hover to highlight</span>
              </div>
            </div>
          </div>

          <div className={styles.incompleteCard}>
            <h3>Currently Incomplete</h3>
            <ul>
              <li><strong>Map Menu</strong> — Legend, map navigation features in progress</li>
              <li><strong>Load Menu</strong> — Dummy loading sequence coming soon</li>
              <li><strong>Audio Menu</strong> — Coming soon</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <LinkButton content={<><span>Enter Demo</span> <ArrowIcon /></>} rank="primary" href="/app" />
            <Link to="/" className="landing-btn landing-btn-secondary">
              ← Back to Home
            </Link>
          </div>

          <div className={styles.preview}>
            <video
              className={styles.previewVideo}
              src={demoVideo}
              controls
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
