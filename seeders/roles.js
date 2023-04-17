module.exports = {
    async up(queryInterface) {
        try {
            await queryInterface.bulkInsert('roles', [
                { label: 'admin' }, { label: 'teacher' }, { label: 'student' },
            ], {});
        }
        catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('roles', {[Op.or]: [
            { label: 'admin' }, { label: 'teacher' }, { label: 'student' }
        ]});
    },
};