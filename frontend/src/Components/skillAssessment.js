import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import Multiselect from "multiselect-dropdown-react";
import { Multiselect } from "multiselect-react-dropdown";

export default class SkillAssessment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      userid: "",
      // skills: ["HTML", "CSS", "Python"],
      skills: [
        {
          name: "HTML",
          id: 1,
        },
        {
          name: "CSS",
          id: 2,
        },
        {
          name: "Python",
          id: 3,
        },
        {
          name: "JavaScript",
          id: 4,
        },
        {
          name: "NodeJS",
          id: 5,
        },
        {
          name: "Java",
          id: 6,
        },
      ],
      selectedSkills: [],
      difficulty: "Beginner",
      type: "MCQ",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSelect(e) {
    //console.log(e);
    this.setState((state) => {
      const selectedSkills = e;
      return {
        selectedSkills,
      };
    });
    console.log(this.state.selectedSkills);
  }

  onRemove(e) {
    // console.log(e);
    this.setState((state) => {
      const selectedSkills = state.selectedSkills.filter(
        (item, j) => e[0] !== j
      );

      return {
        selectedSkills,
      };
    });
    console.log(this.state.selectedSkills);
  }

  fetchQuestions() {
    axios
      .get("http://localhost:4000/questions/")
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.state.questions);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("Form Submitted: ");
    console.log("UserID :" + this.state.userid);
    console.log("Difficulty :" + this.state.difficulty);
    console.log("Type :" + this.state.type);
    console.log("Skills :" + this.state.selectedSkills);
    console.log("No. of Skills:" + this.state.selectedSkills.length);
    const skillset = this.state.selectedSkills;
    var i = skillset.length;
    while (i < 5) {
      skillset.push({ name: "", id: i });
      i++;
    }

    const information = {
      userid: this.state.userid,
      total_skills: this.state.selectedSkills.length,
      skill_name1: skillset[0].name,
      skill_name2: skillset[1].name,
      skill_name3: skillset[2].name,
      skill_name4: skillset[3].name,
      skill_name5: skillset[4].name,
      skill_prof: 4,
      no_of_questions: 30,
    };

    console.log(information);
    axios
      .post("http://localhost:4000/skilltest/generate", information)
      .then((res) => console.log(res.data));

    this.setState({
      userid: "",
      selectedSkills: [],
      difficulty: "Beginner",
      type: "MCQ",
    });
  }

  result(params) {
    console.log(params);
  }

  render() {
    return (
      <div>
        {/* <h1>Add Course Component</h1> */}
        <div class="row container-fluid">
          <div class="col-md-4">
            <br />
            <h3> Add Question Manually</h3>
            <form onSubmit={this.onSubmit}>
              <div>
                <p id="heading"> Enter User ID</p>
                <input
                  class="form-control"
                  type="text"
                  name="userid"
                  value={this.state.userid}
                  onChange={this.handleChange}
                />
              </div>

              {this.state.selectedSkills.map((skill, i) => (
                <p>{skill.name}</p>
              ))}
              <div class="course">
                <p id="heading"> Select Skills</p>
                <Multiselect
                  options={this.state.skills} // Options to display in the dropdown
                  selectedValues={this.state.selectedSkills} // Preselected value to persist in dropdown
                  onSelect={this.onSelect} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  selectionLimit="5"
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>

              <div class="level">
                <p id="heading"> Select Difficulty</p>
                <select
                  class="form-control"
                  id="sel3"
                  value={this.state.difficulty}
                  onChange={this.handleChange}
                  name="difficulty"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
              <div class="level">
                <p id="heading"> Select Type of Questions</p>
                <select
                  class="form-control"
                  id="sel3"
                  value={this.state.type}
                  onChange={this.handleChange}
                  name="type"
                >
                  <option>MCQ</option>
                  <option>Programming</option>
                  <option>Short Answer</option>
                </select>
              </div>
              <button type="submit" class="btn btn-sm btn-primary">
                {" "}
                Generate Questions
              </button>
              <br />
              <br />
            </form>
          </div>
          <div class="col-md-8">
            <div class="container">
              <div class="table-responsive-sm">
                <table class="table table-hover">
                  <h3> List of Questions</h3>
                  <tr id="table-head">
                    <th>QUESTION </th>
                    <th>ASSESSMENT TYPE</th>
                    <th>LEVEL OF PROBLEM</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
