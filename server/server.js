const express = require("express");
const cors = require("cors");

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
          `[${requestDate.toUTCString()}] Sending ${channel} notification to ${
            user.name
          }(${
            channel === "Email" ? user.email : user.phoneNumber
          }) about ${category} with message: ${message}`
        );
      });
    } else {
      console.log(
        `[${requestDate.toUTCString()}] ${
          user.name
        } is not subscribed to ${category}`
      );
    }

    res.sendStatus(200);
  });
});

app.listen(8000, () => console.log("Server running on port 8000"));
