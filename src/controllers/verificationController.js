const verificationService = require('../services/verificationService')
const db = require('../../models/index');
const {
    Verification,
    User_Class,
    Class
} = db;

class VerificationController {
    async createVer(req, res) {
        try {
            const { joinCode } = req.body
            const user = req.session.user

            const cl = await Class.findOne({ where: { joinCode } })
            if (!cl)
                return res.status(404).json({ error: true, message: 'Class not found' })
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

            const ownedClass = await User_Class.findOne({
                where: {
                    userId,
                    classId: id,
                    isClassOwner: true
                }
            })

            if(!ownedClass)
                return res.status(404).json({ error: true, message: 'You have not created the class' })

            let response = await verificationService.getVerList(id)

            return res.status(200).json(response);
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async changeVerStatus(req, res) {
        try {
            const id = req.session.user.id
            const classId = req.params.id
            const userId = req.params.userId
            const { status } = req.body

            const ownedClass = await User_Class.findOne({
                where: {
                    userId: id,
                    classId,
                    isClassOwner: true
                }
            })

            if(!ownedClass)
                return res.status(400).json({ error: true, message: 'You have not created the class' })

            const verification = await Verification.findOne({
                where: {
                    userId,
                    classId, 
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