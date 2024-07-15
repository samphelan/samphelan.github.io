import { useNavigate } from "react-router-dom";
import styles from "./aStyles.module.css";

type AProps = {
  to?: string;
  href?: string;
  children?: React.ReactNode;
  selected?: boolean;
  style?: React.CSSProperties;
  className?: string;
  noUnderline?: boolean;
};

const A = (props: AProps) => {
  const navigate = useNavigate();
  return (
    <a
      className={[
        styles.anchor,
        props.selected ? styles.selected : null,
        props.noUnderline ? styles.noUnderline : null,
        props.className,
      ].join(" ")}
      onClick={() => {
        if (props.to) navigate(props.to);
      }}
      href={props.href}
      style={props.style}
    >
      {props.children}
    </a>
  );
};

export default A;
