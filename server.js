const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE = 'http://playwithme.pw';

app.use(cors());

app.use('/live/:username/:password/:streamId', async (req, res) => {
  const { username, password, streamId } = req.params;
  const format = req.query.format || 'm3u8';

  const proxiedUrl = `${API_BASE}/live/${username}/${password}/${streamId}.${format}`;

  try {
    const response = await fetch(proxiedUrl);
    if (!response.ok) throw new Error('Fetch failed');
    res.set('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Failed to proxy stream');
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
