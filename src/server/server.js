const express = require("express");
const path = require("path");
const cors = require("cors");
const wsServer = require("./websocket");
const userApi = require("./routes/userApi");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userApi);

const discoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(
      `Something went wrong loading ${res.url}: ${res.statusText}`
    );
  }
  return await res.json();
}

//Login authorization
app.get("/api/profile", async (req, res) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.send(401);
  }

  const { userinfo_endpoint } = await fetchJSON(discoveryURL);
  const userinfo = await fetchJSON(userinfo_endpoint, {
    headers: {
      Authorization: authorization,
    },
  });
  console.log(userinfo);

  return res.json(userinfo);
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  return next();
});

const server = app.listen(3000, () => {
  console.log("Started on http://localhost:3000");
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      // This will pass control to `wsServer.on("connection")`
      wsServer.emit("connection", socket, req);
    });
  });
});
