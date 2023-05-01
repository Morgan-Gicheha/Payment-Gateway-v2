const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Define the routes and their corresponding targets
const routes = {
    "/one": { target: "http://localhost:3050", name: "B2C" },
    "/two": { target: "http://localhost:3050", name: "B2C" },
    "/three": { target: "http://localhost:3050", name: "B2C" },
};

const app = express();

// Define the port number for the app to listen on
const port = 3000;

// Create proxy middleware dynamically from the routes defined in the object
Object.entries(routes).forEach(([path, target]) => {
    target = target.target;

    app.use(
        path,
        createProxyMiddleware({
            target,
            pathRewrite: {
                [`^${path}`]: "",
            },
        })
    );
});

// Define a catch-all route handler for requests that don't match any of the defined routes
app.use((req, res) => {
    res.status(404).send("Not found");
});

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`);
});
