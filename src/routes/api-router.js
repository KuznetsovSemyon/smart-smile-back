const router = require('express').Router()
const signupValid = require('../middlewares/signupValid');
const signupController = require('../controllers/signupController')
const authController = require('../controllers/authController')

router.post('/signup', signupValid.signup, signupController.signup)

router.get('/auth/me', authController.authMe)
router.post('/login', authController.login)
router.delete('/logout', authController.logout)

module.exports = router