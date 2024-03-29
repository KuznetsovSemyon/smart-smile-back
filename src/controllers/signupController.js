const signupService =require('../services/signupService')
const db = require('../../models/index');
const {
    User, Role,
} = db;

class SignupController {
    async signup(req, res) {
        try {
            let { name, surname, birthday, gender, country, city, role,
                educationInstitution, studentClass, email, password,
                confirmPassword, isTermsAccepted } = req.body;

            const userEmail = await User.findOne({ where: { email } })
            if (userEmail) return res.status(400).json({ error: true, message: "Email is already taken by another user" });

            const userRole = await Role.findOne({ where: { label: role } })
            if (!userRole) return res.status(400).json({ error: true, message: "Role not found" });

            if (password !== confirmPassword)
                return res.status(400).json({ error: true, message: "Passwords don' match" });

            if (isTermsAccepted != true) return res.status(400).json({ error: true, message: "Terms not accepted" });

            const user = await signupService.signup(name, surname, birthday, gender, country, city, userRole.id,
                educationInstitution, studentClass, email, password)

            return res.status(200).json(user.getAllInfo());
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new SignupController()