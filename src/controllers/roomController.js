const roomService = require("../services/roomService");
const roleService = require("../services/roleService");
const verificationService = require('../services/verificationService');
const db = require('../../models/index');
const {
    Room,
    User,
    User_Room
} = db;
class RoomController {
    async createRoom(req, res) {
        try {
            const { label } = req.body
            const user = req.session.user

            const newRoom = await roomService.createRoom(label, user)

            return res.status(200).json(newRoom);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e })
        }
    }

    async getRoomInfo(req, res) {
        try {
            const id = req.params.id
            const user = req.session.user

            const cl = await Room.findByPk(id)

            if (!cl)
                return res.status(404).json({ error: true, message: 'Room not found' })
            
            let response = {
                label: cl.label,
                roomMembers: await roomService.getRoomMembers(id)
            }

            if (response.roomMembers.roomOwner.id != user.id) {
                const verStatus = await verificationService.chackVerStatus(user.id, id)
                if (verStatus.status != 'approved')
                    return res.status(400).json({ error: true, message: verStatus.message })
            }

            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async getRoomList(req, res) {
        try {
            const id = req.session.user.id

            const roomList = await roomService.getRoomList(id)

            let response = {}
            response.owner = roomList.owner
            response.member = []

            for (const cl of roomList.member) {
                const verStatus = await verificationService.chackVerStatus(id, cl.id)
                if (verStatus.status == 'approved')
                    response.member.push(cl)
            }

            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async leaveRoom(req, res) {
        try {
            const id = req.params.id
            const userId = req.session.user.id

            const cl = await User_Room.findOne({
                where: {
                    roomId: id,
                    userId
                }
            })

            if (!cl)
                return res.status(404).json({ error: true, message: 'You are not a member of the room'})
            if (cl.isRoomOwner == true)
                return res.status(400).json({ error: true, message: 'You can not leave the rooms you created'})

            const response = await roomService.leaveRoom(id, userId)

            return res.status(200).json({ message: response });
        } catch (e) {
           return res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new RoomController()