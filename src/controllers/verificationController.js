const verificationService = require('../services/verificationService')
const db = require('../../models/index');
const {
    Verification,
    User_Room,
    Room
} = db;

class VerificationController {
    async createVer(req, res) {
        try {
            const { joinCode } = req.body
            const user = req.session.user

            const cl = await Room.findOne({ where: { joinCode } })
            if (!cl)
                return res.status(404).json({ error: true, message: 'Room not found' })
            if (cl.joinCode !== joinCode)
                return res.status(400).json({ error: true, message: 'Code is wrong' })

            const newVerification = verificationService.createVer(cl, user)
                
            return res.status(200).json(newVerification);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e })
        }
    }

    async getVerList(req, res) {
        try {
            const userId = req.session.user.id
            const id = req.params.id

            const ownedRoom = await User_Room.findOne({
                where: {
                    userId,
                    roomId: id,
                    isRoomOwner: true
                }
            })

            if(!ownedRoom)
                return res.status(404).json({ error: true, message: 'You have not created the room' })

            let response = await verificationService.getVerList(id)

            return res.status(200).json(response);
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async changeVerStatus(req, res) {
        try {
            const id = req.session.user.id
            const roomId = req.params.id
            const userId = req.params.userId
            const { status } = req.body

            const ownedRoom = await User_Room.findOne({
                where: {
                    userId: id,
                    roomId,
                    isRoomOwner: true
                }
            })

            if(!ownedRoom)
                return res.status(400).json({ error: true, message: 'You have not created the room' })

            const verification = await Verification.findOne({
                where: {
                    userId,
                    roomId, 
                }
            })

            if(!verification)
                return res.status(404).json({ error: true, message: 'Verification not found' })

            let response = await verificationService.changeVerStatus(verification, status)

            return res.status(200).json(response);
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new VerificationController()