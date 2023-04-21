const classService = require("../services/classService");
const db = require('../../models/index');
const {
    Class
} = db;
class ClassController {
    async createClass(req, res) {
        try {
            const { label } = req.body
            const user = req.session.user

            const newClass = await classService.createClass(label, user)

            return res.status(200).json(newClass);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e })
        }
    }
    
    async joinClass(req, res) {
        try {
            const { joinLink } = req.body
            const user = req.session.user

            const cl = await Class.findOne({ where: { joinLink } })
            if (!cl)
                res.status(404).json({ error: true, message: 'Class not found' })
            if (cl.joinLink !== joinLink)
                res.status(400).json({ error: true, message: 'Code is wrong' })

            const newVerification = classService.joinClass(cl, user)
                
            return res.status(200).json(newVerification);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e })
        }
    }
}

module.exports = new ClassController()