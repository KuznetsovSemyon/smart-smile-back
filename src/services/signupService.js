const db = require('../../models/index');
const crypto = require('crypto');
const {
    User,
    Role
} = db;

const genPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('hex');
    return {
        salt,
        hash: crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex'),
    };
}

class SignupService {
    async signup(name, surname, birthday, sex, country, city, roleId,
    educationInstitution, email, password) {
        try{

            birthday = new Date(birthday);

            const { salt, hash } = genPassword(password)

            const newUser = {
                name,
                surname,
                email,
                roleId,
                birthday,
                sex,
                country,
                city,
                educationInstitution,
                salt,
                hash
            };
            return await User.create(newUser)
        } catch (e) {
            return new Error(e)
        }
    }
}

module.exports = new SignupService()