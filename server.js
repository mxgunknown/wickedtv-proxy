const express = require("express");
const request = require("request");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("*", (req, res) => {
  const targetUrl = "http://playwithme.pw" + req.originalUrl;

  req.pipe(
    request({
      url: targetUrl,
      headers: {
        "User-Agent": req.headers["user-agent"] || "Mozilla/5.0",
        "Host": "playwithme.pw",
      }
    }).on("response", (response) => {
      res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
    }).on("error", (err) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy failed.");
    })
  ).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
