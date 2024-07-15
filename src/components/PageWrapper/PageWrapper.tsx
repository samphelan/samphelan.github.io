import styles from "./pageWrapperStyles.module.css";
type PageWrapperProps = {
  children?: React.ReactNode;
};

const PageWrapper = (props: PageWrapperProps) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default PageWrapper;
