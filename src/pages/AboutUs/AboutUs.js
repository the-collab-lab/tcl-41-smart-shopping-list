// import React, { Component } from 'react';
import gitcat from '../../img/github2.png';
import li from '../../img/linkedin5.png';
import rainbow from '../../img/rainbow.png';
import flower from '../../img/flower.png';
import happy from '../../img/happy.png';
import honduras from '../../img/honduras.png';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="large-container">
      {/* Jess */}
      <div className="medium-container">
        <h1>Jessica Clay</h1>
        <img src={flower} alt="flowers" className="picJ" />
        <h3>Philadelphia, PA</h3>
        <h4>Code Superpower: Innovative Thinking </h4>
        <section className="icon-container">
          <a
            href="https://github.com/jmc617"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={gitcat} alt="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/jessica-clay-09/"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={li} alt="linkedin" />
          </a>
        </section>
      </div>

      {/* Honz */}
      <div className="medium-container">
        <h1>Honz Williams</h1>
        <img src={rainbow} alt="rainbow" className="picH" />
        <h3>Brooklyn, NY</h3>
        <h4>Code Superpower: Adaptability </h4>
        <section className="icon-container">
          <a
            href="https://github.com/honzlavender"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={gitcat} alt="Github" />
          </a>
          <a
            href="https://www.linkedin.com/in/honz/"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={li} alt="Linkedin" />
          </a>
        </section>
      </div>

      {/*  Cole  */}
      <div className="medium-container">
        <h1>Cole Fortner</h1>
        <img src={happy} alt="chowdog" className="picC" />
        <h3>Atlanta, GA</h3>
        <h4>Code Superpower: Patience & Curiousity </h4>
        <section className="icon-container">
          <a
            href="https://github.com/colefortner"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={gitcat} alt="Github" />
          </a>
          <a
            href="https://www.linkedin.com/in/colefortner1/"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={li} alt="Linkedin" />
          </a>
        </section>
      </div>

      {/* Stef   */}
      <div className="medium-container">
        <h1>Estefani Baughman</h1>
        <img src={honduras} alt="mia" className="picS" />

        <h3>Portland, OR Metroplex</h3>
        <h4>Code Superpower: Experimentation </h4>
        <section className="icon-container">
          <a
            href="https://github.com/HonduranCoder"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={gitcat} alt="Github" />
          </a>
          <a
            href="https://www.linkedin.com/in/stef-baughman/"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={li} alt="Linkedin" />
          </a>
        </section>
      </div>
    </div>
  );
}
