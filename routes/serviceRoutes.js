const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();
const registry = require("../dumpStaticUtils/registry/registry.json");

// proxing with allroutes in the json registry
Object.entries(registry).forEach(([path, { ...targetObj }]) => {
    let target = targetObj["target"];

    router.use(
        path,
        createProxyMiddleware({
            target,
            pathRewrite: {
                [`^/service${path}`]: "",
            },
        })
    );
});

router.all("*", (req, res) => {
    res.status(400).send({ status: "091", message: "Service not confirgured." });
});

module.exports = { router };
