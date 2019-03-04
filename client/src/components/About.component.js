import React from "react";
import { LanguageContext } from "../contexts/language-context";
import "./styles/About.scss";
import AboutIcons from "./about_components/AboutIcons.component";
import ScrollToTopOnMount from "../router/ScrollToTopOnMount.component";
import Navbar from "./Navbar.component";

function About() {
  return (
    <LanguageContext.Consumer>
      {({ about }) => (
        <div className="app app-with-navbar-full-screen">
          <Navbar />
          <div className="main-container whiteBackground">
            <div className="about">
              <ScrollToTopOnMount />
              <h1 className="menuTitle aboutTitle">{about.title}</h1>
              <p className="description">{about.description}</p>
              <AboutIcons />
              <hr className="aboutSeparation" />
              <div className="roadmap">
                <h1 className="menuTitle">{about.roadmap}</h1>
                <h2 className="roadmapSubTitle">{about.roadmap_short}</h2>
                <ul className="roadmapList">
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.sht_1}
                  </li>
                  <li>
                    <i
                      alt="seen"
                      className="material-icons md-36 checkbox completed"
                    >
                      check_box
                    </i>
                    {about.sht_2}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.sht_3}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.sht_4}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.sht_5}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.sht_6}
                  </li>
                </ul>
                <h2 className="roadmapSubTitle">{about.roadmap_long}</h2>
                <ul className="roadmapList">
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.lgt_1}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.lgt_2}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.lgt_3}
                  </li>
                  <li>
                    <i alt="seen" className="material-icons md-36 checkbox">
                      check_box_outline_blank
                    </i>
                    {about.lgt_4}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default About;
