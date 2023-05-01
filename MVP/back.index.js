const express = require("express");

const { router } = require("./routes/routes");
const app = express();
const port = 3000;

const { createProxyMiddleware } = require("http-proxy-middleware");


const serviceOne = "http://localhost:3050";

const Services = { one: { targetService: "http://localhost:3050", serviceName: "B2C KENYA" }, two: { targetService: "http://localhost:3050", serviceName: "B2C SENEGAL" } };

app.use(
    "/one",
    createProxyMiddleware({
        target: serviceOne,
        pathRewrite: {
            "^/[^/]+": "", // remove the first part of the URL path
        },
    })
);

app.all("*", (req, res) => {

    res.send(`<h2>GATEWAY: 404</h2> <br> <p>URL: ${req.url}</p>`);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
