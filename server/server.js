const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(
  path.join(__dirname, "notifications.log"),
  { flags: "a" }
);

console.log = function (message) {
  logStream.write(message + "\n");
};

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  {
    ID: 1,
    name: "John",
    email: "john@email.com",
    phoneNumber: "+1234567890",
    subscribed: ["Sports", "Finance", "Movies"],
    channels: ["SMS", "Email", "Push Notification"],
  },
];

app.post("/api/notification", (req, res) => {
  const requestDate = new Date();
  const { category, message } = req.body;

  users.forEach((user) => {
    if (user.subscribed.includes(category)) {
      user.channels.forEach((channel) => {
        console.log(
          JSON.stringify({
            userID: user.ID,
            category: category,
            message: message,
            channel: channel,
            timestamp: requestDate,
          })
        );
      });
    }

    res.sendStatus(200);
  });
});

app.listen(8000, () => console.log("Server running on port 8000"));
