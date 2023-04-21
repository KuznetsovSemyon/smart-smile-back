const gameService = require('../services/gameService')
const db = require('../../models/index');
const {
    User, Role, Game, Category
} = db;

class GameController {
    async createGame(req, res) {
        try {
            const { name } = req.body
            
            const game = await Game.findOne({ where: { name } })
            if (game) {
                return res.status(400).json({ error: true, message: ' The game already exists' });
            }
                
            const newGame = await gameService.createGame(req)

            return res.status(200).json(newGame);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async addGameToFavorite(req, res) {
        try { 
            const { id } = req.params
            const game = await Game.findByPk(id)
            if (!game) {
                return res.status(404).json({ error: true, message: 'The game not found' });
            }

            const newFavoriteGame = await gameService.addGameToFavorite(id, req.session.user)

            return res.status(200).json(newFavoriteGame);
        } catch {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async removeGameFromFavorite(req, res) {
        try {
            const { id } = req.params
            const game = await Game.findByPk(id)
            if (!game) {
                return res.status(404).json({ error: true, message: 'The game not found' });
            }

            const responce = await gameService.removeGameFromFavorite(id, req.session.user)
            
            return res.status(200).json(responce);
        } catch {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async getGameList(req, res) {
        try {
            const { page = 1, size = 15, order = 'order', order_type = -1, categoryId } = req.query

            let response = {}
            response.count = 0
            response.rows = []

            if(categoryId == 'favorite') {
                response = await Game.findAndCountAll({
                    include: {
                        model: User,
                        where: { 
                            id: req.session.user.id 
                        }
                    },
                    where: { isBlocked: false },
                    offset: (page - 1) * size,
                    limit: size,
                    order: [[order, order_type == 1 ? 'DESC' : 'ASC']]
                })
            } else if(categoryId) {
                response = await Game.findAndCountAll({
                    include: {
                        model: Category,
                        where: { 
                            isBlocked: false,
                            id: categoryId 
                        }
                    },
                    where: { isBlocked: false },
                    offset: (page - 1) * size,
                    limit: size,
                    order: [[order, order_type == 1 ? 'DESC' : 'ASC']]
                })
            } else {
                response = await Game.findAndCountAll({
                    where: { isBlocked: false },
                    offset: (page - 1) * size,
                    limit: size,
                    order: [[order, order_type == 1 ? 'DESC' : 'ASC']]
                })
            }
            return res.status(200).json(response);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async updateGame(req, res) {
        try {
            const { id } = req.params

            let game = await Game.findByPk(id)
            if (!game) {
                return res.status(404).json({ error: true, message: 'The game not found' });
            }

            const updatedGame = await gameService.updateGame(req, game)

            return res.status(200).json(updatedGame);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }

    async deleteGame(req, res) {
        try {
            const { id } = req.params

            const game = await Game.findByPk(id)
            if (!game) {
                return res.status(404).json({ error: true, message: 'The game not found' });
            }

            const responce = await gameService.deleteGame(id)
            
            return res.status(200).json(responce);
        } catch (e) {
            return res.status(400).json({ error: true, message: e.message || e });
        }
    }
}

module.exports = new GameController()