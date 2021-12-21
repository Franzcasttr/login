const express = require('express')
const router = express.Router()
const {register, login, register_form, login_form, logout} = require('../controllers/register')

router.route('/api/v1/register').post(register)
router.route('/api/v1/login').post(login)
router.route('/register').get(register_form)
router.route('/login').get(login_form)
router.route('/logout').get(logout)



module.exports = router