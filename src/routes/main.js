const { Router } = require('express');
const service = require('../services/main');
const router = Router();

router.get('/', async (req, res) => {
  const charResponse = await service.getMainResult();
  const locationResponse = await service.getCharactersLocationPerEpisode();
  res.send([charResponse, locationResponse]);
});

module.exports = router;
