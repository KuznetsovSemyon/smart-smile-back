const classService = require("../services/classService");
const roleService = require("../services/roleService");
const verificationService = require('../services/verificationService');
const db = require('../../models/index');
const {
    Class,
    User,
    User_Class
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

    async getClassInfo(req, res) {
        try {
            const id = req.params.id
            const user = req.session.user

            const cl = await Class.findByPk(id)

            if (!cl)
                return res.status(404).json({ error: true, message: 'Class not found' })
            
            let response = {
                label: cl.label,
                classMembers: await classService.getClassMembers(id)
            }

            if (response.classMembers.classOwner.id != user.id) {
                const verStatus = await verificationService.chackVerStatus(user.id, id)
                if (verStatus.status != 'approved')
                    return res.status(400).json({ error: true, message: verStatus.message })
            }

            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async getClassList(req, res) {
        try {
            const id = req.session.user.id

            const classList = await classService.getClassList(id)

            let response = {}
            response.owner = classList.owner
            response.member = []

            for (const cl of classList.member) {
                const verStatus = await verificationService.chackVerStatus(id, cl.id)
                if (verStatus.status == 'approved')
                    response.member.push(cl)
            }

            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async leaveClass(req, res) {
        try {
            const id = req.params.id
            const userId = req.session.user.id

            const cl = await User_Class.findOne({
                where: {
                    classId: id,
                    userId
                }
            })

            if (!cl)
                return res.status(404).json({ error: true, message: 'You are not a member of the class'})
            if (cl.isClassOwner == true)
                return res.status(400).json({ error: true, message: 'You can not leave the classes you created'})

            const response = await classService.leaveClass(id, userId)

            return res.status(200).json({ message: response });
        } catch (e) {
           return res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new ClassController()