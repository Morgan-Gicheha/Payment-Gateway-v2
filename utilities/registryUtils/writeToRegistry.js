const { readAllRegistries } = require("../../utilities/registryUtils/getAllRegistries");
const fs = require("fs");
const path = require("path");

let availableRegistries = null;
const filePath = path.join(__dirname, "../../dumpStaticUtils/registry", "registry.json");

const saveToRegistry = (data) => {
    let errorMessage = { statusCode: "", message: "" };
    try {
        availableRegistries = readAllRegistries();
    } catch (error) {
        errorMessage["statusCode"] = "500";
        errorMessage["message"] = error.message;

        throw new Error(JSON.stringify(errorMessage));
    }
    let baseRoute = data["baseRoute"].trim();
    if (baseRoute[0] !== "/") {
        baseRoute = "/" + baseRoute;
    }

    Object.keys(availableRegistries).forEach((service) => {
        let singleService = availableRegistries[service];

        if (singleService["target"] === data["targetUrl"]) {
            errorMessage["statusCode"] = "400";
            errorMessage["message"] = "duplicate feild targetUrl";

            throw new Error(JSON.stringify(errorMessage));
        }
        if (singleService["name"] === data["configurationIdentity"]) {
            errorMessage["statusCode"] = "400";
            errorMessage["message"] = "duplicate feild configurationIdentity";

            throw new Error(JSON.stringify(errorMessage));
        }
    });

    let targetUrl = data["targetUrl"].trim();
    let configurationIdentity = data["configurationIdentity"].trim();

    availableRegistries[baseRoute] = {
        target: targetUrl,
        name: configurationIdentity,
    };

    fs.writeFile(filePath, JSON.stringify(availableRegistries), (err) => {
        if (err) {
            errorMessage["statusCode"] = "500";
            errorMessage["message"] = err.message;
            console.log(err);
            throw new Error(JSON.stringify(errorMessage));
        }
    });
    // console.log(availableRegistries)
    return { ...availableRegistries[baseRoute], baseRoute: baseRoute };
};

module.exports = { saveToRegistry };
