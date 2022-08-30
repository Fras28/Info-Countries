const axios = require("axios");
//const Country = require("../models/Country");
const API ='https://restcountries.com/v3/all'
const {Country, Activity, Op} = require("../db")

/*const getAllCountries = async() => {
    let response = await axios.get('https://restcountries.com/v3/all');
    if(response.data){
        var country = response.data.map((countries) => {
            return {
                cca3: countries.cca3,
                name: countries.name.common,
                flags: countries.flags[0],
                continents: countries.region,
                capital: countries.capital != null ? countries.capital[0]: 'No data',
                subregion: countries.subregion,
                area: countries.area <= 0 ? null:countries.area,
                population: countries.population <= 0 ? null:countries.population,
            }
        })
    }
    let filterCountry = country.filter(c=> c !== undefined)
    await Country.bulkCreate(filterCountry,{validate: true});

    const c = await Country.findAll({
        attributes: ['cca3','name', 'flags', 'continents', 'population'],
        include:[{
                model: Activity,
                attributes: ['name']
            }]
        });
    //return countries;
    return c;
}*/
const getAllCountries = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    let BD = await Country.findAll({
      attributes: ["cca3", "name", "flags", "continents", "population"],
      include:{
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
              attributes: []
          }
      }
  })
    if (BD.length > 0) {
      return res.status(200).send(BD);
    } else {
      const allCountries = await axios.get(API);
      //let countriesDb = await Country.findall({include:Activity})
      const pais = allCountries.data.map((e) => {
        return {
          cca3: e.cca3,
          name: e.name.common,
          flags: e.flags[1],
          continents: e.continents[0],
          capital: e.capital != null ? e.capital[0] : "No data",
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        };
      });
      const filterCountry = pais.filter((c) => c !== undefined);
      await Country.bulkCreate(filterCountry, { validate: true });

      let BD = await Country.findAll({
        attributes: ["cca3", "name", "flags", "continents", "population"],
        include:{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes: []
            }
        }
    })
      return res.status(200).send(BD);
    }
  }
  const countryDB = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return res.status(200).send(countryDB);
};
//-----------------------------
/*async function getAllCountries(req, res, next) {
    const { name } = req.query;
    try {
        if (!name) {
            const pais = await axios.get(API);
           
            const oldCountries = await Country.findAll({
                include: { model: Activity,
                           attributes: ['name', 'difficulty', 'duration', 'season'],
                           through: {
                              attributes: [] }
                         }
        });
           if (oldCountries.length) res.json(oldCountries)
            await pais.data.forEach((e) => Country.create({
                cca3: e.cca3,
                name: e.name.common,
                flags: e.flags[1],
                continents: e.continents[0],
                capital: e.capital != null ? e.capital[0]: 'No data',
                subregion: e.subregion,
                area: e.area <= 0 ? null:e.area,
                population: e.population,
                }));
            const countries = await Country.findAll({
                    include: { model: Activity,
                               attributes: ['name', 'difficulty', 'duration', 'season'],
                               through: {
                                  attributes: [] }
                             }
            });
            return res.status(200).send(countries);
        }else {
        const nameCountries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        console.log(nameCountries)
        nameCountries.length ?
        res.status(200).send(nameCountries) :
        res.status(404).json({error: 'Country not found'});
    };

    } catch (error) {
        next(error);
    }
};*/
/*GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes */

const getDetaills = async (req, res) => {
  const { id } = req.params;
  let countryDB = await Country.findAll({
    where:{cca3 : id} ,
    include:{
        model: Activity,
        attributes:["name", "difficulty", "duration", "season"],
        through: {
            attributes: []
        }
    }
})
  return res.status(200).send(countryDB);
};

const createAcvtivity = async (req, res) => {
  const { country,difficulty , duration, name , season } = req.body;
  try {
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,     
      season: season,
    });
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.in]: country,
        },
      },
    });
    countries?.map((e) => {
      e.addActivity(newActivity);
    });
    res.status(200).send(newActivity);
  } catch (e) {
    res.status(400).send("no se pudo crear la actividad correctamente");
  }
};

module.exports = {
  getAllCountries,
  getDetaills,
  createAcvtivity,
};