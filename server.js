const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/", (req, res) => {
  const targetUrl = "http://playwithme.pw" + req.originalUrl;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Referer": "http://playwithme.pw/",
    "Origin": "http://playwithme.pw",
    "Host": "playwithme.pw",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
  };

  req.pipe(
    request({
      url: targetUrl,
      method: req.method,
      headers,
    }).on("response", function (response) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    })
  ).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
