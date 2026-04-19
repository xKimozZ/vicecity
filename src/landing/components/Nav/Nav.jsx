import { useState, useRef, useCallback, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import NavCursor from "../NavCursor/NavCursor";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/demo", label: "Demo" },
  { path: "/devlog", label: "Devlog" },
  { path: "/about", label: "About" },
  { path: "/disclaimer", label: "Disclaimer & Legal" }
];

const getCursorStyleFromRef = (itemRef, navRef) => {
  if (!itemRef?.current || !navRef?.current) return null;
  const rect = itemRef.current.getBoundingClientRect();
  const navRect = navRef.current.getBoundingClientRect();
  return {
    left: rect.left - navRect.left,
    top: rect.top - navRect.top,
    width: rect.width,
    height: rect.height,
  };
};

const Nav = ({ isMobile = false, onNavClick }) => {
  const navRef = useRef(null);
  const itemRefs = useRef(navItems.map(() => ({ current: null })));
  const location = useLocation();

  // Which item index is hovered (null = none)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(null);

  // Resolve the active route index
  const activeIndex = navItems.findLastIndex((item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  });

  // The index whose ref drives the cursor: hovered takes priority over active
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  const recomputeCursor = useCallback(() => {
    const ref = itemRefs.current[targetIndex];
    setCursorStyle(getCursorStyleFromRef(ref, navRef));
  }, [targetIndex]);

  // Recompute on hover/active change, and on viewport resize
  useEffect(() => {
    recomputeCursor();
    window.addEventListener("resize", recomputeCursor);
    return () => window.removeEventListener("resize", recomputeCursor);
  }, [recomputeCursor]);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${isMobile ? styles.navMobile : ""}`}
    >
      <NavCursor style={cursorStyle} />
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li
            key={item.path}
            className={styles.navItem}
            ref={(el) => { itemRefs.current[index] = { current: el }; }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={onNavClick}
              end={item.path === "/"}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
