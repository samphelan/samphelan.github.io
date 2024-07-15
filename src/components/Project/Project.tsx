import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import A from "../A/A";
import LinkButton from "../LinkButton/LinkButton";
import styles from "./projectStyles.module.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TechList from "../TechList/TechList";

const placeholder = require("../../assets/placeholder.png");

export type ProjectData = {
  projectType: string;
  header: string;
  description: string;
  location: string;
  tech: string[];
  imgSrc?: string;
  vidSrc?: string;
  externalUrl?: string;
  externalUrlDescription?: string;
  internalUrl?: string;
  internalUrlDescription?: string;
};

type ProjectProps = {
  data: ProjectData;
};

const Project = (props: ProjectProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.projectType}>
            {props.data.projectType.toUpperCase()}
          </div>
        </div>
        <A to={`/projects/${props.data.location}`} className={styles.header}>
          {props.data.header}
        </A>
        <p className={styles.description}>{props.data.description}</p>
        <div className={styles.linksWrapper}>
          {props.data.externalUrl && (
            <LinkButton
              href={props.data.externalUrl}
              style={{ marginRight: "20px" }}
            >
              {props.data.externalUrlDescription || "View Project"}{" "}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
              ></FontAwesomeIcon>
            </LinkButton>
          )}
          {props.data.internalUrl && (
            <A to={props.data.internalUrl}>
              {props.data.internalUrlDescription}
            </A>
          )}
        </div>
        <h3 className={styles.techHeader}>TECH</h3>
        <TechList items={props.data.tech} />
      </div>
      <div className={styles.imageWrapper}>
        {props.data.imgSrc && (
          <img src={props.data.imgSrc} className={styles.image} />
        )}
        {props.data.vidSrc && (
          <video autoPlay muted loop id="myVideo" className={styles.image}>
            <source src={props.data.vidSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default Project;
