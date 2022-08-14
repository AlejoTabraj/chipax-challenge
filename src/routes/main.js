const { Router } = require('express')
const service = require('../services/main')
const router = Router()

router.get('/', async (req, res) => {
    const response = await service.getMainResult()
    res.send([response])
})

module.exports = router