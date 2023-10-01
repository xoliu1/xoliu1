const getBilibiliInfo = require('../crawer/bilibili');
const renderBilibiliCard = require('../render/bilibili');
const { cacheTime, cache } = require('../common/cache');
const { processData } = require('../common/utils');

module.exports = async (req, res) => {
  const { id, theme, lang } = req.query;
  let key = 'b' + id;
  let data = cache.get(key);
  if (!data) {
    data = await getBilibiliInfo(id);
    cache.set(key, data);
  }
  data.theme = theme;
  processData(data);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', `public, max-age=${cacheTime}`);
  return res.send(renderBilibiliCard(data, lang));
};
