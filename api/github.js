const getGitHubInfo = require('../crawer/github');
const renderGitHubCard = require('../render/github');
const { cacheTime, cache } = require('../common/cache');
const { processData } = require('../common/utils');

module.exports = async (req, res) => {
  const { username, theme, lang } = req.query;
  let key = 'g' + username;
  let data = cache.get(key);
  if (!data) {
    data = await getGitHubInfo(username);
    cache.set(key, data);
  }
  data.theme = theme;
  processData(data);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', `public, max-age=${cacheTime}`);
  return res.send(renderGitHubCard(data, lang));
};
