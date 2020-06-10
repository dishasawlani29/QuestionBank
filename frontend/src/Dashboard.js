import React from "react";
import Academy from "./img/caramelacademy.jpeg";
import Icon from "./img/icon.png";
import "bootstrap/dist/css/bootstrap.css";
import QuestionBank from "./Components/questionBank";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div class="bodybgcolor">
        <div class="index">
          <div id="index-image">
            <img src={Icon} />
          </div>
          <div class="index-data">
            <h1> Miss Melinda James</h1>
            <br />
            <h3>Profession : Philantropist</h3>
            <h3>No. of courses : 6</h3>
            <h3>Rating: *****</h3>
          </div>
        </div>
        <div class="assessment">
          <div id="course">
            <h1 onclick="location.href='question_list.html'">
              Add Course Assessment
            </h1>

            <button onclick="location.href='question_list.html'">Add</button>
          </div>
          <div id="skill">
            <h1>Add Skill Assessment</h1>
            <button>Add</button>
          </div>
          <br />
          <br />
          <div id="topic">
            <h1>Question Bank</h1>
            <button>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
