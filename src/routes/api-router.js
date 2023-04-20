const router = require('express').Router()
const signupValid = require('../middlewares/signupValid');
const signupController = require('../controllers/signupController')
const authController = require('../controllers/authController')
const classController = require('../controllers/classController')

router.post('/signup', signupValid.signup, signupController.signup)

router.get('/auth/me', authController.authMe)
router.post('/login', authController.login)
router.delete('/logout', authController.logout)

router.post('/class/create', classController.createClass)

module.exports = router