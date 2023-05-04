const db = require('../../models/index');
const {
    Room,
    User_Room,
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

class RoomService {
    async createRoom(label, user) {
        try {
            let joinCode = genCode(10)
            let roomJoinCode = await Room.findOne({ where: { joinCode }})

            while (roomJoinCode) {
                joinCode = genCode(10)
                roomjoinCode = await Room.findOne({ where: { joinCode }})
            }

            const newRoomConfig = {
                label,
                educationInstitution: user.educationInstitution,
                city: user.city,
                country: user.country,
                joinCode
            }

            const newRoom = await Room.create(newRoomConfig)

            const newUser_Room = {
                userId: user.id,
                roomId: newRoom.id,
                isRoomOwner: true
            }

            await User_Room.create(newUser_Room)

            return newRoom
        } catch (e) {
            return new Error(e)
        }
    }

    async getRoomMembers(roomId) {
        try {
            let response = {}
            response.teachers = []
            response.students = []

            const allRoomMembers = await User_Room.findAll({
                where: { roomId },
                include: [{
                    model: User,
                }] 
            })

            allRoomMembers.forEach((usCl) => {
                if(usCl.User.roleId == 3)
                    response.students.push(usCl.User.getAllInfo())
                else if(usCl.User.roleId == 2) {
                    response.teachers.push(usCl.User.getAllInfo())
                    if(usCl.isRoomOwner == true)
                        response.roomOwner = usCl.User.getAllInfo()
                }
            })

            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async countRoomMembers(roomId) {
        try {
            const membersCount = await User_Room.count({
                where: {
                    roomId
                }
            })
            return membersCount
        } catch(e) {
            throw new Error(e)
        }
    }

    async getRoomList(userId) {
        try {
            let roomList = await User_Room.findAll({
                where: { userId },
                include: [{
                    model: Room,
                }] 
            })

            let response = {}
            response.owner = []
            response.member = []

            for (const usCl of roomList) {
                if(usCl.isRoomOwner == true) {
                    response.owner.push({
                        id: usCl.id,
                        label: usCl.label,
                        membersCount: await this.countRoomMembers(usCl.roomId),
                        createdAt: usCl.createdAt
                    })
                } else {
                    response.member.push({
                        id: usCl.id,
                        label: usCl.label,
                        membersCount: await this.countRoomMembers(usCl.roomId),
                        createdAt: usCl.createdAt
                    })
                }
            }

            return response
        } catch(e) {
            throw new Error(e)
        }
    }

    async leaveRoom(roomId, userId) {
        try {
            await User_Room.destroy({
                where: {
                    roomId,
                    userId
                }
            })
            
            return 'You have leaved the room'
        } catch {
            throw new Error(e)
        }
    }
}

module.exports = new RoomService()