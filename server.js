const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

app.use((req, res) => {
  const targetUrl = `http://playwithme.pw${req.originalUrl}`;

  const headers = {
    ...req.headers,
    "host": "playwithme.pw",
    "origin": "http://playwithme.pw",
    "referer": "http://playwithme.pw",
    "user-agent": "Lavf/58.45.100"
  };

  request({
    url: targetUrl,
    headers,
  })
    .on("response", proxyRes => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      if (proxyRes.headers["content-type"]) {
        res.setHeader("Content-Type", proxyRes.headers["content-type"]);
      }
    })
    .on("error", err => {
      console.error("Proxy request error:", err);
      res.status(500).send("Proxy error");
    })
    .pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
