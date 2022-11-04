const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
// const API_KEY = process.env.API_KEY;
// require('dotenv').config();
const API_KEY = "8847e03adec34c5c86559a16fc12ecf2";
const { Videogame, Genres } = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiInfo = async () => {
    let games = [];
    
        try {
            for (let i = 1; i < 6; i++) {
                await (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results.map((e) => {
                    games.push({
                        id: e.id,
                        name: e.name,
                        image_background: e.background_image,
                        released: e.released,
                        description: e.description,
                        rating: e.rating,
                        platforms: e.platforms.map((e) => e.platform.name),
                        genres: e.genres.map((e) => e.name),
                    });
                });
            }
            // console.log("apiInfo:",games)
            return games;
        } catch (error) {
            console.log(error);
        }
    };

    const infoDb = async () => {
        return await Videogame.findAll({
            include: {
                model: Genres,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })
    };

    const infoTotal = async () => {
        const infoApi = await apiInfo();
        const infoDbase = await infoDb();
        // console.log("infoTotal:",infoDbase)
        const infoTotal = infoApi.concat(infoDbase);
    
        return infoTotal
    };

    router.get('/videogames', async (req,res) => {
        const { name } = req.query;
        try{
            const games = await infoTotal();
            if(name) {
                const gamesName = games?.filter((e) => e.name.toLowerCase() === name.toLowerCase())
                gamesName.length > 0 ? res.status(200).json(gamesName) : res.send('Videogame does not exist'); 
            }else{
                res.status(200).json(games)
            }
        }catch (error) {
            res.status(500).send('Videogames not found')
        }
    })

    router.get('/videogame/:id', async (req,res) => {
        try{
            const { id } = req.params;
            const todosLosGames = await infoTotal();
            if(id){
                let gamesId =  todosLosGames.filter((e) => e.id==id)
                gamesId.length?
                res.status(200).send(gamesId) : res.status(400).send("Videogame not found")
            }
        }catch(error){
            console.log(error)
        }
    });

    router.post('/videogames', async (req,res) => {
        try{
            let {
                name,
                released,
                description,
                rating,
                image_background,
                platforms,
                genres,

            } = req.body;

            let VideogamesCreate = await Videogame.create({
                name,
                released,
                description,
                rating,
                image_background,
                platforms,
                genres,
            })

            let genresDb = await Genres.findAll({
                where:{name:genres}
            })
            VideogamesCreate.addGenres(genresDb)
            res.status(200).send('Videogame created')
        } catch (error){
            console.log(error)
        }
    });


        
    router.get('/genres', async (req,res) => {
        try {
            let genreDb = Genres.findAll()
            if(genreDb.length > 0){
                res.status(200).send(genreDb.map(d => d.name))
            }else{
                const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
                const infoApi = apiUrl.data.results.map(g => g.name)
                infoApi.forEach(e => {
                    Genres.findOrCreate({
                        where: {name: e}
                    })
                })
                let otraInfo = await Genres.findAll()
                let utilInfo = otraInfo.map(d => d.name)
                console.log(utilInfo.length)
                res.status(200).send(utilInfo)
            }
    
        } catch (error) {
            console.log(error)
        }
    });
    

module.exports = router;
