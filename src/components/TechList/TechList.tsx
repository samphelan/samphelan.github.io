import { CSSProperties } from "react";
import styles from "./techListStyles.module.css";

type TechListProps = {
  items: string[];
  center?: boolean;
  style?: CSSProperties;
  className?: string;
};

const TechList = (props: TechListProps) => {
  return (
    <ul
      className={[
        styles.techList,
        props.center && styles.center,
        props.className,
      ].join(" ")}
      style={props.style}
    >
      {props.items.map((item) => (
        <li key={item} className={styles.techItem}>
          {item.toUpperCase()}
        </li>
      ))}
    </ul>
  );
};

export default TechList;
