import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import "../../styles/base.css";
import { useEffect } from "react";

const Layout = () => {

  const currentUrl = useLocation().pathname;

  const getPageTitle = (url) => {
    switch(url) {
      case "/": return "Home";
      case "/about": return "About";
      case "/demo": return "Demo";
      case "/devlog": return "Devlog";
      case "/disclaimer": return "Legal & Disclaimer";
      default: return "Page Not Found";
    }
  }

  useEffect(()=>{
    document.title = `Vice City PS2 Menu | ${getPageTitle(currentUrl)}`;
  },[currentUrl]);


  return (
    <ThemeProvider>
      <div className={`landing-root ${styles.layout}`}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
