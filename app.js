import express from "express";
import { exec } from "child_process";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/execute-command", (req, res) => {
  const command = req.body.command; // Get command from request body

  // Validate and sanitize the command before executing
  // IMPORTANT: Implement proper validation and security checks here
  const allowedCommands = [
    "ps -ef | grep Pal",
    "nohup ~/.steam/SteamApps/common/PalServer/PalServer.sh &",
    "killall PalServer-Linux-Test",
  ];
  if (!allowedCommands.includes(command)) {
    return res.status(400).send("Invalid command");
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
