const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const questionRoutes = express.Router();
const skilltestRoutes = express.Router();
const fileUpload = require("express-fileupload");
var csv = require("fast-csv");
var json2csv = require("json2csv").parse;
const PORT = 4000;

//let Course = require("./course_model");
let Question = require("./question_model");

app.use(cors());
app.use(bodyParser.json());

app.use(fileUpload());

mongoose.connect(
  "mongodb+srv://caramel_it:Admin123%23@projectz-gjuxk.mongodb.net/Caramel_Model?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

//app.use(bodyParser.urlencoded({ extended: false }));
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB connection established successfully");
});

questionRoutes.route("/upload").get(function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

questionRoutes.route("/upload").post(function (req, res) {
  console.log("recieved");
  console.log(req);
  if (!req.files) return res.status(400).send("No files were uploaded.");

  var questionFile = req.files.file;
  var questions = [];

  csv
    .parseString(questionFile.data.toString(), {
      headers: true,
      ignoreEmpty: true,
    })
    .on("data", function (data) {
      data["_id"] = new mongoose.Types.ObjectId();
      questions.push(data);
    })
    .on("end", function () {
      for (let i = 0; i < questions.length; i++) {
        questions[i].isOption1 = questions[i].isOption1.toLowerCase();
        questions[i].isOption2 = questions[i].isOption2.toLowerCase();
        questions[i].isOption3 = questions[i].isOption3.toLowerCase();
        questions[i].isOption4 = questions[i].isOption4.toLowerCase();
      }
      // for (let i = 0; i < questions.length; i++) {
      //   console.log(questions[i].isOption1);
      //   console.log(questions[i].isOption2);
      //   console.log(questions[i].isOption3);
      //   console.log(questions[i].isOption4);
      // }
      Question.create(questions, function (err, documents) {
        if (err) throw err;
      });
      res.send(
        questions.length + " questions have been successfully uploaded."
      );
    });
});

questionRoutes.route("/template").get(function (req, res) {
  var fields = [
    "question_course",
    "question_topic",
    "question_level",
    "question_type",
    "question",
    "answer",
    "option1",
    "option2",
    "option3",
    "option4",
    "isOption1",
    "isOption2",
    "isOption3",
    "isOption4",
    "time",
  ];
  var csv = json2csv({ data: "", fields: fields });
  res.set("Content-Disposition", "attachment;filename=questions.csv");
  res.set("Content-Type", "application/octet-stream");

  res.send(csv);
});

questionRoutes.route("/").get(function (req, res) {
  Question.find(function (err, questions) {
    if (err) {
      console.log(err);
    } else {
      res.json(questions);
      console.log(typeof questions);
    }
  });
});

questionRoutes.route("/:id").get(function (req, res) {
  console.log(typeof req.params.id);
  let id = req.params.id;
  console.log(Question);
  Question.findById(id, function (err, question) {
    res.json(question);
  });
});

questionRoutes.route("/create").post(function (req, res) {
  console.log(req.body);
  let question = new Question(req.body);
  question
    .save()
    .then((question) => {
      res.status(200).json({ question: "question added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new question failed");
      console.log(err);
    });
});

// courseRoutes.route("/update/:id").post(function (req, res) {
//   Course.findById(req.params.id, function (err, course) {
//     if (!course) {
//       res.status(404).send("Course not found");
//     } else {
//       course.course_name = req.body.course_name;
//       course.users_enrolled = req.body.users_enrolled;
//     }

//     course
//       .save()
//       .then((course) => {
//         res.json("Course Updated");
//       })
//       .catch((err) => {
//         res.status(400).send("Update not possisble");
//       });
//   });
// });

questionRoutes.route("/delete/:id").delete(function (req, res) {
  Question.findByIdAndDelete(req.params.id, function (err, question) {
    if (!question) {
      res.status(404).send("Question not found");
    } else {
      res.json("Question Deleted");
    }
  });
});

skilltestRoutes.route("/generate").post(function (req, res) {
  console.log(req.body);
  Question.find(function (err, questions) {
    if (err) {
      console.log(err);
    } else {
      //console.log(questions);
      console.log(typeof questions);
      var questionList = JSON.stringify(questions);
      //myJSON = JSON.parse(myJSON);
      //console.log(myJSON);
      //console.log(typeof myJSON);
      var spawn = require("child_process").spawn;

      var python = spawn("python", [
        "./SkillBased.py",
        req.body.userid,
        req.body.total_skills,
        req.body.skill_name1,
        req.body.skill_name2,
        req.body.skill_name3,
        req.body.skill_name4,
        req.body.skill_name5,
        req.body.skill_prof,
        req.body.no_of_questions,
        req.body.category,
        questionList,
      ]);
    }
    python.stdout.on("data", function (data) {
      mystr = data.toString();

      myjson = JSON.parse(mystr);
      idList = [];
      var questionList = {};
      console.log(typeof idList);
      for (var i = 0; i < req.body.no_of_questions; i++) {
        //console.log(myjson.Data._id[i]);
        idList.push(myjson.Data._id[i]);
        Question.findById(myjson.Data._id[i], function (err, question) {
          //res.json(question);
          console.log(question);
          questionList[i] = question;
        });
      }
      res.json(idList);
    });
  });

  // python.stdout.on("data", function (data) {
  //   mystr = data.toString();

  //   myjson = JSON.parse(mystr);
  //   console.log(myjson);
  //   res.json(myjson);
  // });
  // python.stdout.on("data", function (data) {
  //   //console.log(typeof data);
  //   res.send(data.toString());
  //   // res.json(data);
  // });
});

app.use("/questions", questionRoutes);
app.use("/skilltest", skilltestRoutes);
app.listen(PORT, function () {
  console.log("Server is runnung on Port:" + PORT);
});
