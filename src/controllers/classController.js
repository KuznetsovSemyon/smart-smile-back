const classService = require("../services/classService");
const db = require('../../models/index');
const {
    Class
} = db;
class ClassController {
    async createClass(req, res) {
        try {
            const { label } = req.body;
            const user = req.session.user

            const newClass = await classService.createClass(label, user)

            return res.status(200).json(newClass);
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }

    }
    
    async joinClass(req, res) {
        try {
            
        } catch (e) {
            res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new ClassController()