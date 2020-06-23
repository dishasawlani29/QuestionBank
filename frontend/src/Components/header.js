import React, { Component } from "react";
import Academy from "../img/caramelacademy.jpeg";
import Icon from "../img/icon.png";

export default class Header extends Component {
  render() {
    return (
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
    );
  }
}
