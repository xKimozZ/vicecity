import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import "../../styles/base.css";

const Layout = () => {
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
