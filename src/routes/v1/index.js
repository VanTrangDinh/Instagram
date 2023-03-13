const express = require('express')
const router = express.Router()

//GET v1/status

router.get('/status', (req, res) => res.send('OK'))



router.use('/user', require('./user.route'))
router.use('/auth', require('./auth.route.js'))


module.exports = router