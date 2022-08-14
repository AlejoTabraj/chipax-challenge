const { Router } = require('express');
const service = require('../services/main');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const charResponse = await service.getCharCounts();
    const locationResponse = await service.getCharactersLocationPerEpisode();
    res.send([charResponse, locationResponse]);
  } catch (error) {
    console.log({ error: error.message || error })
  }
});

module.exports = router;
