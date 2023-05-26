const express = require("express");
const router = express.Router();
const { readAllRegistries } = require("../utilities/registryUtils/getAllRegistries");
const { saveToRegistry } = require("../utilities/registryUtils/writeToRegistry");

const { validateRegistryData } = require("../middleWares/registryMiddlewares/validateRegistryCreationData");

router.get("/", (req, res) => {
    let response = { status: "" };
    let statusCode = null;
    try {
        let availableRegistries = readAllRegistries();
        response["status"] = "000";
        response["response"] = availableRegistries;
        statusCode = 200;
    } catch (error) {
        response["status"] = "091";
        response["message"] = `something went wrong \n${error}`;
        statusCode = 500;
    }

    res.status(statusCode).send(response);
});

router.post("/", validateRegistryData, (req, res) => {
    // {baseRoute:"four",targetUrl:"http://localhost:3050",configurationIdentity:"name"}
    let response = { status: "" };
    let statusCode = null;
    const data = req.body;

    try {
        const serviceResponse = saveToRegistry(data);
        response["status"] = "000";
        response["response"] = serviceResponse;
        statusCode = 200;
    } catch (error) {
        // JSON.parse(jsonString).hasOwnProperty("statusCode");
        response["status"] = "091";
        response["message"] = JSON.parse(error.message)["message"] || error.message;
        statusCode = Number(JSON.parse(error.message)["statusCode"]) || 500;
    }
    console.log(response);

    res.status(statusCode).send(response);
});

module.exports = { router };
