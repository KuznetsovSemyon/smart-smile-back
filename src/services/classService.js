const db = require('../../models/index');
const {
    Class,
    User_Class,
    Verification,
    User
} = db;

const genCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class ClassService {
    async createClass(label, user) {
        try {
            let joinCode = genCode(10)
            let classJoinCode = await Class.findOne({ where: { joinCode }})

            while (classJoinCode) {
                joinCode = genCode(10)
                classjoinCode = await Class.findOne({ where: { joinCode }})
            }

            const newClassConfig = {
                label,
                educationInstitution: user.educationInstitution,
                city: user.city,
                country: user.country,
                joinCode
            }

            const newClass = await Class.create(newClassConfig)

            const newUser_Class = {
                userId: user.id,
                classId: newClass.id,
                isClassOwner: true
            }

            await User_Class.create(newUser_Class)

            return newClass
        } catch (e) {
            return new Error(e)
        }
    }

    async getClassMembers(classId) {
        try {
            let response = {}
            response.teachers = []
            response.students = []

            const allClassMembers = await User_Class.findAll({
                where: { classId },
                include: [{
                    model: User,
                }] 
            })

            allClassMembers.forEach((usCl) => {
                if(usCl.User.roleId == 3)
                    response.students.push(usCl.User.getAllInfo())
                else if(usCl.User.roleId == 2) {
                    response.teachers.push(usCl.User.getAllInfo())
                    if(usCl.isClassOwner == true)
                        response.classOwner = usCl.User.getAllInfo()
                }
            })

            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async countClassMembers(classId) {
        try {
            const membersCount = await User_Class.count({
                where: {
                    classId
                }
            })
            return membersCount
        } catch(e) {
            throw new Error(e)
        }
    }

    async getClassList(userId) {
        try {
            let classList = await User_Class.findAll({
                where: { userId },
                include: [{
                    model: Class,
                }] 
            })

            let response = {}
            response.owner = []
            response.member = []

            for (const usCl of classList) {
                if(usCl.isClassOwner == true) {
                    response.owner.push({
                        id: usCl.id,
                        label: usCl.label,
                        membersCount: await this.countClassMembers(usCl.classId),
                        createdAt: usCl.createdAt
                    })
                } else {
                    response.member.push({
                        id: usCl.id,
                        label: usCl.label,
                        membersCount: await this.countClassMembers(usCl.classId),
                        createdAt: usCl.createdAt
                    })
                }
            }

            return response
        } catch(e) {
            throw new Error(e)
        }
    }

    async leaveClass(classId, userId) {
        try {
            await User_Class.destroy({
                where: {
                    classId,
                    userId
                }
            })
            
            return 'You have leaved the class'
        } catch {
            throw new Error(e)
        }
    }
}

module.exports = new ClassService()