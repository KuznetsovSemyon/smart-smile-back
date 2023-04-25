const db = require('../../models/index');
const {
    Role
} = db;

class RoleService {
    async getRoleById(id) {
        try {
            const role = await Role.findByPk(id)
            return role.label
        } catch (e) {
            throw new Error(e)
        } 
    }
}

module.exports = new RoleService()