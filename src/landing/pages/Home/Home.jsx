import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import demoVideo from "../../demo.webm";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const features = [
  {
    title: "Pixel-Faithful Recreation",
    description: "Every button, every animation, every sound effect matched to the original PS2 version.",
    icon: "🎮",
  },
  {
    title: "Custom Cursor System",
    description: "Real-time generated clip-path polygons that jitter just like the original selection box.",
    icon: "🎯",
  },
  {
    title: "Full Keyboard Navigation",
    description: "Arrow keys, Enter, Escape — the entire menu is navigable without a mouse.",
    icon: "⌨️",
  },
  {
    title: "5 Languages",
    description: "English, French, German, Italian, and Spanish — localized just like the game.",
    icon: "🌍",
  },
];

const menuStatus = [
  { name: "Main Menu", status: "complete" },
  { name: "Brief", status: "complete" },
  { name: "Load Game", status: "wip" },
  { name: "Stats", status: "complete" },
  { name: "Controls", status: "complete" },
  { name: "Display", status: "complete" },
  { name: "Language", status: "complete" },
  { name: "Map", status: "wip" },
  { name: "Audio", status: "planned" },
];

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="landing-container">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>React + Redux Project</span>
            <h1 className={styles.heroTitle}>
              Vice City <span className="text-gradient">PS2 Frontend</span>
            </h1>
            <p className={styles.heroDesc}>
              A meticulous web recreation of the iconic GTA: Vice City pause menu from the PS2 version. 
              Built from scratch with React, down to the tiniest details.
            </p>
            <div className={styles.heroActions}>
              <Link to="/demo" className="landing-btn landing-btn-primary">
                Try the Demo <ArrowIcon />
              </Link>
              <Link to="/devlog" className="landing-btn landing-btn-secondary">
                Read the Devlog
              </Link>
            </div>
          </div>
          <div className={styles.heroPreview}>
            <video
              className={styles.heroVideo}
              src={demoVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* Status Warning */}
      <section className={styles.statusBanner}>
        <div className="landing-container">
          <div className={styles.bannerContent}>
            <span className="landing-badge landing-badge-warning">Pre-Alpha</span>
            <p>
              This project is still in development. Some menus are incomplete and 
              mobile devices are not currently supported.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-section">
        <div className="landing-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Makes This Special</h2>
            <p className="text-secondary">
              This isn't a loose "inspired by" project. It's an obsessive recreation.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className="landing-card">
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Status Section */}
      <section className={`landing-section ${styles.statusSection}`}>
        <div className="landing-container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Implementation Status</h2>
            <p className="text-secondary">
              Track progress on each menu component.
            </p>
          </div>
          <div className={styles.statusGrid}>
            {menuStatus.map((menu) => (
              <div key={menu.name} className={styles.statusItem}>
                <span className={styles.statusName}>{menu.name}</span>
                <span
                  className={`landing-badge ${
                    menu.status === "complete"
                      ? "landing-badge-success"
                      : menu.status === "wip"
                      ? "landing-badge-warning"
                      : "landing-badge-info"
                  }`}
                >
                  {menu.status === "complete"
                    ? "Complete"
                    : menu.status === "wip"
                    ? "In Progress"
                    : "Planned"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`landing-section ${styles.ctaSection}`}>
        <div className="landing-container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to experience it?</h2>
            <p className={styles.ctaDesc}>
              Grab a keyboard and see how close it feels to the real thing.
            </p>
            <Link to="/demo" className="landing-btn landing-btn-primary">
              Launch Demo <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
