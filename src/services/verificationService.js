const db = require('../../models/index');
const {
    Verification,
    User_Class
} = db;

class VerificationService {
    async chackVerStatus(userId, classId) {
        try {

            const verification = await Verification.findOne({ 
                where: { userId, classId },
                order: [['createdAt', 'DESC']]
            })

            let response = {}

            if (!verification) {
                response.status = 'not found'
                response.message = 'You have not sent a verification request'
                return response
            }

            if (verification.status == 'approved') {
                response.status = 'approved'
                response.message = 'Verification completed successfully.'
                return response
            }

            if (verification.status == 'new') {
                response.status = 'new'
                response.message = 'Your application is still in progress.'
                return response
            }

            if (verification.status == 'declined') {
                response.status = 'declined'
                response.message = 'Your application has been declined.'
                return response
            }
        } catch(e) {
            throw new Error(e)
        }
    }

    async createVer(cl, user) {
        try {
            const newVerification = await Verification.create({ userId: cl.id, userId: user.id })

            return newVerification
        } catch (e) {
            throw new Error(e)
        }
    }

    async getVerList(classId) {
        try { 
            let response = []

            const verList = await Verification.findAll({
                where: {
                    classId,
                    status: 'new'
                }
            })

            response.push({
                classId,
                verifications: verList
            })


            return response
        } catch(e) {
            throw new Error(e)
        }
    }

    async changeVerStatus(ver, status) {
        try {
            ver.status = status
            await ver.save()

            if (status == 'approved') {
                const newUser_Class = {
                    userId: ver.userId,
                    classId: ver.classId,
                    isClassOwner: false
                }
    
                await User_Class.create(newUser_Class)
            }
            
            return ver
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = new VerificationService()