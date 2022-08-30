const express = require("express")
const {Router} = require("express");
const { getAllCountries, getDetaills, createAcvtivity } = require("../Controler/reqCountries");
const router = Router();

router.get("/", getAllCountries);
router.get("/:id",getDetaills);
router.post("/addactivity", createAcvtivity)


module.exports = router;