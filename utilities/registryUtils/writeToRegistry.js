const { readAllRegistries } = require("../../utilities/registryUtils/getAllRegistries");

const saveToRegistry = () => {
    let availableRegistries = null
    try {
        availableRegistries = readAllRegistries();
    } catch (error) {
        throw new Error(error);
    }

    console.log(availableRegistries);
};

module.exports = { saveToRegistry };
