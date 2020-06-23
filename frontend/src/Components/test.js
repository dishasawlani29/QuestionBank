import React, { Component } from "react";
import "./test.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Academy from "../img/caramelacademy.jpeg";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      currentQuestionIndex: 1,
      currentQuestion: null,
      start: false,
    };
    this.start = this.start.bind(this);
  }
  componentDidMount() {
    console.log("http://localhost:4000" + this.props.history.location.pathname);
    axios
      .get("http://localhost:4000" + this.props.history.location.pathname)
      .then((response) => {
        console.log(response.data.question_list);
        this.setState({
          questionList: response.data.question_list,
          currentQuestion: response.data.question_list[0],
        });
      });
  }

  start() {
    this.setState({
      start: true,
    });
  }
  render() {
    return (
      <div>
        {this.state.start === false && (
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
                  assessment cycle is intended to introduce the basic steps for
                  how to use assessment to improve your program.
                </p>
              </div>
              <div id="description">
                <h2>Description</h2>
                <hr class="new" />
                <ol>
                  <li>
                    Once the test begins, you are not allowed to leave Test
                    Screen.
                  </li>
                  <li>
                    Using Keys such as ALT+TAB, CTRL+TAB, ESC, F4, F5 etc. which
                    takes you off the Test Screen are prohibited.
                  </li>
                  <li>Avoid using Keys from keyboard while answering MCQs.</li>
                  <li>The Test Duration is of 1 Hour.</li>
                  <li>Make sure to answer all the questions.</li>
                  <li>
                    There is no negative marking for any of the questions.
                  </li>
                  <li>
                    You would be invigilated during the Test via Visual & Audio
                    Proctoring.
                  </li>
                </ol>
              </div>
              <button
                type="button"
                class="btn btn-success"
                id="starttest"
                onClick={this.start}
                // onclick="location.href='knowledgecheck.html'"
              >
                Start Test
              </button>

              <br />
              <br />
            </div>
          </div>
        )}
        {this.state.start === true && (
          <div>
            <div class="container-fluid navb">
              <nav class="navbar navbar-expand-lg bg navbar-light">
                <a class="navbar-brand logo1" href="#">
                  <img
                    src={Academy}
                    width="200px"
                    height="70px"
                    // style="border-radius: 100px 0px 0px 100px;"
                  />
                </a>

                <p id="test-name"> Topic: Practice Test</p>

                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapsibleNavbar"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                  <ul class="navbar-nav ml-auto ">
                    <li class="nav-item ">
                      <a class="nav-link px-lg-4 alink" href="#">
                        Proficiency:{" "}
                      </a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link px-lg-4 alink" href="#">
                        Duration :{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div class="row container-fluid">
              {/* <div class="col-md-3">
                <div
                // class="key_legend"
                >
                  {/* <h2>&nbsp;Legend</h2> */}
              {/* <div id="leftlegend">
                    <div class="square"></div>
                    <div class="square" id="answered"></div>
                    <div class="square" id="visited"></div>
                    <div class="square" id="marked"></div>
                  </div>
                  <div id="rightlegend">
                    <span> - Unvisited</span>
                    <span> - Answered</span>
                    <span> - Visited</span>
                    <span> - Marked</span>
                  </div>
                </div>
              </div>  */}
              <div class="col-md-8">
                <div
                // class="middle"
                >
                  <div class="formm">
                    <h1>Knowledge Check</h1>
                    <p>
                      Well organized and easy to understand Web building
                      tutorials with lots of examples of how to use HTML, CSS,
                      JavaScript, SQL, PHP, Python, Bootstrap, Java ...
                    </p>
                    <h2>Time for a quiz </h2>
                    <form id="quiz" name="quiz">
                      <p class="questions">
                        {this.state.currentQuestion.question}
                      </p>
                      <ul class="main">
                        <li>
                          {" "}
                          <input
                            type="radio"
                            id="mc"
                            name="question2"
                            value="Wrong"
                          />{" "}
                          {this.state.currentQuestion.option1}
                          <br />
                        </li>
                        <li>
                          {" "}
                          <input
                            type="radio"
                            id="mc"
                            name="question2"
                            value="Wrong"
                          />{" "}
                          {this.state.currentQuestion.option2}
                          <br />
                        </li>
                        <li>
                          {" "}
                          <input
                            type="radio"
                            id="mc"
                            name="question2"
                            value="Wrong"
                          />{" "}
                          {this.state.currentQuestion.option3}
                          <br />
                        </li>
                        <li>
                          {" "}
                          <input
                            type="radio"
                            id="mc"
                            name="question2"
                            value="Correct"
                          />{" "}
                          {this.state.currentQuestion.option4}
                          <br />
                        </li>
                        <span id="spa"></span>
                      </ul>

                      <br />
                    </form>
                    <button class="finish" onclick="check()">
                      I'm Finished
                    </button>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
              <div class="col-md-4">
                <div
                //class="ques_nav"
                >
                  &nbsp;
                  <h2>
                    &nbsp;Progress Grid | <span id="timer"></span>
                  </h2>
                  <div class="grid-container">
                    {this.state.questionList.map((question, i) => (
                      <div class="grid-item">
                        <div
                          class="square"
                          // onClick={this.setState({ currentQuestion: i + 1 })}
                          onClick={(e) => {
                            this.setState({
                              currentQuestion: i + 1,
                              currentQuestion: question,
                            });
                            console.log(
                              this.state.questionList[
                                this.state.currentQuestionIndex
                              ].question
                            );
                          }}
                        >
                          {i + 1}
                        </div>
                      </div>
                    ))}
                    {/* <div class="grid-item">
                  <div class="square" id="answered">
                    1
                  </div>
                </div>
                <div class="grid-item">
                  <div class="square" id="visited">
                    2
                  </div>
                </div>
                <div class="grid-item">
                  <div class="square">3</div>
                </div>
                <div class="grid-item">
                  <div class="square" id="marked">
                    4
                  </div>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
