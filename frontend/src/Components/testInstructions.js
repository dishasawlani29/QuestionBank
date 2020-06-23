import React, { Component } from "react";
import "./test.css";
import { Link } from "react-router-dom";

export default class TestInstructions extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#011e30" }} className="testbody">
        <div class="container" id="mainins">
          <h1>Welcome to the Test of #topic </h1>
          <div id="instructions">
            <h2>Instructions</h2>
            <hr class="new" />
            <p>
              Assessment is the systematic, ongoing process of gathering and
              interpreting evidence of student learning to determine if a
              program is meeting its learning goals and then using that
              information to improve the program. This overview of the
              assessment cycle is intended to introduce the basic steps for how
              to use assessment to improve your program.
            </p>
          </div>
          <div id="description">
            <h2>Description</h2>
            <hr class="new" />
            <ol>
              <li>
                Once the test begins, you are not allowed to leave Test Screen.
              </li>
              <li>
                Using Keys such as ALT+TAB, CTRL+TAB, ESC, F4, F5 etc. which
                takes you off the Test Screen are prohibited.
              </li>
              <li>Avoid using Keys from keyboard while answering MCQs.</li>
              <li>The Test Duration is of 1 Hour.</li>
              <li>Make sure to answer all the questions.</li>
              <li>There is no negative marking for any of the questions.</li>
              <li>
                You would be invigilated during the Test via Visual & Audio
                Proctoring.
              </li>
            </ol>
          </div>
          <Link to="/test">
            <button
              type="button"
              class="btn btn-success"
              id="starttest"
              // onclick="location.href='knowledgecheck.html'"
            >
              Start Test
            </button>
          </Link>
          <br />
          <br />
        </div>
      </div>
    );
  }
}
