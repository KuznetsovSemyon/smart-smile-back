const db = require('../../models/index');
const {
    Class,
    User_Class
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
            let joinLink = genCode(10)
            let classJoinLink = await Class.findOne({ where: { joinLink }})

            while (classJoinLink) {
                joinLink = genCode(10)
                classJoinLink = await Class.findOne({ where: { joinLink }})
            }

            const newClassConfig = {
                label,
                educationInstitution: user.educationInstitution,
                city: user.city,
                country: user.country,
                classOwner: user.id,
                joinLink
            }

            const newClass = await Class.create(newClassConfig)

            const newUser_Class = {
                userId: user.id,
                classId: newClass.id
            }

            await User_Class.create(newUser_Class)

            return newClass
        } catch (e) {
            return new Error(e)
        }
    }

    async joinClass() {
        try {

        } catch (e) {
            return new Error(e)
        }
    }
}

module.exports = new ClassService()