import styles from "./About.module.css";
import LinkButton from "../../components/LinkButton/LinkButton";
import { CvIcon, GithubIcon, LinkedInIcon, EmailIcon } from "../../components";

const cvUrl = process.env.REACT_APP_CV_URL || "#";

const techStack = [
  { name: "React", version: "18.3.1", purpose: "UI framework" },
  { name: "Redux Toolkit", version: "2.2.7", purpose: "State management" },
  { name: "React Router", version: "7.1.3", purpose: "Routing" },
  { name: "use-sound", version: "4.0.4", purpose: "Audio playback" },
  { name: "CSS Modules", version: "-", purpose: "Scoped styling" },
];

const profileLinks = [
  { name: <><GithubIcon /> GitHub</>, url: "https://github.com/xKimozZ", rank: "secondary" },
  { name: <><LinkedInIcon /> LinkedIn</>, url: "https://linkedin.com/in/karim-ayman-h", rank: "secondary" },
  { name: <><CvIcon /> CV</>, url: cvUrl, rank: "primary" },
  { name: <><EmailIcon /> Email</>, url: "mailto:karim.hasseb02@eng-st.cu.edu.eg", rank: "primary" }
]

const About = () => {

  const TechEntry = ({ name, version, purpose }) => {
    return (
      <div key={name} className={styles.techCard}>
        <div className={styles.techHeader}>
          <span className={styles.techName}>{name}</span>
          {version !== "-" && (
            <span className={styles.techVersion}>{version}</span>
          )}
        </div>
        <span className={styles.techPurpose}>{purpose}</span>
      </div>
    );
  };

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
                  {profileLinks.map((link) => <LinkButton key={link.name} content={link.name} rank={link.rank} href={link.url} isRouter={false} />)}
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
              <TechEntry key={tech.name} name={tech.name} version={tech.version} purpose={tech.purpose} />
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
