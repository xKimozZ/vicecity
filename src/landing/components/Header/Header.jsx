import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Nav from "../Nav/Nav";
import styles from "./Header.module.css";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "../";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  }

  // Close mobile menu when viewport exceeds mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={`landing-container ${styles.headerInner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Vice City PS2 Frontend</span>
          <span className={styles.logoSub}>React Recreation</span>
        </Link>

        <Nav />

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={`${styles.menuButton} hide-desktop`}
            onClick={openMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay + panel */}
      {mobileMenuOpen && (
        <>
          <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu} />
          <div className={styles.mobileMenu}>
            <Nav isMobile onNavClick={closeMobileMenu} />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
