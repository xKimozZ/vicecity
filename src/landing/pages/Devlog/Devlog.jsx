import { Link } from "react-router-dom";
import styles from "./Devlog.module.css";
import { StatusBadge } from "../../components";
import entries from "./entries";

const Devlog = () => {

  const EntryOption = ({ entry }) => {
    return (
            <Link
              key={entry.id}
              to={`/devlog/${entry.slug}`}
              className={styles.entry}
            >
              <div className={styles.entryMeta}>
                <span className={styles.entryDate}>{entry.date}</span>
                <div className={styles.entryTags}>
                  {entry.status === "draft" && (
                    <span className={styles.draftBadge}>Draft</span>
                  )}
                  {entry.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className={styles.entryTitle}>{entry.title}</h2>
              <p className={styles.entryExcerpt}>{entry.excerpt}</p>
              <span className={styles.readMore}>
                {entry.content ? "Read more →" : "Preview →"}
              </span>
            </Link>
    )
  };

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
          <StatusBadge type="info" children={`${entries.length} entries`}/>
          <p>
            Click any entry to read the full write-up.
          </p>
        </div>

        <div className={styles.entriesList}>
          {entries.map((entry) => (
            <EntryOption key={entry.id} entry={entry} />
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
