import { Link } from "react-router-dom";
import styles from "./Disclaimer.module.css";
import LinkButton from "../../components/LinkButton/LinkButton";
import { LeftArrowIcon } from "../../components";

const Disclaimer = () => {
  return (
    <div className={styles.disclaimer}>
      <header className={styles.header}>
        <div className="landing-container">
          <h1 className={styles.title}>Disclaimer &amp; Legal</h1>
          <p className={styles.subtitle}>
            The boring but important stuff.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <div className="landing-container">
          <div className={styles.prose}>

            {/* Friendly intro */}
            <section className={styles.section}>
              <h2 className={styles.heading}>What this project is</h2>
              <p>
                This is a <strong>fan-made, non-commercial recreation</strong> of 
                the GTA: Vice City PS2 pause menu — built purely for nostalgia, 
                learning, and the love of a game that shaped an entire generation 
                of players. There is no intent to profit from this project in any way.
              </p>
              <p>
                No ads, no paywalls, no monetization. Just a developer who spent 
                too many hours as a kid staring at and fiddling with a pause menu,
                and as an adult thought "I wonder if I can rebuild this in a browser."
              </p>
              <p>
                If you're from Rockstar Games / Take-Two and have concerns, please 
                reach out — I'm happy to discuss, modify, or take down anything 
                that crosses a line. This project exists out of respect for the 
                original work, not disrespect.
              </p>
            </section>

            {/* What's mine */}
            <section className={styles.section}>
              <h2 className={styles.heading}>What I made (my work)</h2>
              <p>
                All of the following is original work by <strong>Karim Ayman (xKimozZ)</strong> and 
                is subject to my own copyright:
              </p>
              <ul className={styles.list}>
                <li>The entire React/Redux codebase — component architecture, hooks, state management, navigation system, cursor logic, and responsive scaling</li>
                <li>All CSS (styling, animations, clip-path generation, theme system)</li>
                <li>The landing site design and implementation</li>
                <li>The devlog write-ups and commentary</li>
                <li>The abstraction layers, utilities, and build configuration</li>
              </ul>
              <p>
                The code is a <strong>clean-room reimplementation</strong>. No Rockstar source code 
                was referenced, decompiled, or used. The recreation was built entirely by observing 
                the original menu visually and replicating its behavior from scratch.
              </p>
            </section>

            {/* Rockstar / Take-Two */}
            <section className={styles.section}>
              <h2 className={styles.heading}>Rockstar Games / Take-Two Interactive</h2>
              <p>
                <strong>Grand Theft Auto: Vice City</strong> is a registered trademark of 
                Rockstar Games, Inc., a subsidiary of Take-Two Interactive Software, Inc.
              </p>
              <p>The following assets used in this project are the intellectual property of Rockstar Games / Take-Two Interactive:</p>
              <ul className={styles.list}>
                <li>The Vice City logo and name</li>
                <li>Menu background textures (extracted and upscaled from the PS2 version)</li>
                <li>The in-game map textures</li>
                <li>Menu sound effects (hover, select, back, error, info)</li>
                <li>PS2 controller layout reference image</li>
                <li>Menu text strings (stats labels, briefing content, menu option names) across 5 languages</li>
              </ul>
              <p>
                This project is <strong>not affiliated with, endorsed by, or connected to</strong> Rockstar 
                Games or Take-Two Interactive in any way. It is an independent fan project 
                created for educational and nostalgic purposes under fair use principles.
              </p>
            </section>

            {/* Fonts */}
            <section className={styles.section}>
              <h2 className={styles.heading}>Fonts</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Font</th>
                    <th>Author</th>
                    <th>License</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pricedown</td>
                    <td>Ray Larabie (Typodermic Fonts)</td>
                    <td>Free for personal use</td>
                  </tr>
                  <tr>
                    <td>SF Arborcrest (Light, Medium, Heavy)</td>
                    <td>ShyFonts Type Foundry</td>
                    <td>Freeware — non-commercial use only</td>
                  </tr>
                  <tr>
                    <td>Inter</td>
                    <td>Rasmus Andersson</td>
                    <td>SIL Open Font License 1.1</td>
                  </tr>
                </tbody>
              </table>
              <p className={styles.note}>
                Pricedown is strongly associated with the Grand Theft Auto franchise 
                but was originally created independently by Typodermic Fonts. SF Arborcrest 
                is used under ShyFonts' freeware terms which permit non-commercial use with 
                no modification. Inter is served via Google Fonts.
              </p>
            </section>

            {/* SVG Icons */}
            <section className={styles.section}>
              <h2 className={styles.heading}>SVG icons</h2>
              <p>Icons sourced from <a href="https://www.svgrepo.com" target="_blank" rel="noopener noreferrer">SVG Repo</a> under their respective open licenses:</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Author</th>
                    <th>License</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GitHub</td>
                    <td>bypeople</td>
                    <td>Public Domain</td>
                  </tr>
                  <tr>
                    <td>LinkedIn</td>
                    <td>HashiCorp</td>
                    <td>MPL 2.0 (Mozilla Public License)</td>
                  </tr>
                  <tr>
                    <td>File/CV</td>
                    <td>govicons</td>
                    <td>OFL (SIL Open Font License)</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>Siemens</td>
                    <td>MIT</td>
                  </tr>
                </tbody>
              </table>
              <p className={styles.note}>
                Generic UI icons (sun, moon, menu, close, arrows) are original SVG paths 
                with no external source.
              </p>
            </section>

            {/* Open source deps */}
            <section className={styles.section}>
              <h2 className={styles.heading}>Open source libraries</h2>
              <p>This project is built on the following open-source packages, all used under the MIT license unless noted:</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>License</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>React / React DOM</td><td>MIT</td></tr>
                  <tr><td>Redux Toolkit / React Redux</td><td>MIT</td></tr>
                  <tr><td>React Router</td><td>MIT</td></tr>
                  <tr><td>use-sound (Howler.js)</td><td>MIT</td></tr>
                  <tr><td>web-vitals</td><td>Apache-2.0</td></tr>
                </tbody>
              </table>
            </section>

            {/* Fair use / legal position */}
            <section className={styles.section}>
              <h2 className={styles.heading}>Fair use &amp; legal position</h2>
              <p>
                This project is a <strong>transformative, non-commercial fan work</strong> that 
                recreates a small UI element of a 2002 video game for educational, 
                archival, and commentary purposes. It does not reproduce or distribute 
                the game itself, its storyline, gameplay, or any substantial portion of 
                its copyrighted content.
              </p>
              <p>The factors supporting fair use in this context:</p>
              <ul className={styles.list}>
                <li><strong>Purpose:</strong> Non-commercial, educational, and transformative (web technology recreation of a console UI)</li>
                <li><strong>Nature:</strong> The pause menu is a functional/utilitarian UI element, not a creative narrative work</li>
                <li><strong>Amount:</strong> Only the menu interface is recreated — not the game, its story, characters, or gameplay</li>
                <li><strong>Market effect:</strong> This project cannot substitute for purchasing or playing GTA: Vice City; if anything, it drives nostalgic interest in the original</li>
              </ul>
            </section>

            {/* DMCA */}
            <section className={styles.section}>
              <h2 className={styles.heading}>Takedown requests</h2>
              <p>
                If you are a rights holder and believe this project infringes on your 
                intellectual property, please reach out before filing a formal takedown. 
                I'm a solo developer making this for fun — I'll work with you to resolve 
                any concerns promptly and respectfully.
              </p>
            </section>

            <div className={styles.backRow}>
              <LinkButton content={<><LeftArrowIcon /> Back to Home</>} rank="secondary" href="/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
