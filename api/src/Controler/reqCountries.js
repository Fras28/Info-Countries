const axios = require("axios");
const API = "https://restcountries.com/v3/all";
const { Country, Activity, Op } = require("../db");

 const getAllCountries = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    let BD = await Country.findAll({
      attributes: ["cca3", "name", "flags", "continents", "population", "area"],
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season", "idioma"],
        through: {
          attributes: [],
        },
      },
    });
    if (BD.length > 0) {
      return res.status(200).send(BD);
    } else {
      const allCountries = await axios.get(API);

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
        attributes: [
          "cca3",
          "name",
          "flags",
          "continents",
          "population",
          "area",
        ],
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season", "idioma"],
          through: {
            attributes: [],
          },
        },
      });
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

 const getDetaills = async (req, res) => {
  const { id } = req.params;
  let countryDB = await Country.findAll({
    where: { cca3: id },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season", "idioma"],
      through: {
        attributes: [],
      },
    },
  });
  return res.status(200).send(countryDB);
};

 const createAcvtivity = async (req, res) => {
  const { country, difficulty, duration, name, season, idioma } = req.body;
  try {
    const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
      idioma: idioma,
   
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