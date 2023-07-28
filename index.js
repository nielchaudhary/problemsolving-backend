const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();

const port = 3000;
app.use(bodyParser.json());

const questions = [
  {
    title: "2 sum problem",
    description:
      "given an array, return the largest number from the array.",
    testcases: [
      {
        input: "[1,3,6,7,8]",
        output: "8",
      },
    ],
  },
];

const users = [];

const submission = [];

app.post("/signup", (req, res) => {
  const userData = req.body;
  const { email, password } = userData;
  //to check if the user is already present in the existing array
  const existingUser = users.find((user) => user.email == email);
  if (existingUser) {
    console.log(email, "email already in use");
    return res.status(409).send("Email is already in use");
  }
  users.push(userData);
  console.log("New user has been added: ", userData);

  res.send("User registered successfully!");

});

app.post("/login", (req, res) => {
  const userData = req.body;
  const { email, password } = userData;
  const user = users.find((user) => user.email == email);

  if (!user) {
    res.status(409).send("Invalid user");
  }
  if (password == user.password) {
    console.log("User logged in: ", user);
    res.status(200);
  } else {
    return res.status(401).send("Invalid credentials");
  }
  console.log("Login successful using email ID", email);
  res.send("Login page");
  
});

app.get("/questions", (req, res) => {
  console.log("The questions are as follows : ")
  res.json(questions)
  
});

app.post("/submissions", (req, res) => {
  const submissionData = req.body;

  submission.push(submissionData);  //store the submissions in the submission array above.
  console.log("New submission has been added!");
  res.status(200).send("Submission successful!");
  
});

app.get("/submissions", (req, res) => {
  console.log("HURRAY! Submission received, check your console!");

  res.send(submission);

  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
