import { ReactNode } from "react";
import styles from "./codeSampleStyles.module.css";

type CodeTabsProps = {
  labels: string[];
  value: string;
  onChange: (v: string) => void;
  children?: ReactNode;
};

export const CodeTabs = (props: CodeTabsProps) => {
  return (
    <div className={styles.codeTabsWrapper}>
      <div className={styles.tabs}>
        {props.labels.map((label) => (
          <button
            onClick={() => {
              props.onChange(label);
            }}
            key={label}
            className={[
              styles.button,
              props.value === label && styles.selected,
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{props.children}</div>
    </div>
  );
};

type CodeSampleProps = {
  codeString?: string;
  children?: ReactNode;
};

const CodeSample = (props: CodeSampleProps) => {
  return (
    <div className={styles.wrapper}>
      <pre style={{ margin: 0 }}>
        <code>{props.codeString}</code>
      </pre>
    </div>
  );
};

export default CodeSample;
