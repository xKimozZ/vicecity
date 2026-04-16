import styles from "./About.module.css";
import cvFile from "../../KarimAymanCV.pdf";

const techStack = [
  { name: "React", version: "18.3.1", purpose: "UI framework" },
  { name: "Redux Toolkit", version: "2.2.7", purpose: "State management" },
  { name: "React Router", version: "7.1.3", purpose: "Routing" },
  { name: "use-sound", version: "4.0.4", purpose: "Audio playback" },
  { name: "CSS Modules", version: "-", purpose: "Scoped styling" },
];

const About = () => {
  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <div className="landing-container">
          <h1 className={styles.title}>About This Project</h1>
        </div>
      </header>

      <div className={styles.body}>
      <div className="landing-container">
        <div className={styles.grid}>
          {/* Author section */}
          <section className={styles.authorSection}>
            <div className={styles.authorCard}>
              {/* <div className={styles.authorAvatar}>
                <div className="landing-placeholder" style={{ aspectRatio: "1/1", borderRadius: "50%" }}>
                  Photo
                </div>
              </div> */}
            <img 
                  src="https://media.licdn.com/dms/image/v2/D4E03AQGIhbdSh8qqAQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719952506741?e=1778112000&v=beta&t=ispoNjWx7WbYLd0dFhQ5MpUztlG0oNe71TMxEzvrAqI" 
                  alt="Author" 
                  className={styles.authorAvatar}
            />
              <div className={styles.authorInfo}>
                <h2 className={styles.authorName}>Karim Ayman</h2>
                <p className={styles.authorHandle}>@xKimozZ</p>
                <p className={styles.authorBio}>
                  {/* Replace with your actual bio */}
                  Developer with a fondness for the PS2 era. This project exists because 
                  I couldn't shake the memory of navigating that menu as a kid.
                </p>
                <div className={styles.authorLinks}>
                  <a 
                    href="https://github.com/xKimozZ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="landing-btn landing-btn-secondary"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://linkedin.com/in/karim-ayman-h" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="landing-btn landing-btn-secondary"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={cvFile}
                    download="KarimAyman_CV.pdf"
                    className="landing-btn landing-btn-primary"
                  >
                    CV
                  </a>
                  {/* Add more links as needed */}
                </div>
              </div>
            </div>
          </section>

          {/* Project info section */}
          <section className={styles.projectSection}>
            <h2 className={styles.sectionTitle}>Why This Exists</h2>
            <div className={styles.prose}>
              <p>
                GTA: Vice City came out in 2002. I was young enough to be impressed by everything 
                about it, including — for some reason — the pause menu. The pink color
                scheme and the camo background pattern, dynamic trapezoids, the sounds of the menu. It stuck 
                with me. It simply screamed aura and atmosphere.
              </p>
              <p>
                Years later, while I was learning React during a college Software Engineering course project,
                 I was fascinated by CSS transitions; it reminded me of how game menus worked.
                 I imagined how it would feel if I built something like that in addition to sound effects and music, 
                 it sounded exciting. Recreating a retro game menu is a very niche kind of project, but I am determined to see it
                 through to the end.
              </p>
              <p>
                What I didn't expect was how much work would go into matching the <em>feel</em> of 
                the original. The cursor's randomized shape. The two-phase navigation on the Load 
                screen. The held-key scrolling on the Stats screen. Debounced inputs. Subtle behaviors. None of that is visible at first 
                glance, but it's what makes the recreation feel right.
              </p>
            </div>
          </section>
        </div>

        {/* Tech stack */}
        <section className={styles.techSection}>
          <h2 className={styles.sectionTitle}>Built With</h2>
          <div className={styles.techGrid}>
            {techStack.map((tech) => (
              <div key={tech.name} className={styles.techCard}>
                <div className={styles.techHeader}>
                  <span className={styles.techName}>{tech.name}</span>
                  {tech.version !== "-" && (
                    <span className={styles.techVersion}>{tech.version}</span>
                  )}
                </div>
                <span className={styles.techPurpose}>{tech.purpose}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className={styles.disclaimer}>
          <h2 className={styles.disclaimerTitle}>Legal Disclaimer</h2>
          <p>
            This is a fan project created for educational and nostalgic purposes only. 
            It is not affiliated with, endorsed by, or connected to Rockstar Games, 
            Take-Two Interactive, or any of their subsidiaries.
          </p>
          <p>
            GTA: Vice City and all related trademarks are the property of their respective owners. 
            No copyright infringement is intended.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
};

export default About;
