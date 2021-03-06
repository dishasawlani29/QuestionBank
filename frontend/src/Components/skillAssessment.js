import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import Multiselect from "multiselect-dropdown-react";
import { Multiselect } from "multiselect-react-dropdown";
import Header from "./header.js";
import Footer from "./footer.js";
import TestInstructions from "./testInstructions";
import Test from "./test";

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
          name: "Javascript",
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
        {
          name: "Bootstrap",
          id: 7,
        },
      ],
      category: "",
      prof: "",
      selectedSkills: [],
      idList: [],
      questionList: [],
      difficulty: "Beginner",
      //type: "MCQ",
      user_email_id: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.generateTest = this.generateTest.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
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
    //console.log("Type :" + this.state.type);
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
      total_skills: "4",
      skill_name1: skillset[0].name,
      skill_name2: skillset[1].name,
      skill_name3: skillset[2].name,
      skill_name4: skillset[3].name,
      skill_name5: skillset[4].name,
      skill_prof: 4,
      no_of_questions: 30,
      category: "IT Professional",
    };

    console.log(information);
    axios
      .post("http://localhost:4000/skilltest/generate", information)
      .then((res) => {
        // console.log(res.data[0]);
        this.setState({ idList: res.data });
        console.log(this.state.idList);
        this.state.idList.forEach((id) => {
          axios
            .get("http://localhost:4000/questions/" + id)
            .then((response) => {
              this.setState((state) => {
                //console.log(response.data);
                const questionList = state.questionList.concat(response.data);
                return {
                  questionList,
                };
              });
              //console.log(this.state.questionList);
            });
        });
        //console.log(this.state.questionList);
      });

    // this.setState({
    //   userid: "",
    //   selectedSkills: [],
    //   difficulty: "Beginner",
    //   type: "MCQ",
    // });
    this.setState({
      step: 2,
    });
  }

  onBack() {
    console.log("back");
    const x = this.state.step;
    this.setState({
      step: x - 1,
    });
  }

  onNext() {
    console.log("next");
    const x = this.state.step;
    this.setState({
      step: x + 1,
    });
    // if (this.state.step == 1) {
    console.log(this.state.questionList);
    // }
  }

  result(params) {
    console.log(params);
  }

  generateTest() {
    console.log("generateTest");
    const info = {
      question_list: this.state.questionList,
      test_type: "skill",
      user_id: this.state.user_email_id,
    };
    axios.post("http://localhost:4000/test/create", info).then((res) => {
      console.log(res);
    });
    const x = this.state.step;
    this.setState({
      step: x + 1,
    });
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.step == 1 && (
          <div class="row container-fluid">
            <div class="container col-md-6" style={{ alignContent: "center" }}>
              <br />
              <h3> Add Question Manually</h3>
              <form onSubmit={this.onSubmit}>
                {/* <div>
                  <p id="heading"> Enter User ID</p>
                  <input
                    class="form-control"
                    type="text"
                    name="userid"
                    value={this.state.userid}
                    onChange={this.handleChange}
                  />
                </div> */}

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
                {/* <div class="level">
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
                </div> */}
                <div class="level">
                  <p id="heading"> Select Category</p>
                  <select
                    class="form-control"
                    id="sel3"
                    value={this.state.category}
                    onChange={this.handleChange}
                    name="category"
                  >
                    <option>IT Professional</option>
                    <option>IT Student</option>
                    <option>IT Non Professional</option>
                  </select>
                </div>
                <div class="level">
                  <p id="heading"> Select Proficiency</p>
                  <select
                    class="form-control"
                    id="sel3"
                    value={this.state.prof}
                    onChange={this.handleChange}
                    name="prof"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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
          </div>
        )}
        {this.state.step == 2 && (
          <div class="container">
            <div class="table-responsive-sm">
              <table class="table table-hover">
                <h3> List of Questions</h3>
                <tr id="table-head">
                  <th>QUESTION </th>
                  <th>TOPIC</th>
                  <th>COURSE</th>
                </tr>
                <tbody>
                  {this.state.questionList.map((currentQuestion, i) => (
                    <tr>
                      <td>{currentQuestion.question}</td>
                      <td>{currentQuestion.question_topic}</td>
                      <td>{currentQuestion.question_course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              id="back-button"
              onClick={this.onBack}
            >
              {" "}
              Back
            </button>
            <button
              type="button"
              class="btn btn-success btn-sm"
              id="back-button"
              onClick={this.onNext}
            >
              {" "}
              Next
            </button>
          </div>
        )}
        {this.state.step == 3 && (
          <div class="flex-container schedule container-fluid">
            <div>
              <p id="heading"> Enter User Email ID</p>
              <input
                class="form-control"
                type="text"
                name="user_email_id"
                value={this.state.user_email_id}
                onChange={this.handleChange}
              />
            </div>

            <div class="test-date_time">
              <p id="heading_schedule">The test is valid from : </p>
              <div class="row">
                <input
                  type="date"
                  class="form-control"
                  style={{ width: "45%", margin: "1%" }}
                />
                <input
                  type="time"
                  class="form-control"
                  style={{ width: "45%", margin: "1%" }}
                />
              </div>
            </div>

            <div class="test-date_time">
              <p id="heading_schedule">To:</p>
              <div class="row">
                <input
                  type="date"
                  class="form-control"
                  style={{ width: "45%", margin: "1%" }}
                />
                <input
                  type="time"
                  class="form-control"
                  style={{ width: "45%", margin: "1%" }}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                class="btn btn-warning btn-sm"
                id="back-button"
                onClick={this.onBack}
              >
                {" "}
                Back
              </button>
              {"   "}
              {/* <Link
                to={{
                  pathname: "/test",
                  aboutProps: {
                    questionList: this.state.questionList,
                    currentQuestion: this.state.questionList[0],
                  },
                }}
              > */}
              <button
                type="button"
                class="btn btn-success btn-sm"
                id="generateTest-button"
                onClick={this.generateTest}
              >
                {" "}
                Generate Test
              </button>
              {/* </Link> */}
            </div>
          </div>
        )}
        {this.state.step == 4 && <h1>Test Created</h1>}
        <Footer />
      </div>
    );
  }
}
