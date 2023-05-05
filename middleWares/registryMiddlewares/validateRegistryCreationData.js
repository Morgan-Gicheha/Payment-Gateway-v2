const validateRegistryData = (req, res, next) => {

    let data = req.body;
    
    if (!data) {
        return res.status(400).send({ status: "091", message: `Missing Feilds` });
    }
    if (!data.hasOwnProperty("baseRoute")) {
        return res.status(400).send({ status: "091", message: `Missing Feild baseRoute` });
    }
    if (!data.hasOwnProperty("targetUrl")) {
        return res.status(400).send({ status: "091", message: `Missing Feild targetUrl` });
    }
    if (!data.hasOwnProperty("configurationIdentity")) {
        return res.status(400).send({ status: "091", message: `Missing Feild configurationIdentity` });
    }

    next();
};

module.exports = { validateRegistryData };
