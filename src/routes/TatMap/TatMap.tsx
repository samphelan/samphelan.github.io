import { useState } from "react";
import {
  googleAPIString,
  inputString,
  locationInputString,
  studioLocationString,
  useClickOutsideString,
} from "../../codeStrings";
import CodeSample, { CodeTabs } from "../../components/CodeSample/CodeSample";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TechList from "../../components/TechList/TechList";
import styles from "./tatMapStyles.module.css";
import LocationInput, {
  StudioLocation,
} from "../../components/LocationInput/LocationInput";
const placeholder = require("../../assets/tatmap.jpg");

const TatMap = () => {
  const [selectedTab, setSelectedTab] = useState("LocationInput.tsx");
  const [locationValue, setLocationValue] = useState<StudioLocation>();

  const getCodeSample = (tab: string) => {
    switch (tab) {
      case "LocationInput.tsx":
        return locationInputString;
      case "Input.tsx":
        return inputString;
      case "googleAPIFunctions.ts":
        return googleAPIString;
      case "useClickOutside.ts":
        return useClickOutsideString;
      default:
        return locationInputString;
    }
  };

  return (
    <div>
      <Header />
      <PageWrapper>
        <h1 className={styles.header}>tatmap</h1>
        <TechList
          items={["React", "Typescript", "NoSQL", "Node JS", "Firebase Auth"]}
          center
          style={{ marginBottom: "40px" }}
        />
        <section className={styles.photoSection}>
          <div className={[styles.infoWrapper, styles.leftWrapper].join(" ")}>
            <section className={[styles.textBlock].join(" ")}>
              <h3>Overview</h3>
              <p className={styles.appleFont}>
                TatMap began development in January 2024 and is scheduled to go
                into production in Fall of 2024. It is a booking and discovery
                platform for tattoo artists and clients built using modern
                frameworks with security, scalability, speed, and
                cost-efficiency in mind. The front-end is React with Typescript
                which interacts with serverless functions written in NodeJS and
                hosted on Firebase as well as a NoSQL datastore.
              </p>
            </section>
            <section className={styles.textBlock}>
              <h3>Try the Demo</h3>
              <p className={styles.appleFont}>
                The demo is available at{" "}
                <a href="https://demo.tatmap.org">https://demo.tatmap.org/</a>.
                It is a scalable, production-ready prototype hosted in a staging
                environment. The data is reset daily, so feel free to create
                posts, change user settings, and use any of the other available
                features. You are welcome to create a new account or use the
                following dummy account:
              </p>
              <div className={styles.credentials}>
                <p style={{ marginBottom: "10px" }}>
                  Username:{" "}
                  <span className={styles.appleFont}>demo@tatmap.org</span>
                </p>
                <p>
                  Password: <span className={styles.appleFont}>TatMap2024</span>
                </p>
              </div>
            </section>
          </div>
          <div className={[styles.imageWrapper, styles.rightWrapper].join(" ")}>
            <img src={placeholder} className={styles.image} />
          </div>
        </section>
        <h3 className={styles.sectionHeader}>Key Features</h3>
        <section className={styles.photoSection}>
          <div className={[styles.imageWrapper, styles.leftWrapper].join(" ")}>
            <img src={placeholder} className={styles.image} />
          </div>
          <div className={[styles.infoWrapper, styles.rightWrapper].join(" ")}>
            <section className={styles.textBlock}>
              <h4>Location Search</h4>
              <p className={styles.appleFont}>
                One of the primary features of the site is the ability to search
                for artists and posts by location. The location search bar
                offers suggestions using the{" "}
                <a href="https://developers.google.com/maps/documentation/javascript/place-autocomplete">
                  Google Maps Autocomplete API
                </a>
                . Once a suggestion is selected, additional data about the
                location is fetched from the{" "}
                <a href="https://developers.google.com/maps/documentation/places/web-service/details">
                  Google Place Details API
                </a>
                , such as geocoordinates, locality, and postal code, which is
                then structured into a custom StudioLocation object (shown
                below) and stored in state.
              </p>
              <CodeSample codeString={studioLocationString}>
                StudioLocation
              </CodeSample>
              <p className={styles.appleFont}>
                Every post and user document has a StudioLocation property
                (controlled in{" "}
                <strong>
                  Settings {">"} Studio Location {">"} Search Results
                </strong>
                ) that can be compared against the search location to determine
                the distance. By using geocoordinates, determining whether a
                location falls within the desired geographic area can be done
                with simple inequality operations, meaning the relevant posts
                can be queried directly from the database, thereby preventing
                unnecessary read operations and the incurring of additional
                costs. The entire app is built with scalability, speed, and
                cost-efficiency in mind, only ever reading the posts which will
                be displayed to the user from the database and never filtering
                after the fact on the server or the front-end.
              </p>
            </section>
          </div>
        </section>
        <h3 className={styles.sectionHeader}>Example & Code Sample</h3>
        <section className={styles.photoSection}>
          <section className={[styles.codeBlock, styles.leftWrapper].join(" ")}>
            <CodeTabs
              value={selectedTab}
              onChange={(v) => {
                setSelectedTab(v);
              }}
              labels={[
                "LocationInput.tsx",
                "Input.tsx",
                "googleAPIFunctions.ts",
                "useClickOutside.ts",
              ]}
            />
            <CodeSample codeString={getCodeSample(selectedTab)}></CodeSample>
          </section>
          <div className={styles.rightWrapper}>
            <LocationInput
              label="Studio Location"
              value={locationValue}
              onSelect={(l) => {
                setLocationValue(l);
              }}
            />
            {locationValue && (
              <div>
                <h5>Studio Location State:</h5>
                <div>
                  <div> {"{"}</div>
                  {Object.keys(locationValue).map((key) => (
                    <div key={key}>
                      <strong>{key}</strong>:{" "}
                      {JSON.stringify(
                        locationValue[key as keyof StudioLocation]
                      )}
                    </div>
                  ))}{" "}
                  <div>{"}"}</div>
                </div>
              </div>
            )}
          </div>
        </section>
      </PageWrapper>
    </div>
  );
};

export default TatMap;
