import { Link } from "react-router-dom";
import styles from "./Demo.module.css";
import demoVideo from "../../demo.webm";
import LinkButton from "../../components/LinkButton/LinkButton";
import { ArrowIcon, LeftArrowIcon, StatusBadge } from "../../components";

const KeyIcon = ({ children }) => (
  <span className={styles.keyIcon}>{children}</span>
);

const ControlItem = ({ control }) => {
  return (
    <div className={styles.controlItem}>
      <div className={styles.keys}>
        {control.keys.map((key) => (
          <KeyIcon key={key}>{key}</KeyIcon>
        ))}
      </div>
      <span className={styles.controlDesc}>{control.description}</span>
    </div>
  );
}

const Demo = () => {

  const moveControls = { keys: ["↑", "↓", "←", "→"], description: "Navigate menus" };
  const selectControl = { keys: ["Enter"], description: "Select / Confirm" };
  const backControl = { keys: ["Esc", "Backspace"], description: "Back / Cancel" };
  const mouseControl = { keys: ["Mouse"], description: "Hover to highlight" };
  const zoomControl = { keys: ["PgDn", "PgUp"], description: "Zoom in / out (map menu)" };

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
            <StatusBadge type="warning" children={"Important"}/>
            <p>
              The demo is optimized for <strong>desktop browsers</strong> with a keyboard. 
              Mobile devices are not currently supported.
            </p>
          </div>

          <div className={styles.controls}>
            <h2 className={styles.controlsTitle}>Controls</h2>
            <div className={styles.controlsGrid}>
                <ControlItem control={moveControls} />
                <ControlItem control={selectControl} />
                <ControlItem control={backControl} />
                <ControlItem control={mouseControl} />
                <ControlItem control={zoomControl} />
            </div>
          </div>

          <div className={styles.incompleteCard}>
            <h3>Currently Incomplete</h3>
            <ul>
              <li><strong>General</strong> — Optimisation, accessibility, and responsivity improvements in progress</li>
              <li><strong>Load Menu</strong> — Dummy loading sequence coming soon</li>
              <li><strong>Audio Menu</strong> — Dummy output menu coming soon</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <LinkButton content={<><span>Enter Demo</span> <ArrowIcon /></>} rank="primary" href="/app" />
            <Link to="/" className="landing-btn landing-btn-secondary">
              <LeftArrowIcon /> Back to Home
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
