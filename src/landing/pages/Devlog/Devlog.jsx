import styles from "./Devlog.module.css";
import { StatusBadge } from "../../components";

// Placeholder entries - replace with actual content
const entries = [
/*  {
    id: 1,
    date: "Coming Soon",
    title: "The Cursor Conundrum",
    excerpt: "How I recreated the trapezoidal selection box with random clip-paths, and why CSS doesn't want you to do this.",
    tags: ["CSS", "clip-path", "animation"],
  },
  {
    id: 2,
    date: "Coming Soon",
    title: "Keyboard Navigation: More Complex Than It Looks",
    excerpt: "The Load menu has two navigation phases. The Stats menu scrolls on held keys. Every menu has its own rules.",
    tags: ["React", "hooks", "UX"],
  },
  {
    id: 3,
    date: "Coming Soon",
    title: "Asset Archaeology",
    excerpt: "Extracting, upscaling, and recreating assets from a 2002 PS2 game. SVGs, AI upscalers, and manual pixel work.",
    tags: ["assets", "design", "tools"],
  },
  {
    id: 4,
    date: "Coming Soon",
    title: "The 16:9 Problem",
    excerpt: "The original was 4:3 at 640x480. Modern screens have different proportions. How do you fill the space without breaking the feel?",
    tags: ["layout", "responsive", "design"],
  },
  {
    id: 5,
    date: "Coming Soon",
    title: "State Management: Redux Was the Right Call",
    excerpt: "Why I chose Redux Toolkit, the abstraction layer I built on top of it, and whether I'd do it again.",
    tags: ["Redux", "architecture", "React"],
  },*/
];

const Devlog = () => {
  return (
    <div className={styles.devlog}>
      <header className={styles.header}>
        <div className="landing-container">
          <h1 className={styles.title}>Devlog</h1>
          <p className={styles.subtitle}>
            Notes on recreating a 2002 game menu in a web browser, 
            and everything that went wrong along the way.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <div className="landing-container">
          <div className={styles.comingSoon}>
          <StatusBadge type="info" children={"Coming Soon"}/>
          <p>
            Detailed write-ups are in progress. Below are planned topics.
          </p>
        </div>

        <div className={styles.entriesList}>
          {entries.map((entry) => (
            <article key={entry.id} className={styles.entry}>
              <div className={styles.entryMeta}>
                <span className={styles.entryDate}>{entry.date}</span>
                <div className={styles.entryTags}>
                  {entry.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className={styles.entryTitle}>{entry.title}</h2>
              <p className={styles.entryExcerpt}>{entry.excerpt}</p>
              <div className={styles.entryPlaceholder}>
                <div className="landing-placeholder" style={{ aspectRatio: "21/9" }}>
                  Article illustration
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.contribute}>
          <h2>Want to know more?</h2>
          <p>
            If there's something specific you'd like me to write about — a particular 
            technical challenge or design decision — feel free to reach out.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Devlog;
