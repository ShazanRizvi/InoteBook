import React from "react";
import aboutimage from "../images/about.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 my-5 text-md-start  rounded-2 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 style={{fontWeight:"600"}} className="display-4 fw-bold lh-1">iNotebook</h1>
        <p className="lead my-3">
          A well crafted application for making notes, To-Do's, daily tasks and
          much more with an intuitive design and a user friendly interface for
          the user to have the best experience and the highest productivity
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link role="button" className="btn btn-outline-dark btn-lg px-4" to="/signup">
              Sign Up for free
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img className="rounded-lg-3" src={aboutimage} alt="" width="720" />
      </div>
    </div>
  );
};

export default About;
