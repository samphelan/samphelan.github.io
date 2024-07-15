import styles from "./buttonStyles.module.css";

type ButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};

export default Button;
