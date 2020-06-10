import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, CardColumns } from "react-bootstrap";

export default class CourseAssessment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // allQuestion:{
      //   questions:[],
      //   checked: []
      // },
      questions: [],
      selectedQuestions: [],
      question: null,
      noOfQuestions: 0,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
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

  componentDidMount() {
    this.fetchQuestions();
  }

  selectQuestion = (event, question) => {
    console.log("select");
    console.log(event.target.checked);

    console.log(question);
    if (event.target.checked === true) {
      this.setState((state) => {
        const selectedQuestions = state.selectedQuestions.concat(question);
        const noOfQuestions = state.noOfQuestions + 1;
        return {
          selectedQuestions,
          noOfQuestions,
        };
      });
    } else {
      this.setState((state) => {
        const selectedQuestions = state.selectedQuestions.filter(
          (item) => item._id !== question._id
        );
        const noOfQuestions = state.noOfQuestions - 1;

        return {
          selectedQuestions,
          noOfQuestions,
        };
      });
    }
  };

  render() {
    return (
      <div>
        <h3> Basic Settings</h3>
        <div class=" row container-fluid">
          <div class="col-md-3">
            <p id="heading">No. of Questions Selected</p>
            {this.state.noOfQuestions}
          </div>
          <div class="col-md-3">
            <p id="heading">Select Difficulty</p>
            <select class="form-control" id="skdifficulty">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div class="col-md-3">
            <p id="heading">Select Course</p>
            <select class="form-control" id="skdifficulty">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div class="col-md-3">
            <p id="heading">Select Duration</p>
            <select class="form-control" id="skdifficulty">
              <option>60 Minutes</option>
              <option>90 Minutes</option>
              <option>120 Minutes</option>
            </select>
          </div>
        </div>
        <br />
        <br />
        <div class=" row container-fluid ">
          <div class="col-md-3">
            <h3>Selected Questions</h3>
            {this.state.selectedQuestions.map((currentQuestion, i) => (
              <Card
                style={{
                  width: "18rem",
                  marginTop: "2em",
                }}
                bg={"dark"}
                text={"white"}
              >
                <Card.Body>
                  <Card.Text>
                    {currentQuestion.question}
                    <br />
                    <button className="btn btn-info btn-sm">
                      {currentQuestion.question_level}
                    </button>
                    {"  "}
                    <button className="btn btn-warning btn-sm">
                      {currentQuestion.question_topic}
                    </button>
                    {"  "}
                    <button className="btn btn-danger btn-sm">
                      {currentQuestion.question_type}
                    </button>
                    <br />
                    <br />
                    {currentQuestion.question_type === "subjective" && (
                      <p>{currentQuestion.answer}</p>
                    )}
                    {currentQuestion.question_type === "truefalse" && (
                      <p>{currentQuestion.answer}</p>
                    )}
                    {currentQuestion.question_type === "mcq" && (
                      <ol>
                        {currentQuestion.isOption1 === true && (
                          <li
                            style={{
                              background: "#8cff66",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option1}
                          </li>
                        )}
                        {currentQuestion.isOption1 === false && (
                          <li
                            style={{
                              backgroundColor: "#ff4d4d",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option1}
                          </li>
                        )}

                        {currentQuestion.isOption2 === true && (
                          <li
                            style={{
                              background: "#8cff66",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option2}
                          </li>
                        )}
                        {currentQuestion.isOption2 === false && (
                          <li
                            style={{
                              backgroundColor: "#ff4d4d",

                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option2}
                          </li>
                        )}

                        {currentQuestion.isOption3 === true && (
                          <li
                            style={{
                              background: "#8cff66",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option3}
                          </li>
                        )}
                        {currentQuestion.isOption3 === false && (
                          <li
                            style={{
                              backgroundColor: "#ff4d4d",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option3}
                          </li>
                        )}

                        {currentQuestion.isOption4 === true && (
                          <li
                            style={{
                              background: "#8cff66",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option4}
                          </li>
                        )}
                        {currentQuestion.isOption4 === false && (
                          <li
                            style={{
                              backgroundColor: "#ff4d4d",
                              // listStyleType: "none",
                            }}
                          >
                            {currentQuestion.option4}
                          </li>
                        )}
                      </ol>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div class="col-md-9">
            <h3> List of Questions</h3>
            <div class="container">
              <CardColumns sm="3" md="6" lg="9">
                {this.state.questions.map((currentQuestion, i) => (
                  <Card
                    style={{
                      width: "18rem",
                      marginTop: "2em",
                    }}
                    bg={"dark"}
                    text={"white"}
                  >
                    <Card.Body>
                      <Card.Text>
                        <label class="container1">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              this.selectQuestion(e, currentQuestion)
                            }
                          />
                          <span class="checkmark"></span>
                        </label>
                        <br />
                        {currentQuestion.question}
                        <br />
                        <button className="btn btn-info btn-sm">
                          {currentQuestion.question_level}
                        </button>
                        {"  "}
                        <button className="btn btn-warning btn-sm">
                          {currentQuestion.question_topic}
                        </button>
                        {"  "}
                        <button className="btn btn-danger btn-sm">
                          {currentQuestion.question_type}
                        </button>
                        <br />
                        <br />
                        {currentQuestion.question_type === "subjective" && (
                          <p>{currentQuestion.answer}</p>
                        )}
                        {currentQuestion.question_type === "truefalse" && (
                          <p>{currentQuestion.answer}</p>
                        )}
                        {currentQuestion.question_type === "mcq" && (
                          <ol>
                            {currentQuestion.isOption1 === true && (
                              <li
                                style={{
                                  background: "#8cff66",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option1}
                              </li>
                            )}
                            {currentQuestion.isOption1 === false && (
                              <li
                                style={{
                                  backgroundColor: "#ff4d4d",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option1}
                              </li>
                            )}

                            {currentQuestion.isOption2 === true && (
                              <li
                                style={{
                                  background: "#8cff66",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option2}
                              </li>
                            )}
                            {currentQuestion.isOption2 === false && (
                              <li
                                style={{
                                  backgroundColor: "#ff4d4d",

                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option2}
                              </li>
                            )}

                            {currentQuestion.isOption3 === true && (
                              <li
                                style={{
                                  background: "#8cff66",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option3}
                              </li>
                            )}
                            {currentQuestion.isOption3 === false && (
                              <li
                                style={{
                                  backgroundColor: "#ff4d4d",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option3}
                              </li>
                            )}

                            {currentQuestion.isOption4 === true && (
                              <li
                                style={{
                                  background: "#8cff66",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option4}
                              </li>
                            )}
                            {currentQuestion.isOption4 === false && (
                              <li
                                style={{
                                  backgroundColor: "#ff4d4d",
                                  // listStyleType: "none",
                                }}
                              >
                                {currentQuestion.option4}
                              </li>
                            )}
                          </ol>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </CardColumns>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
