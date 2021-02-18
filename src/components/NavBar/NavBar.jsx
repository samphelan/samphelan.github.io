import React from "react"
import Anime from "react-anime"
import styles from "./navBarStyles.module.scss"
import resume from "../../static/kindbioResume.pdf"

const NavLink = ({ children, style }) => {
  return (
    <button style={{ ...style }} className={styles.navLink} onClick={{}}>
      {children}
    </button>
  )
}

const NavBar = ({ style }) => {
  return (
    <div
      style={{
        ...style,
      }}
      className={styles.wrapper}
    >
      <div className={styles.contactInfo}>
        <div style={{ fontSize: "0.8em", lineHeight: "1.5em" }}>
          Samuel Phelan
        </div>
        <div style={{ fontSize: "0.8em", lineHeight: "1.5em" }}>
          <a href="mailto:samphelan7@gmail.com" style={{ color: "white" }}>
            samphelan7@gmail.com
          </a>
        </div>
        <div style={{ fontSize: "0.8em", lineHeight: "1.5em" }}>
          (314) 922-5606
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Anime
          easing={"easeOutQuad"}
          duration={1300}
          delay={200}
          translateX={["-30px", 0]}
          opacity={[0, 1]}
        >
          <NavLink>WORK</NavLink>
        </Anime>
        <Anime
          easing={"easeOutQuad"}
          duration={1300}
          delay={200}
          translateX={["-15px", 0]}
          opacity={[0, 1]}
        >
          <NavLink style={{ marginLeft: "20px" }}>
            <a target="_blank" href={resume} className={styles.anchorLink}>
              RESUME
            </a>
          </NavLink>
        </Anime>
      </div>
    </div>
  )
}

export default NavBar
