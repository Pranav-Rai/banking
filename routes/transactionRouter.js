const router = require('express').Router()
const transactionCtrl = require('../controllers/transactionCtrl')

router.get('/' , transactionCtrl.getTransaction)
router.post('/' , transactionCtrl.doTransaction)







module.exports = router