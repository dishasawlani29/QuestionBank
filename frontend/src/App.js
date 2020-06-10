import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
//import AddCourse from "./Components/questionBank.component";
import Academy from "./img/caramelacademy.jpeg";
import Icon from "./img/icon.png";
import CourseAssessment from "./Components/courseAssessment";
import SkillAssessment from "./Components/skillAssessment";
import QuestionBank from "./Components/questionBank";
import QuestionBank2 from "./Components/questionBank2";

function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
      <div class="container-fluid navv">
        <nav class="navbar navbar-expand-lg bg navbar-light">
          {/* <!-- Brand--> */}
          <a class="navbar-brand logo1" href="acadamy.html">
            <img
              src={Academy}
              width="200px"
              height="70px"
              //   style="border-radius: 100px 0px 0px 100px;"
            />
          </a>

          {/* <!-- Toggler/collapsibe Button --> */}
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          {/* <!-- Navbar links --> */}
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ml-auto font-weight-bold">
              <li class="nav-item ">
                <a class="nav-link px-lg-4 alink" href="#">
                  IT Services
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-4 alink" href="#">
                  Categories
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-4 alink" href="#">
                  Contact US
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-4 alink" href="#">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-lg-4 alink" href="#">
                  <img src={Icon} style={{ height: "30px" }} />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Router>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/questionBank" component={QuestionBank} />
        <Route path="/dashboard/questionBank2" component={QuestionBank2} />
        <Route
          path="/dashboard/courseAssessment"
          component={CourseAssessment}
        />
        <Route path="/dashboard/skillAssessment" component={SkillAssessment} />
      </Router>
      <div class="bodybgcolor">
        <section class="footer-section bg-lightgrey" id="foot-sec">
          <div class="contai">
            <div class="footer text-center">
              <div>
                <div class="row mb-5">
                  <div class="col-12">
                    <p
                      class="mb-0"
                      id="socialmedia1"
                      //   style="overflow-y: hidden;padding-top: 40px;"
                      style={{ paddingTop: "40px" }}
                    >
                      <a
                        href="https://www.facebook.com/caramelacademy/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-facebook-square"
                          //   style="font-size:36px;color: #292C7D;"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a href="https://twitter.com/caramelacademy" class="p-2">
                        <span
                          class="fa fa-twitter-square"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://www.instagram.com/caramelitacademy/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-instagram"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/37846486/admin/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-linkedin-square"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://in.pinterest.com/caramelacademy/"
                        class="p-2"
                      >
                        <span
                          class="fa fa-pinterest-square"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                      <a
                        href="https://api.whatsapp.com/send?phone=+918886660462&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
                        class="p-2"
                      >
                        <span
                          class="fa fa-whatsapp"
                          //   style="font-size:36px;color: #292C7D"
                          style={{ fontSize: "36px" }}
                        ></span>
                      </a>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <p class="mb-0" id="foter" style={{ fontSize: "18px" }}>
                      Copyright &copy;
                      <script>
                        document.write(new Date().getFullYear());
                      </script>{" "}
                      All rights reserved By Caramel IT Services Pvt.Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
