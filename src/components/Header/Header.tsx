import { useState } from "react";
import A from "../A/A";
import styles from "./headerStyles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
const logo = require("../../assets/LOGO.PNG");

type HeaderLinkProps = {
  to: string;
  selected?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const HeaderLink = (props: HeaderLinkProps) => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        navigate(props.to);
      }}
      className={[styles.link, props.selected ? styles.selected : null].join(
        " "
      )}
      style={props.style}
    >
      {props.children}
    </a>
  );
};

const Header = () => {
  const [currentPage, setCurrentPage] = useState("projects");
  const location = useLocation();

  return (
    <header className={styles.wrapper}>
      <A to="/projects" className={styles.logoWrapper} noUnderline>
        <img src={logo} alt="Sam Phelan" style={{ height: "2em" }} />
        <p className={styles.title}>Full Stack Developer & Designer</p>
      </A>
      <div className={styles.linksWrapper}>
        <HeaderLink
          to="/projects"
          selected={location.pathname.toLowerCase().includes("projects")}
          style={{ marginRight: "20px" }}
        >
          projects
        </HeaderLink>
        <HeaderLink
          to="/contact"
          selected={location.pathname.toLowerCase().includes("contact")}
        >
          contact
        </HeaderLink>
      </div>
    </header>
  );
};

export default Header;
