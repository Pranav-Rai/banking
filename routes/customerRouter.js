const router = require('express').Router()
const customerCtrl = require('../controllers/customerCtrl')


router.get('/' , customerCtrl.getCustomer)
router.post('/' , customerCtrl.addCustomer)
router.delete('/:id' , customerCtrl.delCustomer)


module.exports = router