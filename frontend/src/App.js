import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
//import AddCourse from "./Components/questionBank.component";
// import Academy from "./img/caramelacademy.jpeg";
// import Icon from "./img/icon.png";
import CourseAssessment from "./Components/courseAssessment";
import SkillAssessment from "./Components/skillAssessment";
import QuestionBank from "./Components/questionBank";
import QuestionBank2 from "./Components/questionBank2";
import TestInstructions from "./Components/testInstructions";
import TestLogin from "./Components/testLogin";
import Test from "./Components/test";
import Quiz from "./Components/quiz";
// import Header from "./Components/header.js";
// import Footer from "./Components/footer.js";

function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
      <Router>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/questionBank" component={QuestionBank} />
        <Route path="/dashboard/questionBank2" component={QuestionBank2} />
        <Route
          path="/dashboard/courseAssessment"
          component={CourseAssessment}
        />
        <Route path="/dashboard/skillAssessment" component={SkillAssessment} />
        <Route path="/testLogin" component={TestLogin} />
        <Route path="/testInstructions" component={TestInstructions} />
        <Route path="/test/:id" component={Test} />
        <Route path="/quiz" component={Quiz} />
      </Router>
    </div>
  );
}

export default App;
