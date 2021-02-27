const db = require("../models");
const router = require("express").Router();
const axios = require("axios")

router.get("/", async (req, res) => {
  try {
    const pokemons = await db.pokemon.findAll({ raw: true });
    // console.log(pokemons)
    res.render("pokemon/index", { pokemons: pokemons });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const [newPokemon, created] = await db.pokemon.findOrCreate({
      where: { name: req.body.name }
    });
    // console.log(newPokemon)
    // console.log(created)
    res.redirect("/pokemons");
  } catch (err) {
    console.log(err);
  }
});

router.get("/show", (req, res) => {
    res.render("pokemon/show")
})

router.get("/:name", async (req, res) => {
    try {
        // const pokemon = await db.pokemon.findOne({
        //     where: { name: req.params.name }
        // });
        const pokeURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
        const response = await axios.get(pokeURL)
        const pokemons = response.data
        res.render("pokemon/show", { pokemons })
    } catch(err) {
        console.log(err)
    }
})

module.exports = router;
