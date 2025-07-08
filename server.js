const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());

app.use((req, res) => {
  const targetUrl = `http://playwithme.pw${req.originalUrl}`;

  const headers = {
    "User-Agent": "Lavf/58.45.100", // Simulates ffmpeg or Android HLS clients
    "Origin": "http://playwithme.pw",
    "Referer": "http://playwithme.pw",
    "Host": "playwithme.pw"
  };

  req.pipe(
    request({
      url: targetUrl,
      headers: headers
    }).on("response", (proxyRes) => {
      // Fix content-type for TS or M3U8
      const contentType = proxyRes.headers["content-type"];
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
    })
  ).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
