import styles from "./Home.module.css";
import demoVideo from "../../demo.webm";
import LinkButton from "../../components/LinkButton/LinkButton";
import { ArrowIcon, FeaturesGrid, SectionHeader, StatusBadge } from "../../components";

const features = [
  {
    title: "Pixel-Faithful Recreation",
    description: "Every button, every animation, every sound effect matched to the original PS2 version.",
    icon: "🎮",
  },
  {
    title: "Radio Station System",
    description: "Featuring 9+ hours of iconic 80s music, hilarious talk shows, and amusing commercials.",
    icon: "🎵",
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
  { name: "Map", status: "complete" },
  { name: "Audio", status: "wip" },
];

const Home = () => {

  const generateBadge = (status) => {
    switch (status) {
      case "complete":
        return <StatusBadge type="success" children={"Complete"} />;
      case "wip":
        return <StatusBadge type="warning" children={"In Progress"} />;
      case "planned":
        return <StatusBadge type="info" children={"Planned"} />;
      default:
        return null;
    }
  };


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
              <LinkButton content={<><span>Try the Demo</span> <ArrowIcon /></>} rank="primary" href="/demo" />
              <LinkButton content="Read the Devlog" rank="secondary" href="/devlog" />
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
            <StatusBadge type="warning" children={"Pre-Alpha"} />
            <p>
              This project is still in development. Some menus are incomplete and 
              mobile devices are not currently supported.
            </p>
          </div>
        </div>
      </section>

      {/* What Am I supposed to Do here anyway Section */}
      <section className={`landing-section ${styles.infoSection}`}>
        <div className="landing-container">
          <SectionHeader title="What Am I Supposed to Do Here Anyway?" subtitle="Glad you asked. In short, life is what you make it." />
          <p className={styles.infoText}>
            <em><b>Fun fact:</b></em> when the radio station feature was implemented, it marked a milestone.
            I found myself subconciously entering my deployed site, going to the Audio menu, intermittently switching radio stations, and studying for my finals with the music, goofy commercials, and DJ banter playing in the background.
          </p>
          <p className={styles.infoText}>
            What I just described was an unintentional side effect. This project was quite challenging, intimidating, and caused me to doubt myself at times. Beneath what you see is many hours of research, trial and error, blood, sweat, and tears. At the time of writing this, the project was still in pre-alpha with 90% of feature-complete criteria fulfilled.
          </p>
          <p className={styles.infoText}>
           The moment I could browse to my pre-alpha demo on demand, listen to Michael Jackson on Fever 105 or Flash FM, switch over to nostalgic new wave on Wave 103, then listen to emotionally resonant ballads on Emotion 98.3, all with the lore-specific commercials and DJ banter,<br/>
          </p>
          <p className={styles.infoText} style={{ textAlign: "center", fontSize: "var(--text-xl)" }}><i><b>was the moment the line between what I used to do on an emulator/PlayStation AND on this project blurred.</b></i></p>
          <p className={styles.infoText}>
            Really, I could not tell the difference. It was a euphoric moment, and it felt like I found the Key of the Twilight. The soundtrack is indisputably the soul of this game. Anyway, let me list down things you might find yourself doing on this site:
          </p>
          <ul className={styles.infoList}>
            <li>Entering the audio menu and:
              <ul className={styles.infoSublist}>
                <li>Cycling through stations when you get bored of one.</li>
                <li>Hesitating to choose a station when <b><i>Billie Jean</i></b> and <b><i>Never Too Much</i></b> are both on.</li>
                <li>Worrying about leaving the menu so you don't miss a favorite track.</li>
                <li>Keeping the tab open while your favorite station plays, just like leaving the console idle to listen to music.</li>
              </ul>
            </li>
            <li>Obsessively selecting and backing out to trigger the frontend sounds, like you're fiddling with a soundboard.</li>
            <li>Curiously exploring what the PS2 rendition looked like.</li>
            <li>Carrying out research if you are a content creator.</li>
            <li>Looking for inspiration as a developer or a UI/UX specialist.</li>
            <li>Keenfully analyzing behaviors if you have a sharp eye for details.</li>
          </ul>
          <p className={styles.infoText}>
            With this project, I wanted to create something that could evoke the same feelings as the original game, and be a fun little experience for fans and developers alike. As Talk Talk's <i>Life's What You Make It</i> suggests, the menu is what you make it. You can use it as a fun diversion, a research tool, or a source of inspiration. I hope you enjoy exploring it as much as I enjoyed creating it.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-section">
        <div className="landing-container">
          <SectionHeader title="What Makes This Special" subtitle="This isn't a loose 'inspired by' project. It's an obsessive recreation." />
          <FeaturesGrid features={features} />
        </div>
      </section>

      {/* Menu Status Section */}
      <section className={`landing-section ${styles.statusSection}`}>
        <div className="landing-container">
          <SectionHeader title="Implementation Status" subtitle="Track progress on each menu component." />
          <div className={styles.statusGrid}>
            {menuStatus.map((menu) => (
              <div key={menu.name} className={styles.statusItem}>
                <span className={styles.statusName}>{menu.name}</span>
                {generateBadge(menu.status)}
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
            <LinkButton content={<><span>Launch Demo</span> <ArrowIcon /></>} rank="primary" href="/demo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
