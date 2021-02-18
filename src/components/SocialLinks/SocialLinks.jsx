import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Anime from "react-anime"
import styles from "./socialLinksStyles.module.scss"

const SocialLink = ({ children }) => {
  return (
    <Anime
      easing={"easeOutQuad"}
      delay={1400}
      opacity={[0, 1]}
      translateY={[-15, 0]}
    >
      <div className={styles.link}>{children}</div>
    </Anime>
  )
}

const SocialLinks = ({ style }) => {
  return (
    <div className={styles.wrapper} style={{ ...style }}>
      <SocialLink>
        <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
      </SocialLink>
      <SocialLink>
        <FontAwesomeIcon icon={faGithub} />
      </SocialLink>
      <div className={styles.line}></div>
    </div>
  )
}

export default SocialLinks
