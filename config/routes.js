const router = require('express').Router()
router.get('/', (req, res) => res.json({ message: 'Welcome to the Events API' }))
module.exports = router
