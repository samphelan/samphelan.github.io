import React from "react"
import styles from "./buttonStyles.module.scss"

const Button = ({ children, onPress }) => {
  return (
    <button className={styles.button} onPress={onPress}>
      {children}
    </button>
  )
}

export default Button
