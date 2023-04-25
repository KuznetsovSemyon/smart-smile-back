const db = require('../../models/index');
const fs = require('fs');
const {
    Game, Favorite_Game
} = db;

class gameService {
    async createGame(req) {
        try {
            const { name, description, order, isOnline, isBlocked } = req.body

            const imageUrl = `/assets/${req.files[0].filename}`;
            
            const newGameConfig = {
                name,
                imageUrl,
                description,
                order, 
                isOnline,
                isBlocked
            }

            const newGame = await Game.create(newGameConfig)

            return newGame
        } catch(e) {
            return new Error(e)
        }
    }

    async getGame(id) {
        try {
            const response = await Game.findByPk(id, {
                where: {
                    isBlocked: false
                }
            })

            if(!response)
                return { error: true, message: 'Game not found' }

            return response
        } catch(e) {
            throw new Error(e)
        }
    }

    async removeGameFromFavorite(id, user) {
        try {
            const destroyed = await Favorite_Game.destroy({ userId: user.id, gameId: id })
            if (destroyed)
                return { message: 'deleted' }
            else 
                return { message: 'something went wrong' }
        } catch(e) {
            return new Error(e)
        }
    }

    async addGameToFavorite(id, user) {
        try {
            const newFavoriteGame = await Favorite_Game.create({ userId: user.id, gameId: id })

            return newFavoriteGame
        } catch(e) {
            return new Error(e)
        }
    }

    async updateGame(req, game) {
        try {
            const { name, description, order, isOnline, isBlocked } = req.body

            if(name) {
                game.name = name
            }

            if(description) {
                game.description = description
            }

            if(order) {
                game.order = order
            }

            if(isOnline) {
                game.isOnline = isOnline
            }

            if(isBlocked) {
                game.isBlocked = isBlocked
            }

            if (req.files && req.files[0]) {
                if (game.imageUrl) {
                    const imagepath = `${__dirname}/../../${game.imageUrl}`;
                    console.log(imagepath)
                    fs.unlink(imagepath, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(`deleted: ${imagepath}`);
                        }
                    });
                }
                game.imageUrl = `/assets/${req.files[0].filename}`;
            }

            return await game.save()
        } catch(e) {
            return new Error(e)
        }
    }

    async deleteGame(id) {
        try {
            const destroyed = await Game.destroy({ where: { id} })
            if (destroyed)
                return { message: 'deleted' }
            else 
                return { message: 'something went wrong' }
        } catch(e) {
            return new Error(e)
        }
    }
}

module.exports = new gameService()