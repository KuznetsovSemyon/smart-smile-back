const router = require('express').Router()
const { imageUpload } = require('../middlewares/multerSetup');
const signupValid = require('../middlewares/signupValid');
const signupController = require('../controllers/signupController')
const authController = require('../controllers/authController')
const classController = require('../controllers/classController')
const gameController = require('../controllers/gameController')

router.post('/signup', signupValid.signup, signupController.signup)

router.get('/auth/me', authController.authMe)
router.post('/login', authController.login)
router.delete('/logout', authController.logout)

router.post('/class/create', classController.createClass)
router.post('/class/join', classController.joinClass)
//router.patch('/class/:id/update', classController.updateClass)
//router.patch('/class/:id/student/:id/delete', classController.deleteStudent)
//router.delete('/class/:id/delete', classController.deleteClass)

router.post('/game/create', imageUpload, gameController.createGame)
router.post('/game/:id/add/favorite', gameController.addGameToFavorite)
router.get('/game', gameController.getGameList)
router.patch('/game/update/:id', imageUpload, gameController.updateGame)
router.delete('/game/delete/:id', gameController.deleteGame)
router.delete('/game/:id/remove/favorite', gameController.removeGameFromFavorite)

//router.post('/category/create', imageUpload, catController.createCat)
//router.get('/category', catController.getCatList)
//router.patch('/category/update/:id', imageUpload, catController.updateCat)
//router.delete('/category/delete/:id', imageUpload, catController.deleteCat)


module.exports = router