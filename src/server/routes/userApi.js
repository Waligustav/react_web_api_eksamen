const express = require("express");
const userApi = express.Router();

const users = [
  {
    id: 1,
    firstName: "Henry",
    lastName: "Ford",
    email: "1901h@gmail.com",
  },
  {
    id: 2,
    firstName: "Vengt",
    lastName: "Othbi",
    email: "1950v@gmail.com",
  },
];

userApi.get("", (req, res) => {
  console.log(users);
  res.json(users);
});

userApi.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((b) => b.id === id);
  res.json(user);
});

userApi.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((b) => b.id === id);
  const { firstName, lastName, email } = req.body;
  users[userIndex] = { firstName, lastName, email, id };
  res.status(200).end();
});

userApi.post("", (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(req.body);
  users.push({ firstName, lastName, email, id: users.length + 1 });
  res.status(201).json({ firstName, lastName, email });
});

module.exports = userApi;
