const express = require("express");
const request = require("request");
const app = express();

app.use((req, res) => {
  const targetUrl = `http://playwithme.pw${req.url}`;

  req.pipe(
    request({
      url: targetUrl,
      headers: {
        "User-Agent": req.headers["user-agent"] || "Mozilla/5.0",
        "Referer": "http://playwithme.pw", // spoof expected origin
        "Origin": "http://playwithme.pw",  // some servers require this
        "Host": "playwithme.pw"
      }
    })
  ).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
