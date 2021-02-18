import React from "react"

import styles from "./containerStyles.module.scss"

const Container = ({
  style,
  children,
  className,
  thin,
  verticallyCentered,
}) => {
  return (
    <div
      className={[
        styles.wrapper,
        verticallyCentered ? styles.verticallyCentered : null,
        className,
        thin ? styles.thin : null,
      ].join(" ")}
      style={{ ...style }}
    >
      {children}
    </div>
  )
}

export default Container
