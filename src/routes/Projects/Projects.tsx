import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Project, { ProjectData } from "../../components/Project/Project";
import styles from "./projectsStyles.module.css";
const tatMapImage = require("../../assets/tatmap.jpg");
const andySiteVid = require("../../assets/andySite.mp4");

const projectData: ProjectData[] = [
  {
    projectType: "Full-Stack App",
    header:
      "TatMap: Discovery and Booking Application for Tattoo Artists and Clients",
    description:
      "TatMap is a full-stack web application with two account types: client and artist. Artists can upload their designs, input their availability and other relevant details, and clients can search and discover based on location and style as well as book appointments and provide payment all within the site.",
    location: "tatmap",
    tech: ["React", "Typescript", "NoSQL", "Node JS", "Firebase Auth"],
    externalUrl: "https://demo.tatmap.org",
    externalUrlDescription: "View Demo",
    internalUrl: "/projects/tatmap",
    internalUrlDescription: "Demo Instructions & Code Samples",
    imgSrc: tatMapImage,
  },
  {
    projectType: "Static Site",
    header: "Andy Koeger Portfolio Site",
    description:
      "Andy Koeger is a filmmaker based in Los Angeles who hired me to create his personal portfolio site.",
    location: "andykoeger",
    tech: ["HTML", "CSS", "Javascript"],
    externalUrl: "https://andykoeger.com/",
    vidSrc: andySiteVid,
  },
];

const Projects = () => {
  return (
    <div>
      <Header />
      <PageWrapper>
        <h1 className={styles.header}>featured development projects</h1>
        {projectData.map((project) => (
          <Project key={project.header} data={project}></Project>
        ))}
      </PageWrapper>
      <Footer />
    </div>
  );
};

export default Projects;
