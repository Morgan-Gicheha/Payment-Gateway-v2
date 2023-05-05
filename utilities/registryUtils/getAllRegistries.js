const readAllRegistries = () => {
    try {
        return require("../../dumpStaticUtils/registry/registry.json");
    } catch (error) {
        throw new Error(`ERROR WHEN READING REGISTY FILE:\n either file is in bad format or file does not exist`);
    }
};

module.exports = { readAllRegistries };
