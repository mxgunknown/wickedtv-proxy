const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  const url = `http://playwithme.pw${req.url}`;
  const headers = {
    'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
    'Referer': 'http://playwithme.pw/',
    'Origin': 'http://playwithme.pw',
  };

  req.pipe(
    request({ url, headers })
      .on('response', response => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', response.headers['content-type']);
      })
  ).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
