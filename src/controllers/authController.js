const loginService =require('../services/loginService')
const db = require('../../models/index');
const {
    User, Role,
} = db;

class AuthController {

    async authMe(req, res) {
        try {
            if (!req.session || !req.session.user) {
                return res.status(401).json({ error: true, message: "You must be logged in" });
            }

            const { id } = req.session.user;
            const user = await User.findByPk(id, {
                include: [{
                    model: Role,
                    required: true,
                }]
            });

            res.status(200).json(await user.getAllInfo());
        }
        catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
    async login(req, res) {
        try {
            if (req.session && req.session.user) return res.status(200).json(req.session.user);

            const { email, password } = req.body

            let user = await User.findOne({ where: { email }, include: [{ model: Role, required: true }] })
            if(!user)
                return res.status(404).json({ error: true, message: 'User not found' });

            if(!user.validPassword(password)) {
                return res.status(400).json({ error: true, message: 'Incorrect password' });
            }

            user = await user.getAllInfo()
            req.session.user = user;
            req.session.actions = [];
            req.session.time = process.env.SESSION_TIME;
            req.session.createdAt = +(new Date());

            res.status(200).json(req.session.user);
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy((e) => {
                if (e) {
                    return res.status(400).json({ error: true, message: e });
                }
                else {
                    res.status(200).json({ message: 'success' });
                }
            });
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new AuthController()