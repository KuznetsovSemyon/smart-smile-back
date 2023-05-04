const router = require('express').Router()
const { imageUpload } = require('../middlewares/multerSetup');
const signupValid = require('../middlewares/signupValid');
const signupController = require('../controllers/signupController')
const authController = require('../controllers/authController')
const roomController = require('../controllers/roomController')
const gameController = require('../controllers/gameController')
const verificationController = require('../controllers/verificationController')

router.post('/signup', signupValid.signup, signupController.signup)

router.get('/auth/me', authController.authMe)
router.post('/login', authController.login)
router.delete('/logout', authController.logout)

router.post('/room/create', roomController.createRoom)
router.post('/room/join', verificationController.createVer)
router.get('/room', roomController.getRoomList)
router.get('/room/:id', roomController.getRoomInfo)
router.get('/room/:id/applications', verificationController.getVerList)
router.patch('/room/:id/applications/:userId', verificationController.changeVerStatus)
router.delete('/room/leave/:id', roomController.leaveRoom)

//router.patch('/room/:id/update', roomController.updateRoom)
//router.patch('/room/:id/student/:id/delete', roomController.deleteStudent)
//router.delete('/room/:id/delete', roomController.deleteRoom)

router.get('/room/:id/verifications', verificationController.getVerList)
router.patch('room/:roomId/verifications/:userId', verificationController.changeVerStatus)


router.post('/game/create', imageUpload, gameController.createGame)
router.post('/game/:id/add/favorite', gameController.addGameToFavorite)
router.get('/game', gameController.getGameList)
router.get('/game/:id', gameController.getGame)
router.patch('/game/update/:id', imageUpload, gameController.updateGame)
router.delete('/game/delete/:id', gameController.deleteGame)
router.delete('/game/:id/remove/favorite', gameController.removeGameFromFavorite)

//router.post('/category/create', imageUpload, catController.createCat)
//router.get('/category', catController.getCatList)
//router.patch('/category/update/:id', imageUpload, catController.updateCat)
//router.delete('/category/delete/:id', imageUpload, catController.deleteCat)


module.exports = router