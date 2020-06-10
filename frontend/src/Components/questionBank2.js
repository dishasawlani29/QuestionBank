import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nav, Col, Tab, Row } from "react-bootstrap";
import { Card, Button, CardColumns } from "react-bootstrap";

export default class QuestionBank2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question_topic: "Javascript",
      question_type: "Javascript",
      question_level: "Easy/Beginner",
      question: "",
      answer: "",
      value: "",
      time: "",
      option1: "",
      isOption1: false,
      option2: "",
      isOption2: false,
      option3: "",
      isOption3: false,
      option4: "",
      isOption4: false,
      questions: [],
      typequestions: [],
      file: null,
      type: "mcq",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickTemplate = this.onClickTemplate.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.changeType = this.changeType.bind(this);
    this.fetchQuestionsType = this.fetchQuestionsType.bind(this);
  }

  changeType(e, type) {
    console.log(type);
    this.setState({
      type: type,
    });
    this.fetchQuestionsType(type);
    // console.log(this.state.type);
  }

  fetchQuestionsType(type) {
    // const newValue = numbers.find((number)=> number > 3 );
    this.setState((state) => {
      const typequestions = state.questions.filter(
        (question) => question.question_type === type
      );
      console.log(typequestions);
      return {
        typequestions,
      };
    });
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
    // console.log(this.state.questions);
    this.fetchQuestionsType(this.state.type);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  onClickTemplate() {
    axios.get("http://localhost:4000/questions/template");
  }

  onClickDelete(id, e) {
    console.log(id);
    axios
      .delete("http://localhost:4000/questions/delete/" + id)
      .then((response) => {
        console.log("Course deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
    this.fetchQuestions();
  }

  onSelect(e) {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  }

  onUpload(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    console.log("start");
    axios
      .post("http://localhost:4000/questions/upload", data)
      .then((res) => console.log(res.statusText));
    console.log("end");
    this.fetchQuestions();
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("Form Submitted: ");
    console.log("Question Topic :" + this.state.question_topic);
    console.log("Question Level :" + this.state.question_level);
    console.log("Question Type :" + this.state.question_type);
    console.log("Question:" + this.state.question);
    console.log("Option1:" + this.state.option1);
    console.log("Is Option 1 correct?:" + this.state.isOption1);
    console.log("Option2:" + this.state.option2);
    console.log("Is Option 2 correct?:" + this.state.isOption2);
    console.log("Option3:" + this.state.option3);
    console.log("Is Option 3 correct?:" + this.state.isOption3);
    console.log("Option4:" + this.state.option4);
    console.log("Is Option 4 correct?:" + this.state.isOption4);

    console.log("Answer:" + this.state.answer);
    console.log("Time:" + this.state.time);

    const newQuestion = {
      question_topic: this.state.question_topic,
      question_type: this.state.question_type,
      question_level: this.state.question_level,
      question: this.state.question,
      answer: this.state.answer,
      option1: this.state.option1,
      isOption1: this.state.isOption1,
      option2: this.state.option2,
      isOption2: this.state.isOption2,
      option3: this.state.option3,
      isOption3: this.state.isOption3,
      option4: this.state.option4,
      isOption4: this.state.isOption4,
      time: this.state.time,
    };

    axios
      .post("http://localhost:4000/questions/create", newQuestion)
      .then((res) => console.log(res.data));

    this.setState({
      question_topic: "Javascript",
      question_type: "Javascript",
      question_level: "Easy/Beginner",
      question: "",
      answer: "",
      value: "",
      time: "",
      option1: "",
      isOption1: false,
      option2: "",
      isOption2: false,
      option3: "",
      isOption3: false,
      option4: "",
      isOption4: false,
    });
    this.fetchQuestions();
  }

  render() {
    return (
      <div
        style={{ marginTop: "4em", marginBottom: "11em", marginLeft: "1em" }}
      >
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={4}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"

                    // onClick={(e) => {
                    //   this.changeType(e, "all");
                    // }}
                  >
                    All Questions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    value="mcq"
                    onClick={(e) => {
                      this.changeType(e, "mcq");
                    }}
                  >
                    MCQ Questions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    value="subjective"
                    onClick={(e) => {
                      this.changeType(e, "subjective");
                    }}
                  >
                    Subjective Questions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="fourth"
                    value="programing"
                    onClick={(e) => {
                      this.changeType(e, "programming");
                    }}
                  >
                    Programing Questions
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={4}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {" "}
                  <div class="container">
                    {this.state.questions.map((currentQuestion, i) => (
                      <Card
                        border="dark"
                        style={{
                          // width: "rem",
                          marginTop: "2em",
                        }}
                        // bg={"dark"}
                        // text={"white"}
                      >
                        <Card.Header>
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
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <label class="container1"></label>

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
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}
                                {currentQuestion.isOption1 === false && (
                                  <li
                                    style={
                                      {
                                        //  backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}

                                {currentQuestion.isOption2 === true && (
                                  <li
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}
                                {currentQuestion.isOption2 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}

                                {currentQuestion.isOption3 === true && (
                                  <li
                                    style={
                                      {
                                        //  background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}
                                {currentQuestion.isOption3 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}

                                {currentQuestion.isOption4 === true && (
                                  <li
                                    style={
                                      {
                                        //background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option4}
                                  </li>
                                )}
                                {currentQuestion.isOption4 === false && (
                                  <li
                                    style={
                                      {
                                        //backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
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
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {" "}
                  <div class="container">
                    {this.state.typequestions.map((currentQuestion, i) => (
                      <Card
                        border="dark"
                        style={{
                          // width: "rem",
                          marginTop: "2em",
                        }}
                        // bg={"dark"}
                        // text={"white"}
                      >
                        <Card.Header>
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
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <label class="container1"></label>

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
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}
                                {currentQuestion.isOption1 === false && (
                                  <li
                                    style={
                                      {
                                        //  backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}

                                {currentQuestion.isOption2 === true && (
                                  <li
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}
                                {currentQuestion.isOption2 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}

                                {currentQuestion.isOption3 === true && (
                                  <li
                                    style={
                                      {
                                        //  background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}
                                {currentQuestion.isOption3 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}

                                {currentQuestion.isOption4 === true && (
                                  <li
                                    style={
                                      {
                                        //background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option4}
                                  </li>
                                )}
                                {currentQuestion.isOption4 === false && (
                                  <li
                                    style={
                                      {
                                        //backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
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
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div class="container">
                    {this.state.typequestions.map((currentQuestion, i) => (
                      <Card
                        style={{
                          // width: "rem",
                          marginTop: "2em",
                        }}
                        // bg={"dark"}
                        // text={"white"}
                      >
                        <Card.Header>
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
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <label class="container1"></label>

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
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}
                                {currentQuestion.isOption1 === false && (
                                  <li
                                    style={
                                      {
                                        //  backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}

                                {currentQuestion.isOption2 === true && (
                                  <li
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}
                                {currentQuestion.isOption2 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}

                                {currentQuestion.isOption3 === true && (
                                  <li
                                    style={
                                      {
                                        //  background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}
                                {currentQuestion.isOption3 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}

                                {currentQuestion.isOption4 === true && (
                                  <li
                                    style={
                                      {
                                        //background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option4}
                                  </li>
                                )}
                                {currentQuestion.isOption4 === false && (
                                  <li
                                    style={
                                      {
                                        //backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
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
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div class="container">
                    {this.state.typequestions.map((currentQuestion, i) => (
                      <Card
                        style={{
                          // width: "rem",
                          marginTop: "2em",
                        }}
                        // bg={"dark"}
                        // text={"white"}
                      >
                        <Card.Body>
                          <Card.Text>
                            <label class="container1"></label>
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
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}
                                {currentQuestion.isOption1 === false && (
                                  <li
                                    style={
                                      {
                                        //  backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option1}
                                  </li>
                                )}

                                {currentQuestion.isOption2 === true && (
                                  <li
                                    style={
                                      {
                                        // background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}
                                {currentQuestion.isOption2 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option2}
                                  </li>
                                )}

                                {currentQuestion.isOption3 === true && (
                                  <li
                                    style={
                                      {
                                        //  background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}
                                {currentQuestion.isOption3 === false && (
                                  <li
                                    style={
                                      {
                                        // backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option3}
                                  </li>
                                )}

                                {currentQuestion.isOption4 === true && (
                                  <li
                                    style={
                                      {
                                        //background: "#8cff66",
                                        // listStyleType: "none",
                                      }
                                    }
                                  >
                                    {currentQuestion.option4}
                                  </li>
                                )}
                                {currentQuestion.isOption4 === false && (
                                  <li
                                    style={
                                      {
                                        //backgroundColor: "#ff4d4d",
                                        // listStyleType: "none",
                                      }
                                    }
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
                </Tab.Pane>
              </Tab.Content>
            </Col>
            <Col sm={4}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div>
                    <h3>Upload questions in bulk</h3>
                    <p>
                      Use the form below to upload a list of questions. Click{" "}
                      <a
                        href="/questions/template"
                        //   href="#"
                        onClick={this.onClickTemplate}
                      >
                        here
                      </a>{" "}
                      for an example template.
                    </p>
                    <form
                      // action="/questions/upload"
                      // method="POST"
                      encType="multipart/form-data"
                      //onSumbit={this.onUpload}
                    >
                      <input
                        type="file"
                        name="file"
                        accept="*.csv"
                        onChange={this.onSelect}
                      />
                      <br />
                      <br />
                      <input
                        type="submit"
                        onClick={this.onUpload}
                        value="Upload Questions"
                      />
                    </form>

                    <br />
                    <h3> Add Question Manually</h3>
                    <form onSubmit={this.onSubmit}>
                      <div class="course">
                        <p id="heading"> Select Course Name</p>
                        <select
                          class="form-control"
                          id="sel1"
                          name="question_course"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="topic">
                        <p id="heading"> Select Topic(s)</p>
                        <select
                          class="form-control"
                          id="sel2"
                          value={this.state.question_topic}
                          // onChange={this.onChangeQuestionTopic}
                          onChange={this.handleChange}
                          name="question_topic"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="level">
                        <p id="heading"> Select Level</p>
                        <select
                          class="form-control"
                          id="sel3"
                          value={this.state.question_level}
                          // onChange={this.onChangeQuestionLevel}
                          onChange={this.handleChange}
                          name="question_level"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Expert</option>
                        </select>
                      </div>

                      <div class="questype">
                        <p id="heading"> Add Question Type</p>
                        <select
                          class="form-control"
                          id="ques-type"
                          value={this.state.question_type}
                          // onChange={this.onChangeQuestionType}
                          onChange={this.handleChange}
                          name="question_type"
                        >
                          <option
                            placeholder="eg. mcq, subjective, true/false"
                            value=" "
                          ></option>
                          <option value="mcq">MCQ - 1</option>
                          <option value="subjective">Subjective - 2</option>
                          <option value="truefalse">True/False - 1</option>
                        </select>
                      </div>

                      {this.state.question_type === "mcq" && (
                        <div>
                          <div className="form-group">
                            <p id="heading">Question</p>
                            <textarea
                              name="question"
                              value={this.state.question}
                              onChange={this.handleChange}
                            ></textarea>
                            <br />
                            {/* <label id="heading">Options:</label>
                    <ul>
                      {this.state.options.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul> */}
                            <label>Option 1:</label>
                            <input
                              type="text"
                              name="option1"
                              className="form-control"
                              value={this.state.option1}
                              onChange={this.handleChange}
                            />
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name="isOption1"
                                // value={this.state.isOption1}
                                onChange={this.handleChange}
                                checked={this.state.isOption1}
                              />
                              <label>Is Option 1 correct?</label>
                            </div>
                            <label>Option 2:</label>
                            <input
                              type="text"
                              name="option2"
                              className="form-control"
                              value={this.state.option2}
                              onChange={this.handleChange}
                            />
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name="isOption2"
                                // value={this.state.isOption1}
                                onChange={this.handleChange}
                                checked={this.state.isOption2}
                              />
                              <label>Is Option 2 correct?</label>
                            </div>
                            <label>Option 3:</label>
                            <input
                              type="text"
                              name="option3"
                              className="form-control"
                              value={this.state.option3}
                              onChange={this.handleChange}
                            />
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name="isOption3"
                                // value={this.state.isOption1}
                                onChange={this.handleChange}
                                checked={this.state.isOption3}
                              />
                              <label>Is Option 3 correct?</label>
                            </div>
                            <label>Option 4:</label>
                            <input
                              type="text"
                              name="option4"
                              className="form-control"
                              value={this.state.option4}
                              onChange={this.handleChange}
                            />
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name="isOption4"
                                // value={this.state.isOption1}
                                onChange={this.handleChange}
                                checked={this.state.isOption4}
                              />
                              <label>Is Option 4 correct?</label>
                            </div>
                            <br />
                            {/* <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onAddOption}
                    >
                      Add
                    </button> */}
                          </div>
                          {/* <p id="heading">Answer</p>
                  <input
                    type="text"
                    className="form-control"
                    name="answer"
                    value={this.state.answer}
                    // onChange={this.onChangeAnswer}
                    onChange={this.handleChange}
                  /> */}
                        </div>
                      )}
                      {this.state.question_type === "subjective" && (
                        <div>
                          <p id="heading">Question</p>
                          <textarea
                            value={this.state.question}
                            name="question"
                            onChange={this.handleChange}
                          ></textarea>

                          <p id="heading">Answer</p>
                          <textarea
                            value={this.state.answer}
                            name="answer"
                            // onChange={this.onChangeAnswer}
                            onChange={this.handleChange}
                          ></textarea>
                        </div>
                      )}
                      {this.state.question_type === "truefalse" && (
                        <div>
                          <p id="heading">Question</p>
                          <textarea
                            rows="3"
                            //    style="width:100%"
                            style={{ width: "100%" }}
                            value={this.state.question}
                            name="question"
                            onChange={this.handleChange}
                          ></textarea>
                          <br />
                          <br />
                          <input
                            type="radio"
                            id="false"
                            name="answer"
                            value="true"
                            checked={this.state.answer === "true"}
                            onChange={this.handleChange}
                          />
                          <label for="true">True</label>
                          <br />
                          <input
                            type="radio"
                            id="false"
                            name="answer"
                            value="false"
                            checked={this.state.answer === "false"}
                            onChange={this.handleChange}
                          />
                          <label for="false">False</label>
                          <br />
                        </div>
                      )}

                      {/* <div class="time">
                <p id="heading">Enter Time:</p>
                <input
                  type="time"
                  onChange={this.onChangeTime}
                  value={this.state.time}
                />
              </div> */}

                      <button
                        type="submit"
                        class="btn btn-default btn-sm"
                        id="add-button"
                      >
                        Submit Question
                      </button>
                    </form>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div>
                    <h3>Upload questions in bulk</h3>
                    <p>
                      Use the form below to upload a list of questions. Click{" "}
                      <a
                        href="/questions/template"
                        //   href="#"
                        onClick={this.onClickTemplate}
                      >
                        here
                      </a>{" "}
                      for an example template.
                    </p>
                    <form
                      // action="/questions/upload"
                      // method="POST"
                      encType="multipart/form-data"
                      //onSumbit={this.onUpload}
                    >
                      <input
                        type="file"
                        name="file"
                        accept="*.csv"
                        onChange={this.onSelect}
                      />
                      <br />
                      <br />
                      <input
                        type="submit"
                        onClick={this.onUpload}
                        value="Upload Questions"
                      />
                    </form>

                    <br />
                    <h3> Add Question Manually</h3>
                    <form onSubmit={this.onSubmit}>
                      <div class="course">
                        <p id="heading"> Select Course Name</p>
                        <select
                          class="form-control"
                          id="sel1"
                          name="question_course"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="topic">
                        <p id="heading"> Select Topic(s)</p>
                        <select
                          class="form-control"
                          id="sel2"
                          value={this.state.question_topic}
                          // onChange={this.onChangeQuestionTopic}
                          onChange={this.handleChange}
                          name="question_topic"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="level">
                        <p id="heading"> Select Level</p>
                        <select
                          class="form-control"
                          id="sel3"
                          value={this.state.question_level}
                          // onChange={this.onChangeQuestionLevel}
                          onChange={this.handleChange}
                          name="question_level"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Expert</option>
                        </select>
                      </div>
                      <div>
                        <div className="form-group">
                          <p id="heading">Question</p>
                          <textarea
                            name="question"
                            value={this.state.question}
                            onChange={this.handleChange}
                          ></textarea>
                          <br />

                          <label>Option 1:</label>
                          <input
                            type="text"
                            name="option1"
                            className="form-control"
                            value={this.state.option1}
                            onChange={this.handleChange}
                          />
                          <div className="form-group">
                            <input
                              type="checkbox"
                              name="isOption1"
                              // value={this.state.isOption1}
                              onChange={this.handleChange}
                              checked={this.state.isOption1}
                            />
                            <label>Is Option 1 correct?</label>
                          </div>
                          <label>Option 2:</label>
                          <input
                            type="text"
                            name="option2"
                            className="form-control"
                            value={this.state.option2}
                            onChange={this.handleChange}
                          />
                          <div className="form-group">
                            <input
                              type="checkbox"
                              name="isOption2"
                              // value={this.state.isOption1}
                              onChange={this.handleChange}
                              checked={this.state.isOption2}
                            />
                            <label>Is Option 2 correct?</label>
                          </div>
                          <label>Option 3:</label>
                          <input
                            type="text"
                            name="option3"
                            className="form-control"
                            value={this.state.option3}
                            onChange={this.handleChange}
                          />
                          <div className="form-group">
                            <input
                              type="checkbox"
                              name="isOption3"
                              // value={this.state.isOption1}
                              onChange={this.handleChange}
                              checked={this.state.isOption3}
                            />
                            <label>Is Option 3 correct?</label>
                          </div>
                          <label>Option 4:</label>
                          <input
                            type="text"
                            name="option4"
                            className="form-control"
                            value={this.state.option4}
                            onChange={this.handleChange}
                          />
                          <div className="form-group">
                            <input
                              type="checkbox"
                              name="isOption4"
                              // value={this.state.isOption1}
                              onChange={this.handleChange}
                              checked={this.state.isOption4}
                            />
                            <label>Is Option 4 correct?</label>
                          </div>
                          <br />
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-default btn-sm"
                        id="add-button"
                      >
                        Submit Question
                      </button>
                    </form>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div>
                    <h3>Upload questions in bulk</h3>
                    <p>
                      Use the form below to upload a list of questions. Click{" "}
                      <a
                        href="/questions/template"
                        //   href="#"
                        onClick={this.onClickTemplate}
                      >
                        here
                      </a>{" "}
                      for an example template.
                    </p>
                    <form
                      // action="/questions/upload"
                      // method="POST"
                      encType="multipart/form-data"
                      //onSumbit={this.onUpload}
                    >
                      <input
                        type="file"
                        name="file"
                        accept="*.csv"
                        onChange={this.onSelect}
                      />
                      <br />
                      <br />
                      <input
                        type="submit"
                        onClick={this.onUpload}
                        value="Upload Questions"
                      />
                    </form>

                    <br />
                    <h3> Add Question Manually</h3>
                    <form onSubmit={this.onSubmit}>
                      <div class="course">
                        <p id="heading"> Select Course Name</p>
                        <select
                          class="form-control"
                          id="sel1"
                          name="question_course"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="topic">
                        <p id="heading"> Select Topic(s)</p>
                        <select
                          class="form-control"
                          id="sel2"
                          value={this.state.question_topic}
                          // onChange={this.onChangeQuestionTopic}
                          onChange={this.handleChange}
                          name="question_topic"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="level">
                        <p id="heading"> Select Level</p>
                        <select
                          class="form-control"
                          id="sel3"
                          value={this.state.question_level}
                          // onChange={this.onChangeQuestionLevel}
                          onChange={this.handleChange}
                          name="question_level"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Expert</option>
                        </select>
                      </div>

                      <div>
                        <p id="heading">Question</p>
                        <textarea
                          value={this.state.question}
                          name="question"
                          onChange={this.handleChange}
                        ></textarea>

                        <p id="heading">Answer</p>
                        <textarea
                          value={this.state.answer}
                          name="answer"
                          // onChange={this.onChangeAnswer}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-default btn-sm"
                        id="add-button"
                      >
                        Submit Question
                      </button>
                    </form>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div>
                    <h3>Upload questions in bulk</h3>
                    <p>
                      Use the form below to upload a list of questions. Click{" "}
                      <a
                        href="/questions/template"
                        //   href="#"
                        onClick={this.onClickTemplate}
                      >
                        here
                      </a>{" "}
                      for an example template.
                    </p>
                    <form
                      // action="/questions/upload"
                      // method="POST"
                      encType="multipart/form-data"
                      //onSumbit={this.onUpload}
                    >
                      <input
                        type="file"
                        name="file"
                        accept="*.csv"
                        onChange={this.onSelect}
                      />
                      <br />
                      <br />
                      <input
                        type="submit"
                        onClick={this.onUpload}
                        value="Upload Questions"
                      />
                    </form>

                    <br />
                    <h3> Add Question Manually</h3>
                    <form onSubmit={this.onSubmit}>
                      <div class="course">
                        <p id="heading"> Select Course Name</p>
                        <select
                          class="form-control"
                          id="sel1"
                          name="question_course"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="topic">
                        <p id="heading"> Select Topic(s)</p>
                        <select
                          class="form-control"
                          id="sel2"
                          value={this.state.question_topic}
                          // onChange={this.onChangeQuestionTopic}
                          onChange={this.handleChange}
                          name="question_topic"
                        >
                          <option>Javascript</option>
                          <option>HTML</option>
                          <option>CSS</option>
                        </select>
                      </div>

                      <div class="level">
                        <p id="heading"> Select Level</p>
                        <select
                          class="form-control"
                          id="sel3"
                          value={this.state.question_level}
                          // onChange={this.onChangeQuestionLevel}
                          onChange={this.handleChange}
                          name="question_level"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Expert</option>
                        </select>
                      </div>

                      <div>
                        <button className="btn btn-primary">
                          Upload question
                        </button>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-default btn-sm"
                        id="add-button"
                      >
                        Submit Question
                      </button>
                    </form>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
