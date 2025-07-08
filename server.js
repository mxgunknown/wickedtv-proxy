const express = require("express");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  const targetUrl = `http://playwithme.pw${req.url}`;
  const extension = req.url.split(".").pop();

  if (extension === "m3u8") {
    // Proxy and rewrite .m3u8 playlist content
    request(targetUrl, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        res.status(500).send("Failed to fetch playlist");
        return;
      }

      const rewritten = body.replace(/(\d+\.ts)/g, `${req.baseUrl}/${req.url.split("/").slice(-1)[0].replace(".m3u8", "")}_$1`);
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(rewritten);
    });
  } else {
    // Proxy .ts segments or other resources
    request
      .get(targetUrl)
      .on("error", () => res.status(500).send("Stream error"))
      .pipe(res);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
