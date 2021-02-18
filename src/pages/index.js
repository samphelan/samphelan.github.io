import React, { useEffect, useRef } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Anime, { anime } from "react-anime"
import PortalDemoMP4 from "../assets/portalDemo.mp4"
import NavBar from "../components/NavBar/NavBar"
import ReactImage from "../components/reactImage"

import styles from "../pageStyles/indexStyles.module.scss"
import NodeImage from "../components/nodeImage"
import MongoImage from "../components/mongoImage"
import GCPImage from "../components/gcpImage"

const TechImage = ({ children, label }) => {
  return (
    <div
      style={{
        marginRight: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "90px" }}>{children}</div>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "0.8em",
          maxWidth: "90px",
          lineHeight: "1.2em",
        }}
      >
        {label}
      </div>
    </div>
  )
}

const FeaturedWork = ({ style }) => {
  const videoRef = useRef()
  useEffect(() => {
    if (videoRef) {
      videoRef.current.play()
    }
  }, [videoRef])
  return (
    <div style={{ ...style }}>
      <h3 style={{ fontSize: "1em", color: "130,130,130", margin: 0 }}>
        FEATURED PROJECT
      </h3>
      <h2 style={{ color: "rgb(50,50,50)", margin: "10px 0" }}>
        KindBio Health Portal
      </h2>
      <h3 style={{ fontSize: "1em", color: "130,130,130" }}>
        Roles: Full-Stack Developer / UX Designer / DevOps Engineer
      </h3>
      <div style={{ borderRadius: "5px" }} className={styles.videoWrapper}>
        <video
          width={700}
          style={{ borderRadius: "10px", margin: 0 }}
          autoplay
          muted
          loop
          ref={videoRef}
        >
          <source src={PortalDemoMP4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.hoverText}>
          <div className={styles.hoverTextButton}>View Details</div>
        </div>
      </div>
      <h3 style={{ fontSize: "1em", color: "130,130,130", marginTop: "20px" }}>
        Technologies:
      </h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TechImage label={"REACT JS"}>
          <ReactImage />
        </TechImage>
        <TechImage label="NODE JS">
          <NodeImage />
        </TechImage>
        <TechImage label="MONGO DB">
          <MongoImage />
        </TechImage>
        <TechImage label="GOOGLE CLOUD PLATFORM">
          <GCPImage />
        </TechImage>
      </div>
    </div>
  )
}

const Bio = ({ style }) => {
  return (
    <div
      style={{
        backgroundColor: "#009657",
        color: "white",

        ...style,
      }}
    >
      <Anime
        easing={"easeOutQuad"}
        delay={0}
        duration={1200}
        translateX={[-15, 0]}
        opacity={[0, 1]}
      >
        <h1>
          I’m a designer, full-stack developer, and devOps engineer currently
          living in St. Louis.
        </h1>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            lineHeight: "1.7rem",
            marginBottom: "20px",
          }}
        >
          I’m available for contract work, and I’m open to full-time employment
          as well. Please send me a message if you would like to work together.
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            lineHeight: "1.7rem",
            marginBottom: "20px",
          }}
        >
          Issues that I’m particularly open to working on:
        </p>
        <ul style={{ fontWeight: "bold" }}>
          <li>Climate Change and Energy</li>
          <li>Data Dignity / Data as Labor</li>
          <li>
            More equitable compensation structures for artists and digital
            creators.
          </li>
          <li>Security and Privacy</li>
        </ul>
      </Anime>
    </div>
  )
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <NavBar></NavBar>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Bio
          style={{
            flex: "30%",
            padding: "120px 50px 50px 50px",
          }}
        />
        <FeaturedWork
          style={{ flex: "70%", padding: "120px 50px 50px 50px" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-340px",
          left: "50vw",
          zIndex: -1,
        }}
      ></div>
    </div>
  </Layout>
)

export default IndexPage
