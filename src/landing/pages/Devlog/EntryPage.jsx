import { useParams, Link } from "react-router-dom";
import entries from "./entries";
import styles from "./EntryPage.module.css";
import LinkButton from "../../components/LinkButton/LinkButton";
import { LeftArrowIcon } from "../../components";

/** Render a section's text, splitting on double-newlines into paragraphs. */
const SectionText = ({ text }) =>
  text.split("\n\n").map((para, i) => (
    <p key={i} className={styles.paragraph}>{para}</p>
  ));

const EntryPage = () => {
  const { slug } = useParams();
  const entry = entries.find((e) => e.slug === slug);

  if (!entry) {
    return (
      <div className={styles.notFound}>
        <h1>Entry not found</h1>
        <p>The devlog entry you're looking for doesn't exist.</p>
        <LinkButton href={'/devlog'} rank="secondary" content={<><LeftArrowIcon /> Back to Devlog</>} />
      </div>
    );
  }

  return (
    <div className={styles.entryPage}>
      <header className={styles.header}>
        <div className="landing-container">
          <Link to="/devlog" className={styles.backLink}>← Back to Devlog</Link>
          <div className={styles.meta}>
            <span className={styles.date}>{entry.date}</span>
            {entry.status === "draft" && (
              <span className={styles.draftBadge}>Draft</span>
            )}
            {entry.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <h1 className={styles.title}>{entry.title}</h1>
          <p className={styles.excerpt}>{entry.excerpt}</p>
        </div>
      </header>

      <article className={styles.body}>
        <div className="landing-container">
          <div className={styles.prose}>
            {entry.content ? (
              entry.content.map((section, i) => (
                <section key={i} className={styles.section}>
                  {section.heading && (
                    <h2 className={styles.sectionHeading}>{section.heading}</h2>
                  )}
                  <SectionText text={section.text} />
                  {section.image && (
                    <figure className={styles.figure}>
                      <img
                        src={section.image}
                        alt={section.heading || entry.title}
                        className={styles.image}
                        loading="lazy"
                      />
                    </figure>
                  )}
                </section>
              ))
            ) : (
              <div className={styles.placeholder}>
                <span>Full write-up coming soon</span>
                <span>This entry is still being written.</span>
              </div>
            )}
          </div>
        </div>
      </article>

      <nav className={styles.pagination}>
        <div className="landing-container">
          <EntryNav currentId={entry.id} />
        </div>
      </nav>
    </div>
  );
};

/** Prev/Next navigation between entries. */
const EntryNav = ({ currentId }) => {
  const idx = entries.findIndex((e) => e.id === currentId);
  const prev = entries[idx - 1];
  const next = entries[idx + 1];

  return (
    <div className={styles.navRow}>
      {prev && (
        <Link to={`/devlog/${prev.slug}`} className={styles.navLink}>
          <span className={styles.navLabel}>← Previous</span>
          <span className={styles.navTitle}>{prev.title}</span>
        </Link>
      ) }
      {next && (
        <Link to={`/devlog/${next.slug}`} className={`${styles.navLink} ${styles.navRight}`}>
          <span className={styles.navLabel}>Next →</span>
          <span className={styles.navTitle}>{next.title}</span>
        </Link>
      )}
    </div>
  );
};

export default EntryPage;
