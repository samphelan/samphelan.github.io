import styles from "./linkButtonStyles.module.css";

type LinkButtonProps = {
  href: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const LinkButton = (props: LinkButtonProps) => {
  return (
    <a href={props.href} className={styles.linkButton} style={props.style}>
      {props.children}
    </a>
  );
};

export default LinkButton;
